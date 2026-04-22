import { useEffect, useState, memo, useMemo, useCallback } from "react";
import { fetchWeeklyData } from "../utils/supabase";
import { formatDatetime } from "../utils/helpers";
import OptimizedImage from "./OptimizedImage";

const CalendarComponent = memo(() => {

  const [weeklyData, setweeklyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedUserId = localStorage.getItem("user_id");
      const today = new Date();
      const week = new Date(today);
      week.setDate(today.getDate() - 5);
      const dateFrom = week.toISOString();

      const result = await fetchWeeklyData(storedUserId, dateFrom);

      if (result) {
        setweeklyData(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize sorted weekly data to prevent re-sorting on every render
  const sortedWeeklyData = useMemo(() => {
    return weeklyData ? [...weeklyData].sort() : [];
  }, [weeklyData]);

  // Memoize day components to prevent unnecessary re-renders
  const dayComponents = useMemo(() => {
    return sortedWeeklyData.map((day, index) => {
      const isCurrentDay = index === 4;
      const hasJournalIcon = day?.journal_icon;

      return (
        <div key={`${day?.id || index}-${day?.created_at || ''}`} className="flex flex-col items-center gap-3 group">
          <div
            className={`
              relative flex items-center justify-center 
              w-16 h-16 rounded-2xl 
              transition-all duration-300 ease-out
              cursor-pointer select-none
              ${isCurrentDay
                ? "bg-blue-50 border-2 border-blue-500 shadow-md ring-4 ring-blue-50/50 scale-110"
                : "bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1"
              }
            `}
          >
            {hasJournalIcon ? (
              <OptimizedImage
                src={day.journal_icon}
                alt={`Journal entry for ${formatDatetime(day.created_at).date}`}
                className="w-full h-full rounded-xl object-cover"
                lazy={true}
                maintainAspectRatio={false}
                style={{ width: '100%', height: '100%' }}
                placeholder={
                  <div className="w-full h-full rounded-xl bg-gray-50 animate-pulse"></div>
                }
              />
            ) : (
              <div className={`
                w-2 h-2 rounded-full 
                ${isCurrentDay ? "bg-blue-400" : "bg-gray-300 group-hover:bg-gray-400"}
                transition-colors duration-300
              `}></div>
            )}
          </div>
          <span
            className={`
              text-xs font-semibold tracking-wide text-center uppercase
              transition-colors duration-300
              ${isCurrentDay
                ? "text-blue-600"
                : "text-gray-400 group-hover:text-gray-600"
              }
            `}
          >
            {formatDatetime(day.created_at).date}
          </span>
        </div>
      );
    });
  }, [sortedWeeklyData]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-7 gap-4 w-full max-w-md">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center space-y-3">
                <div className="w-14 h-14 rounded-xl bg-gray-200 animate-pulse"></div>
                <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full">
        {dayComponents}
      </div>
    </div>
  );
});

// Add display name for debugging
CalendarComponent.displayName = 'CalendarDateHeader';

export default CalendarComponent;
