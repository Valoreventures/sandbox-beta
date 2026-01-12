# MVP Issues Assessment - SandboxLife Beta

**Date:** 2026-01-12
**Status:** Critical issues identified - NOT production ready

---

## Executive Summary

| Category | Critical | High | Medium | Total |
|----------|----------|------|--------|-------|
| Security | 1 | 4 | 4 | 9 |
| Error Handling | 2 | 3 | 2 | 7 |
| UX/Functionality | 7 | 5 | 5 | 17 |
| Testing | 4 | 4 | 2 | 10 |
| **TOTAL** | **14** | **16** | **13** | **43** |

---

## CRITICAL ISSUES (Must Fix Before Launch)

### 1. SECURITY: Hardcoded Supabase API Credentials
**File:** `src/utils/supabase.jsx` (lines 2-4)
```javascript
const supabaseUrl = 'https://teyudjxlutkavyyigwwz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIs...';  // EXPOSED IN SOURCE
```
**Impact:** Complete database access for attackers
**Fix:** Move to `.env.local` using `import.meta.env.VITE_SUPABASE_*`, rotate keys immediately

---

### 2. SECURITY: No Row Level Security (RLS) Policies
**Files:** All Supabase queries in `src/utils/supabase.jsx`
**Impact:** Any user can query/modify other users' data by manipulating requests
**Fix:** Implement RLS policies in Supabase:
```sql
CREATE POLICY "Users can only view their own entries"
ON user_journal_entries FOR SELECT USING (auth.uid() = user_id);
```

---

### 3. SECURITY: Authentication Bypass via localStorage
**Files:** `src/components/Login.jsx:39`, `src/pages/DailyJournal.jsx:34`
```javascript
localStorage.setItem('user_id', data.user.id);
const storedUserId = localStorage.getItem('user_id');  // Trusted without validation
```
**Impact:** User impersonation by modifying localStorage
**Fix:** Use `supabase.auth.getUser()` for all auth checks, remove manual localStorage

---

### 4. ERROR HANDLING: No React Error Boundaries
**File:** `src/App.jsx`
**Impact:** Any component error crashes entire app (white screen)
**Fix:** Add ErrorBoundary wrapper around Routes

---

### 5. ERROR HANDLING: Loading States Get Stuck Forever
**Files:** `src/pages/Home.jsx:110-123`, `src/pages/ProfilePage.jsx:385-449`
```javascript
setIsLoading(true);
await Promise.all([...]); // If rejects, loading never set to false
setIsLoading(false);  // Never reached on error
```
**Fix:** Use try/finally pattern for all loading state management

---

### 6. UX: Routes Missing userId Parameters
**File:** `src/App.jsx` (lines 39-41)
```javascript
<Route path="/dailyjournal" element={<DailyJournal />} />  // No :userId
<Route path="/thoughtoftheday" element={<ThoughtOfTheDay />} />
<Route path="/bookjourney" element={<BookJourney />} />
```
**Impact:** Navigation breaks, relies on fragile localStorage
**Fix:** Add `:userId` to all authenticated routes

---

### 7. UX: No Protected Route Authentication
**Impact:** Users can access any page without being logged in
**Fix:** Add auth check wrapper component for protected routes

---

### 8. UX: Zero Form Validation on Login/Signup
**Files:** `src/components/Login.jsx`, `src/components/Signup.jsx`
**Missing:** Email format, password strength, empty field checks
**Fix:** Add validation before Supabase calls

---

### 9. UX: Mobile Layout Completely Broken
**Files:** `src/pages/DailyJournal.jsx:144-146`
```javascript
style={{ width: "100vw" }}  // Causes horizontal scroll
className="h-screen"  // Fixed height breaks on mobile
```
**Fix:** Use responsive units, remove 100vw

---

### 10. UX: Empty States Not Handled
**Affected Pages:** Home, MyBook, MyCalendar, ChatRoomPage, Library
**Impact:** Users see blank screens with no guidance
**Fix:** Add "No entries yet - Create your first" CTAs

---

### 11. UX: No Loading States on Most Pages
**Missing Loading Indicators:**
- MyBook.jsx
- MyCalendar.jsx
- Library.jsx
- ProfilePage.jsx
- SettingsPage.jsx

---

### 12. TESTING: 4 Tests Currently Failing
```
performance-optimization.test.jsx - Missing PerformanceMonitor component
journal-entry-card.test.jsx - 2 class assertion failures
cross-browser-integration.test.jsx - z-index selector failure
element-overlap-prevention.test.jsx - spacing validation failure
```

---

### 13. TESTING: Zero Auth Flow Tests
**Impact:** Cannot verify users can log in
**Missing:** Login form, signup validation, session persistence, protected routes

---

### 14. TESTING: Zero Data Persistence Tests
**Impact:** Cannot verify journal entries actually save
**Missing:** insertJournalEntry, fetchTopUserRecords, fetchEntries integration tests

---

## HIGH PRIORITY ISSUES

