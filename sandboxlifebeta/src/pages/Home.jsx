import { useState, useEffect } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import JournalEntry from '../components/JournalEntry';
import { fetchTopUserRecords, fetchEntries } from '../utils/supabase';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatJournalType } from '../utils/helpers';
export default function HomePage() {
  const { userId } = useParams();
  // const date = parseISO(datetimeStr);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [tod, setTod] = useState({});

  // const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchEntries(userId, 'thought_of_the_day', 1)
      .then((data) => {
        console.log('HOME ToD', data);
        setTod(data[0]);
      })
      .catch((error) => {
        console.log('ERROR', error), toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    fetchTopUserRecords(userId)
      .then((data) => {
        console.log('HOME DATA', data);
        let tempData = data.data.map((entry) => {
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

  const cards = [{}, {}, {}, {}]; // TODO: Fill this with actual data
  const imageUrl = 'http://www.sandboxlife.com/images/icons/lotus.jpg';
  const postTime = new Date('2023-03-10T08:30:00');

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

  // Example usage
  const datetimeStr = '2024-03-15 21:08:38.13273+00';
  const formattedDatetime = formatDatetime(datetimeStr);
  console.log(formattedDatetime.date); // Output: 2024-03-15
  console.log(formattedDatetime.time); // Output: 21:08

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
      {/* <div className="left-0 bg-red flex flex-grow">
        {cards.map((v, index) => (
          <div key={index} className="m-2 w-full">
            <JournalEntry
              title="Daily Journal"
              iconTitle="Lotus"
              date="10th March 2023"
              image={imageUrl}
              message="The day didn't go well in morning. I tried to make coffee but it burned out. I missed my bus."
              time={postTime}
            />
          </div>
        ))}
      </div> */}

      <div className="flex flex-row py-16 w-full left-0">
        {/* One today's entry card */}
        <JournalEntry
          title={formatJournalType(tod.journal_type)}
          iconTitle={tod.journal_meaning}
          // date="10th March 2023"
          date={formatDatetime(tod.created_at).date}
          image={tod.journal_icon}
          message={tod.journal_entry}
          time={tod.created_at}
        />
        {/* Other list cards */}
        {entries.map((d, index) => (
          <div key={index} className=" m-2">
            <JournalEntry
              title={formatJournalType(d.journal_type)}
              iconTitle={d.journal_meaning}
              // date="10th March 2023"
              date={formatDatetime(d.created_at).date}
              image={d.journal_icon}
              message={d.journal_entry}
              time={d.created_at}
            />
          </div>
        ))}
      </div>
    </>
  );
}
