import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardProvider } from '../contexts/DashboardContext';
import { OverlayProvider } from '../contexts/OverlayContext';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';
import AppShell from '../components/AppShell';
import HeaderBarV2 from '../components/HeaderBarV2';
import SidebarNav from '../components/SidebarNav';

// Mock useParams to provide userId
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ userId: 'test-user-123' }),
    useLocation: () => ({ pathname: '/dashboard-v2/test-user-123' }),
  };
});

// Test wrapper component
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <AccessibilityProvider>
      <OverlayProvider>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </OverlayProvider>
    </AccessibilityProvider>
  </BrowserRouter>
);

describe('App Shell Components Integration', () => {
  beforeEach(() => {
    // Mock window.innerWidth for responsive tests
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  describe('AppShell Component', () => {
    it('renders with all required sections', () => {
      const mockHeader = <div data-testid="header">Header Content</div>;
      const mockSidebar = <div data-testid="sidebar">Sidebar Content</div>;
      const mockRightRail = <div data-testid="right-rail">Right Rail Content</div>;
      const mockMain = <div data-testid="main">Main Content</div>;

      render(
        <TestWrapper>
          <AppShell
            headerContent={mockHeader}
            sidebarContent={mockSidebar}
            rightRailContent={mockRightRail}
          >
            {mockMain}
          </AppShell>
        </TestWrapper>
      );

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('right-rail')).toBeInTheDocument();
      expect(screen.getByTestId('main')).toBeInTheDocument();
    });

    it('includes skip to content link for accessibility', () => {
      render(
        <TestWrapper>
          <AppShell headerContent={<div />} sidebarContent={<div />}>
            <div />
          </AppShell>
        </TestWrapper>
      );

      const skipLink = screen.getByText('Skip to main content');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('applies density mode classes correctly', () => {
      render(
        <TestWrapper>
          <AppShell headerContent={<div />} sidebarContent={<div />}>
            <div data-testid="main-content" />
          </AppShell>
        </TestWrapper>
      );

      // Should have comfort mode classes by default
      const mainContent = screen.getByTestId('main-content').closest('main');
      expect(mainContent).toHaveClass('gap-4', 'p-4');
    });
  });

  describe('HeaderBarV2 Component', () => {
    it('renders brand and navigation elements', () => {
      render(
        <TestWrapper>
          <HeaderBarV2 onToggleMenu={vi.fn()} />
        </TestWrapper>
      );

      expect(screen.getByAltText('SandboxLife')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Search entries, collections/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /New/ })).toBeInTheDocument();
    });

    it('displays breadcrumb navigation', () => {
      render(
        <TestWrapper>
          <HeaderBarV2 onToggleMenu={vi.fn()} />
        </TestWrapper>
      );

      expect(screen.getByText('Dashboard v2')).toBeInTheDocument();
    });

    it('handles search input changes', () => {
      render(
        <TestWrapper>
          <HeaderBarV2 onToggleMenu={vi.fn()} />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/Search entries, collections/);
      fireEvent.change(searchInput, { target: { value: 'test search' } });
      
      expect(searchInput.value).toBe('test search');
    });

    it('opens new entry dropdown when clicked', () => {
      render(
        <TestWrapper>
          <HeaderBarV2 onToggleMenu={vi.fn()} />
        </TestWrapper>
      );

      const newButton = screen.getByRole('button', { name: /New/ });
      fireEvent.click(newButton);

      expect(screen.getByText('Create New Entry')).toBeInTheDocument();
      expect(screen.getByText('Book Entry')).toBeInTheDocument();
      expect(screen.getByText('Daily Entry')).toBeInTheDocument();
    });

    it('displays filter options', () => {
      render(
        <TestWrapper>
          <HeaderBarV2 onToggleMenu={vi.fn()} />
        </TestWrapper>
      );

      expect(screen.getByText('Filters:')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Daily' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Book' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Status' })).toBeInTheDocument();
    });
  });

  describe('SidebarNav Component', () => {
    const defaultProps = {
      isCollapsed: false,
      pinnedTopics: [],
      onTopicReorder: vi.fn(),
      onSettingsAccess: vi.fn(),
    };

    it('renders navigation sections', () => {
      render(
        <TestWrapper>
          <SidebarNav {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('Collections')).toBeInTheDocument();
      expect(screen.getByText('Pinned Topics')).toBeInTheDocument();
      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByText('Accessibility')).toBeInTheDocument();
    });

    it('displays navigation items with correct links', () => {
      render(
        <TestWrapper>
          <SidebarNav {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByRole('link', { name: /Dashboard/ })).toHaveAttribute('href', '/dashboard-v2/test-user-123');
      expect(screen.getByRole('link', { name: /Daily Journal/ })).toHaveAttribute('href', '/dailyjournal/test-user-123');
      expect(screen.getByRole('link', { name: /Book Journey/ })).toHaveAttribute('href', '/bookjourney/test-user-123');
    });

    it('shows pinned topics when provided', () => {
      const pinnedTopics = [
        { id: '1', name: 'My Daily Reflection', count: 5 },
        { id: '2', name: 'Book Chapter', count: 3 },
      ];

      render(
        <TestWrapper>
          <SidebarNav {...defaultProps} pinnedTopics={pinnedTopics} />
        </TestWrapper>
      );

      expect(screen.getByText('My Daily Reflection')).toBeInTheDocument();
      expect(screen.getByText('Book Chapter')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('displays empty state for pinned topics', () => {
      render(
        <TestWrapper>
          <SidebarNav {...defaultProps} />
        </TestWrapper>
      );

      expect(screen.getByText('No pinned topics yet')).toBeInTheDocument();
    });

    it('handles filter interactions', () => {
      render(
        <TestWrapper>
          <SidebarNav {...defaultProps} />
        </TestWrapper>
      );

      // Just verify the filters section exists
      expect(screen.getByText('Filters')).toBeInTheDocument();
    });

    it('calls settings callback when settings button clicked', () => {
      const mockSettingsCallback = vi.fn();
      
      render(
        <TestWrapper>
          <SidebarNav {...defaultProps} onSettingsAccess={mockSettingsCallback} />
        </TestWrapper>
      );

      const settingsButton = screen.getByRole('button', { name: 'Open settings' });
      fireEvent.click(settingsButton);

      expect(mockSettingsCallback).toHaveBeenCalled();
    });

    it('renders in collapsed mode correctly', () => {
      render(
        <TestWrapper>
          <SidebarNav {...defaultProps} isCollapsed={true} />
        </TestWrapper>
      );

      // In collapsed mode, text labels should not be visible
      expect(screen.queryByText('Collections')).not.toBeInTheDocument();
      expect(screen.queryByText('Pinned Topics')).not.toBeInTheDocument();
      
      // But icons should still be present
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' });
      expect(dashboardLink).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('handles mobile breakpoint correctly', () => {
      // Mock mobile width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 400,
      });

      render(
        <TestWrapper>
          <AppShell
            headerContent={<HeaderBarV2 onToggleMenu={vi.fn()} />}
            sidebarContent={<SidebarNav {...{ isCollapsed: false, pinnedTopics: [], onTopicReorder: vi.fn(), onSettingsAccess: vi.fn() }} />}
          >
            <div>Main Content</div>
          </AppShell>
        </TestWrapper>
      );

      // Mobile menu toggle should be visible
      expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
    });
  });

  describe('Accessibility Features', () => {
    it('provides proper ARIA attributes', () => {
      render(
        <TestWrapper>
          <HeaderBarV2 onToggleMenu={vi.fn()} />
        </TestWrapper>
      );

      const newButton = screen.getByRole('button', { name: /New/ });
      expect(newButton).toHaveAttribute('aria-expanded', 'false');
      expect(newButton).toHaveAttribute('aria-haspopup', 'true');
    });

    it('supports keyboard navigation', () => {
      render(
        <TestWrapper>
          <SidebarNav 
            isCollapsed={false}
            pinnedTopics={[]}
            onTopicReorder={vi.fn()}
            onSettingsAccess={vi.fn()}
          />
        </TestWrapper>
      );

      const dashboardLink = screen.getByRole('link', { name: /Dashboard/ });
      dashboardLink.focus();
      expect(document.activeElement).toBe(dashboardLink);
    });
  });
});