import '@testing-library/jest-dom';

// Mock CSS custom properties for testing
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: (prop) => {
      const zIndexMap = {
        '--z-dropdown': '1000',
        '--z-sticky': '1020', 
        '--z-fixed': '1030',
        '--z-modal-backdrop': '1040',
        '--z-modal': '1050',
        '--z-popover': '1060',
        '--z-tooltip': '1070',
        '--z-toast': '1080'
      };
      return zIndexMap[prop] || '';
    }
  })
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock IntersectionObserver for performance hooks
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.entries = [];
  }
  
  observe(element) {
    // Immediately trigger intersection for testing
    setTimeout(() => {
      this.callback([{
        target: element,
        isIntersecting: true,
        intersectionRatio: 1
      }]);
    }, 0);
  }
  
  unobserve() {
    // Mock implementation
  }
  
  disconnect() {
    // Mock implementation
  }
};

// Mock PerformanceObserver for layout shift monitoring
global.PerformanceObserver = vi.fn().mockImplementation((callback) => ({
  observe: vi.fn(),
  disconnect: vi.fn()
}));

// Mock performance.memory for memory monitoring
Object.defineProperty(performance, 'memory', {
  value: {
    usedJSHeapSize: 1000000,
    totalJSHeapSize: 2000000,
    jsHeapSizeLimit: 4000000
  },
  writable: true
});

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 16));
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id));

// Mock Image constructor for image loading tests
global.Image = class {
  constructor() {
    this.onload = null;
    this.onerror = null;
    this.src = '';
    this.naturalWidth = 320;
    this.naturalHeight = 240;
  }
  
  set src(value) {
    this._src = value;
    // Simulate successful image load immediately for tests
    if (this.onload) {
      this.onload();
    }
  }
  
  get src() {
    return this._src;
  }
};

// Mock Supabase functions to prevent loading states in tests
vi.mock('../utils/supabase', () => ({
  fetchTopUserRecords: vi.fn().mockResolvedValue({ 
    success: true, 
    data: [] 
  }),
  fetchEntries: vi.fn().mockResolvedValue([]),
  fetchWeeklyData: vi.fn().mockImplementation(() => {
    // Return immediately resolved promise with empty array
    return Promise.resolve([]);
  }),
  fetchDailyEntryCount: vi.fn().mockResolvedValue(0),
  insertJournalEntry: vi.fn().mockResolvedValue({ success: true })
}));

// Mock performance monitoring hooks to prevent memory leaks in tests
vi.mock('../hooks/usePerformanceMonitor', () => ({
  useRenderPerformance: vi.fn(() => ({})),
  useScrollPerformance: vi.fn(() => ({})),
  useLayoutShiftMonitor: vi.fn(() => ({})),
  useFrameRateMonitor: vi.fn(() => ({})),
  useMemoryMonitor: vi.fn(() => ({}))
}));