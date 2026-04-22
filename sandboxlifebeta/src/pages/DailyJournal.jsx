import { useState, useEffect, useRef } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import IconSelectionWindow from '../components/IconSelectionWindow';
import { daily_journal_questions } from '../constants/questions';
import { JournalEntrySection } from '../components/JournalEntrySection';
import { insertJournalEntry , fetchDailyEntryCount} from '../utils/supabase';
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function DailyJournal() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIconTheme, setSelectedIconTheme] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [changeQuestion, setChangeQuestion] = useState(0);
  const [dailyEntryCount, setDailyEntryCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const fetchCount = async () => {
      const count = await fetchDailyEntryCount(userId);
      setDailyEntryCount(count);
    };

    fetchCount();
  }, [userId]);


  const handleChangeQuestion = () =>{
     const number = Math.floor(Math.random() * 4)
     setChangeQuestion(number)
  }

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      // Skips setState on the first render
      isFirstRender.current = false;
      return;
    }
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

  const renderComponents = () => {
    switch (currentStep) {
      case 1:
        return (
          <IconSelectionWindow
            icons={daily_journal_questions}
            setSelectedIconTheme={setSelectedIconTheme}
            onSave={() => setCurrentStep(2)}
            onCancel={() => {}}
            dailyEntryCount={dailyEntryCount}
          />
        );
      case 2:
        return (
          <JournalEntrySection
            triggerQuestion={selectedIconTheme.trigger_question}
            triggerIcon={selectedIconTheme.icon}
            journalType={selectedIconTheme.journal_type}
            chapterEntry="Write your story here"
            onCancel={() => setCurrentStep(1)}
            saveToDb={saveToDb}
            journalEntry={journalEntry}
            setJournalEntry={setJournalEntry}
            changeQuestion={handleChangeQuestion}
            isLimitReached={dailyEntryCount >= 5}
          />
        );

      default:
        return <div>Default component or message</div>;
    }
  };

  const saveToDb = async (isNewEntry = false) => {
    if (dailyEntryCount >= 5) {
      toast.error('You have reached the maximum of 5 entries for today!');
      return;
    }

    const dbOperation = await insertJournalEntry(
      userId,
      selectedIconTheme.journal_type,
      selectedIconTheme.uuid,
      selectedIconTheme.icon,
      selectedIconTheme.meaning,
      journalEntry
    );
    if (dbOperation.success) {
      toast.success('saved successfully!');
      setDailyEntryCount((prev) => prev + 1);
      console.log('new entry', isNewEntry);
      // isNewEntry ? navigate(`/dailyjournal`):navigate(`/home/${userId}`);
      if (isNewEntry) {
        setCurrentStep(1);
        setSelectedIconTheme('');
        setJournalEntry('');
      } else {
        navigate(`/home/${userId}`);
      }
    } else {
      toast('something went wrong while saving the data');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-lightpapyrus">
      <div className="w-full">
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
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-6 sm:px-6 lg:px-8 overflow-auto">
        <div className="w-full max-w-4xl">
          {renderComponents()}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