### Security
| Issue | File | Impact |
|-------|------|--------|
| Chat message spoofing | `ChatRoomPage.jsx:247` | Users can forge messages as others |
| No file upload validation | `ProfilePage.jsx:383` | Malware upload possible |
| Sensitive data in console.log | Multiple files | PII exposed in browser |
| No password requirements | `Signup.jsx:30` | Weak passwords accepted |

### Error Handling
| Issue | File | Impact |
|-------|------|--------|
| Inconsistent error return patterns | `supabase.jsx` | Callers can't handle errors reliably |
| Cryptic error messages | `BookJourney.jsx:222` | "something went wrong" unhelpful |
| Missing try/catch in critical paths | `ProfilePage.jsx:284` | Unhandled rejections crash components |

### UX
| Issue | File | Impact |
|-------|------|--------|
| Dual dashboard system (v1/v2) | `Home.jsx`, `DashboardV2.jsx` | Confusing, maintenance burden |
| Inconsistent button styling | Multiple pages | No visual hierarchy |
| Different header components | TopBar vs HeaderBar vs HeaderBarV2 | Fragmented experience |
| Multi-step forms missing progress | `BookJourney.jsx` | Users don't know where they are |
| HTML entity in button text | `DailyJournal.jsx:56` | Shows "&amp;" instead of "&" |

### Testing
| Issue | Impact |
|-------|--------|
| No E2E test framework | Cannot verify user journeys |
| Tests verify DOM presence only | Don't catch behavioral bugs |
| All Supabase calls mocked | Integration issues hidden |
| 0% page component test coverage | Core functionality untested |

---

## MEDIUM PRIORITY ISSUES

### Security
- XSS risk in user content display (no sanitization)
- IDOR vulnerability in URL parameters (`/home/:userId` modifiable)
- Weak error disclosure (stack traces may leak)
- No CSRF protection

### Error Handling
- No network status detection (offline handling)
- No retry logic for failed requests
- Memory leaks from unmanaged Supabase subscriptions

### UX
- Calendar state not persisted in URL
- No file upload progress indicator
- Chat send has no success feedback
- Menu interactions not smooth on mobile

### Testing
- Helper functions untested (`formatDatetime`, `formatJournalType`)
- Context state management tests incomplete
- Accessibility tests may not reflect real screen reader behavior

---

## RECOMMENDED MVP LAUNCH BLOCKERS

These **14 critical issues** must be resolved before any production deployment:

1. Move Supabase credentials to environment variables
2. Implement RLS policies on all database tables
3. Replace localStorage auth with Supabase session management
4. Add React Error Boundary
5. Fix loading state stuck issues (try/finally)
6. Add userId to all authenticated routes
7. Add protected route wrapper
8. Add basic form validation
9. Fix mobile layout (remove 100vw, fixed heights)
10. Add empty states to all list views
11. Add loading states to all data-fetching pages
12. Fix 4 failing tests
13. Add auth flow tests (login/signup)
14. Add data persistence integration tests

---

## IMMEDIATE ACTION PLAN

### Day 1: Security (Critical)
- [ ] Create `.env.local` with Supabase credentials
- [ ] Update `supabase.jsx` to use `import.meta.env`
- [ ] Rotate Supabase API keys in dashboard
- [ ] Implement RLS policies for `user_journal_entries`, `user_profiles`, `messages`

### Day 2: Auth & Error Handling
- [ ] Create `AuthProvider` context with session management
- [ ] Add `ProtectedRoute` wrapper component
- [ ] Add `ErrorBoundary` component
- [ ] Fix try/finally patterns for loading states

### Day 3: UX Critical Fixes
- [ ] Add `:userId` to DailyJournal, ThoughtOfTheDay, BookJourney routes
- [ ] Add form validation to Login/Signup
- [ ] Fix mobile layout issues
- [ ] Add empty states to all list pages

### Day 4: Testing
- [ ] Fix 4 failing tests
- [ ] Add Login/Signup test suite
- [ ] Add Supabase integration tests (with test database)
- [ ] Set up Playwright for E2E

### Day 5: Polish
- [ ] Add loading states to remaining pages
- [ ] Unify button/header component patterns
- [ ] Add file upload validation
- [ ] Remove console.log statements

---

## Files Most Affected

| File | Issues | Priority |
|------|--------|----------|
| `src/utils/supabase.jsx` | 5 | CRITICAL |
| `src/components/Login.jsx` | 4 | CRITICAL |
| `src/components/Signup.jsx` | 4 | CRITICAL |
| `src/App.jsx` | 3 | CRITICAL |
| `src/pages/Home.jsx` | 4 | HIGH |
| `src/pages/DailyJournal.jsx` | 5 | HIGH |
| `src/pages/ProfilePage.jsx` | 5 | HIGH |
| `src/pages/ChatRoomPage.jsx` | 4 | HIGH |
| `src/pages/BookJourney.jsx` | 3 | MEDIUM |
| `src/pages/MyCalendar.jsx` | 4 | MEDIUM |
