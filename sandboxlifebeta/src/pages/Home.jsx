import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import HeaderBar from '../components/HeaderBar';
import CollectionsSwitcher from '../components/CollectionsSwitcher';
import SetBDashboardTile from '../components/SetBDashboardTile';
import DashboardToggle from '../components/DashboardToggle';
import Backdrop from '../components/Backdrop';
import EmptyState from '../components/EmptyState';
import { fetchTopUserRecords, fetchEntries } from '../utils/supabase';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GridList } from '../utils/helpers';
import { useRef } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const HomePage = memo(() => {

  const { userId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [tod, setTod] = useState({});
  const [entryCounts, setEntryCounts] = useState({
    daily: 0,
    book: 0,
    thoughts: 0
  });
  const [isLoading, setIsLoading] = useState(true);



  // Memoize combined data to prevent unnecessary recalculations
  const newHomeData = useMemo(() => {
    return [tod, ...entries].filter(Boolean);
  }, [tod, entries]);

  // Optimize toggle menu with useCallback
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Optimize close menu with useCallback
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Memoize format datetime function
  const formatDatetime = useCallback((datetimeStr) => {
    const date = new Date(datetimeStr);

    function formatDate() {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function formatTime() {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    return {
      date: formatDate(),
      time: formatTime(),
    };
  }, []);

  // Optimize data fetching with useCallback
  const fetchThoughtsData = useCallback(async () => {
    try {
      const data = await fetchEntries(userId, 'thought_of_the_day', 1);
      setTod(data[0]);
      setEntryCounts(prev => ({ ...prev, thoughts: data.length }));
    } catch (error) {
      console.log('ERROR', error);
      toast.error(error.message);
    }
  }, [userId]);

  const fetchEntriesData = useCallback(async () => {
    try {
      const data = await fetchTopUserRecords(userId);
      let tempData = data.data.map((entry) => {
        const formattedDatetime = formatDatetime(entry.created_at);
        return {
          ...entry,
          date: formattedDatetime.date,
          time: formattedDatetime.time,
        };
      });
      setEntries(tempData);

      // Count entries by type
      const dailyCount = tempData.filter(entry => entry.journal_type === 'daily_journal').length;
      const bookCount = tempData.filter(entry => entry.journal_type === 'book_journal').length;

      setEntryCounts(prev => ({
        ...prev,
        daily: dailyCount,
        book: bookCount
      }));
    } catch (error) {
      console.log('ERROR', error);
      toast.error(error.message);
    }
  }, [userId, formatDatetime]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchThoughtsData(),
        fetchEntriesData()
      ]);
      setIsLoading(false);
    };

    if (userId) {
      loadData();
    }
  }, [userId, fetchThoughtsData, fetchEntriesData]);

  return (
    <div className="min-h-screen bg-lightpapyrus flex flex-col relative overflow-hidden">
      {/* Header Bar - Fixed height container */}
      <div className="flex-none z-30">
        <HeaderBar toggleMenu={toggleMenu} />
      </div>

      {/* Menu Overlay System with improved integration */}
      <Backdrop
        isVisible={isMenuOpen}
        onClick={closeMenu}
        className="z-modal-backdrop"
      />

      {/* Menu with proper z-index and smooth transitions */}
      <Menu
        toggleMenu={toggleMenu}
        isOpen={isMenuOpen}
      />

      {/* Main Content Container with smooth layout transitions */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isMenuOpen ? 'md:ml-0' : 'ml-0'
        }`}>
        {/* Navigation Zone - Collections Switcher with distinct visual grouping */}
        <nav className="relative z-20 bg-gray-50 border-b border-gray-200 shadow-sm flex-none">
          <CollectionsSwitcher
            activeCollection="daily"
            entryCounts={entryCounts}
          />
        </nav>

        {/* Calendar Overview Zone - Distinct visual separation with enhanced background */}
        <section className="relative z-10 bg-white border-b-2 border-gray-100 shadow-sm flex-none">
          <div className="max-w-7xl mx-auto">
            <div className="px-6 py-2">
              <h2 className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-2">
                Weekly Overview
              </h2>
            </div>
          </div>
          <CalendarDateHeader />
        </section>

        {/* Main Content Zone - Clear content area with proper boundaries and full width utilization */}
        <main
          className="flex-1 bg-lightpapyrus relative z-0 overflow-auto"
          style={{
            transform: 'translateZ(0)' // Force hardware acceleration
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            {isLoading ? (
              // Loading skeleton
              <div className="space-y-12">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="space-y-8">
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-8">
                        <div className="h-32 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-8">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-80 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Dashboard Controls Section with enhanced visual hierarchy */
              <div className="space-y-12">
                {/* Dashboard Controls Zone - Grouped with subtle background */}
                <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="space-y-8">
                    {/* Dashboard Toggle Section with consistent typography */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                        Dashboard Settings
                      </h2>
                      <DashboardToggle currentVersion="v1" />
                    </div>

                    {/* Set B Preview Tile Section with enhanced visual grouping */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-100 pb-2">
                        New Features
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-8">
                        <SetBDashboardTile userId={userId} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Journal Entries Zone - Clear content area with proper boundaries */}
                <section className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Recent Entries</h2>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {newHomeData.length} {newHomeData.length === 1 ? 'entry' : 'entries'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Grid content with enhanced spacing and boundaries */}
                  <div className="p-6">
                    {newHomeData.length > 0 ? (
                      <GridList items={newHomeData} />
                    ) : (
                      <EmptyState
                        icon={PencilSquareIcon}
                        title="No entries yet"
                        description="Start your journaling journey by creating your first daily entry or thought of the day."
                        actionText="Create Daily Entry"
                        actionPath="/dailyjournal/:userId"
                        secondaryActionText="Add Thought of the Day"
                        secondaryActionPath="/thoughtoftheday/:userId"
                      />
                    )}
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
});

// Add display name for debugging
HomePage.displayName = 'HomePage';

export default HomePage;
