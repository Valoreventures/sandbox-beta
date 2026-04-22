import { useState, useEffect, useRef } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import IconSelectionWindow from '../components/IconSelectionWindow';
import { daily_journal_questions } from '../constants/questions';
import { JournalEntrySection } from '../components/JournalEntrySection';
import { insertJournalEntry } from '../utils/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ThoughtOfTheDay() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIconTheme, setSelectedIconTheme] = useState('');
  const [journalEntry, setJournalEntry] = useState('');

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

  function replacePrefixForThoughtOfTheDay(str) {
    if (str.startsWith('d_')) {
      return 't_' + str.slice(2);
    }
    console.log('str', str);
    return str;
  }
  const renderComponents = () => {
    switch (currentStep) {
      case 1:
        return (
          <IconSelectionWindow
            icons={daily_journal_questions}
            setSelectedIconTheme={setSelectedIconTheme}
            onSave={() => setCurrentStep(2)}
            onCancel={() => {}}
          />
        );
      case 2:
        return (
          <JournalEntrySection
            triggerQuestion={selectedIconTheme.trigger_question}
            triggerIcon={selectedIconTheme.icon}
            chapterEntry="Write your story here"
            onCancel={() => setCurrentStep(1)}
            saveToDb={() => saveToDb()}
            journalEntry={journalEntry}
            setJournalEntry={setJournalEntry}
          />
        );

      default:
        return <div>Default component or message</div>;
    }
  };

  const saveToDb = async () => {
    const dbOperation = await insertJournalEntry(
      userId,
      'thought_of_the_day',
      replacePrefixForThoughtOfTheDay(selectedIconTheme.uuid),
      selectedIconTheme.icon,
      selectedIconTheme.meaning,
      journalEntry
    );
    if (dbOperation.success) {
      toast.success('saved successfully!');
      navigate(`/home/${userId}`);
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
