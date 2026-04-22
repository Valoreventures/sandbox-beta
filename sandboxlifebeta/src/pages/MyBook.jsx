import { useState, useEffect } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchEntries } from '../utils/supabase';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GridList } from '../utils/helpers';
import { BookOpenIcon } from '@heroicons/react/24/outline';

export default function MyBook() {
  const { userId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchEntries(userId, 'book_journal', 50)
      .then((data) => {
        let tempData = data.map((entry) => {
          const formattedDatetime = formatDatetime(entry.created_at);
          return {
            ...entry,
            date: formattedDatetime.date,
            time: formattedDatetime.time,
          };
        });
        setEntries(tempData);

        const journalMeaning = new Set();
        tempData.forEach((entry) => {
          journalMeaning.add(entry.journal_meaning);
        });
        setChapters(Array.from(journalMeaning));
      })
      .catch((error) => {
        console.log('ERROR', error);
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const handlePrevClick = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1))
    );
  };

  const handleNextClick = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1))
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  function formatDatetime(datetimeStr) {
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
  }

  return (
    <>
      <TopBar toggleMenu={toggleMenu} />
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <Menu toggleMenu={toggleMenu} />
        </div>
      )}
      <CalendarDateHeader
        currentDate={currentDate}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      <ToastContainer />

      <div className="flex flex-row items-center justify-center w-full mt-35 px-4">
        {isLoading ? (
          <div className="w-full max-w-7xl">
            <LoadingSkeleton variant="card" count={4} />
          </div>
        ) : entries.length > 0 ? (
          <GridList items={entries} chapters={chapters} />
        ) : (
          <EmptyState
            icon={BookOpenIcon}
            title="No book entries yet"
            description="Start documenting your reading journey by creating your first book entry."
            actionText="Create Book Entry"
            actionPath="/bookjourney/:userId"
          />
        )}
      </div>
    </>
  );
}
