import { useState, useEffect } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import JournalEntry from '../components/JournalEntry';
import { fetchEntries } from '../utils/supabase';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GridList, formatJournalType } from '../utils/helpers';
export default function MyBook() {
  const { userId } = useParams();
  // const date = parseISO(datetimeStr);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [tod, setTod] = useState({});

  // const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchEntries(userId, 'book_journal', 50)
      .then((data) => {
        console.log('My Book', data);
        let tempData = data.map((entry) => {
          // Format the created_at field
          const formattedDatetime = formatDatetime(entry.created_at);
          // Add the formatted date and time to the entry
          return {
            ...entry,
            date: formattedDatetime.date,
            time: formattedDatetime.time,
          };
        });
        setEntries(tempData);
      })
      .catch((error) => {
        console.log('ERROR', error), toast.error(error.message);
      });
  }, []);

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
    // Create a Date object from the datetime string
    const date = new Date(datetimeStr);

    // Function to extract date part (YYYY-MM-DD)
    function formatDate() {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    }

    // Function to extract time part (hh:mm)
    function formatTime() {
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${hours}:${minutes}`;
    }

    // Return the desired formats
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

      <div className="flex flex-row w-full items-center justify-center mt-60">
        {/* Other list cards */}
        <GridList items={entries} />
      </div>
    </>
  );
}
