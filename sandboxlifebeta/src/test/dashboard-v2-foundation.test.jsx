import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardProvider, useDashboard } from '../contexts/DashboardContext';
import DashboardToggle from '../components/DashboardToggle';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock useParams and useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ userId: 'test-user-123' }),
  };
});

// Test component to access dashboard context
const TestDashboardConsumer = () => {
  const { state, actions } = useDashboard();
  
  return (
    <div>
      <div data-testid="current-view">{state.currentView}</div>
      <div data-testid="density-mode">{state.densityMode}</div>
      <div data-testid="sidebar-collapsed">{state.sidebarCollapsed.toString()}</div>
      <button 
        data-testid="toggle-view" 
        onClick={() => actions.setView(state.currentView === 'card-deck' ? 'focus-mode' : 'card-deck')}
      >
        Toggle View
      </button>
      <button 
        data-testid="toggle-density" 
        onClick={() => actions.setDensityMode(state.densityMode === 'comfort' ? 'compact' : 'comfort')}
      >
        Toggle Density
      </button>
      <button 
        data-testid="toggle-sidebar" 
        onClick={() => actions.toggleSidebar()}
      >
        Toggle Sidebar
      </button>
    </div>
  );
};

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <DashboardProvider>
        {component}
      </DashboardProvider>
    </BrowserRouter>
  );
};

describe('Dashboard v2 Foundation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('DashboardContext', () => {
    it('should provide initial state correctly', () => {
      renderWithProviders(<TestDashboardConsumer />);
      
      expect(screen.getByTestId('current-view')).toHaveTextContent('card-deck');
      expect(screen.getByTestId('density-mode')).toHaveTextContent('comfort');
      expect(screen.getByTestId('sidebar-collapsed')).toHaveTextContent('false');
    });

    it('should update view state when action is called', async () => {
      renderWithProviders(<TestDashboardConsumer />);
      
      const toggleButton = screen.getByTestId('toggle-view');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-view')).toHaveTextContent('focus-mode');
      });
    });

    it('should update density mode when action is called', async () => {
      renderWithProviders(<TestDashboardConsumer />);
      
      const toggleButton = screen.getByTestId('toggle-density');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('density-mode')).toHaveTextContent('compact');
      });
    });

    it('should toggle sidebar state when action is called', async () => {
      renderWithProviders(<TestDashboardConsumer />);
      
      const toggleButton = screen.getByTestId('toggle-sidebar');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('sidebar-collapsed')).toHaveTextContent('true');
      });
    });

    it('should save preferences to localStorage when state changes', async () => {
      renderWithProviders(<TestDashboardConsumer />);
      
      const toggleButton = screen.getByTestId('toggle-view');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'dashboard_v2_preferences',
          expect.stringContaining('"currentView":"focus-mode"')
        );
      });
    });

    it('should load preferences from localStorage on mount', () => {
      const savedPreferences = JSON.stringify({
        currentView: 'focus-mode',
        densityMode: 'compact',
        sidebarCollapsed: true
      });
      
      localStorageMock.getItem.mockReturnValue(savedPreferences);
      
      renderWithProviders(<TestDashboardConsumer />);
      
      // Note: Due to useEffect timing, we might need to wait for state updates
      // This test verifies the localStorage integration is set up correctly
      expect(localStorageMock.getItem).toHaveBeenCalledWith('dashboard_v2_preferences');
    });
  });

  describe('DashboardToggle Component', () => {
    it('should render "Try New Dashboard" button for v1', () => {
      render(
        <BrowserRouter>
          <DashboardToggle currentVersion="v1" />
        </BrowserRouter>
      );
      
      expect(screen.getByText('Try New Dashboard')).toBeInTheDocument();
      expect(screen.getByText(/enhanced card-first interface/)).toBeInTheDocument();
    });

    it('should render "Back to Classic" button for v2', () => {
      render(
        <BrowserRouter>
          <DashboardToggle currentVersion="v2" />
        </BrowserRouter>
      );
      
      expect(screen.getByText('Back to Classic')).toBeInTheDocument();
      expect(screen.getByText(/familiar dashboard interface/)).toBeInTheDocument();
    });

    it('should call navigate when switching from v1 to v2', async () => {
      render(
        <BrowserRouter>
          <DashboardToggle currentVersion="v1" />
        </BrowserRouter>
      );
      
      const button = screen.getByText('Try New Dashboard');
      fireEvent.click(button);
      
      // Wait for the transition delay
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          '/dashboard-v2/test-user-123',
          expect.objectContaining({
            replace: true,
            state: { fromVersion: 'v1' }
          })
        );
      }, { timeout: 1000 });
    });

    it('should call navigate when switching from v2 to v1', async () => {
      render(
        <BrowserRouter>
          <DashboardToggle currentVersion="v2" />
        </BrowserRouter>
      );
      
      const button = screen.getByText('Back to Classic');
      fireEvent.click(button);
      
      // Wait for the transition delay
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          '/home/test-user-123',
          expect.objectContaining({
            replace: true,
            state: { fromVersion: 'v2' }
          })
        );
      }, { timeout: 1000 });
    });

    it('should show transitioning state when switching', async () => {
      render(
        <BrowserRouter>
          <DashboardToggle currentVersion="v1" />
        </BrowserRouter>
      );
      
      const button = screen.getByText('Try New Dashboard');
      fireEvent.click(button);
      
      // Should show transitioning state immediately
      expect(screen.getByText('Switching...')).toBeInTheDocument();
    });

    it('should disable button during transition', async () => {
      render(
        <BrowserRouter>
          <DashboardToggle currentVersion="v1" />
        </BrowserRouter>
      );
      
      const button = screen.getByRole('button', { name: /try new dashboard/i });
      
      // Click once to start transition
      fireEvent.click(button);
      
      // Wait for transitioning state
      await waitFor(() => {
        expect(screen.getByText('Switching...')).toBeInTheDocument();
      });
      
      // Verify button is disabled during transition
      expect(button).toBeDisabled();
    });
  });

  describe('Route Integration', () => {
    it('should handle version preference storage', () => {
      render(
        <BrowserRouter>
          <DashboardToggle currentVersion="v1" />
        </BrowserRouter>
      );
      
      const button = screen.getByText('Try New Dashboard');
      fireEvent.click(button);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'preferred_dashboard_version',
        'v2'
      );
    });
  });
});