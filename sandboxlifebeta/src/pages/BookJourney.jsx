import { useState, useEffect, useRef } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import IconSelectionWindow from '../components/IconSelectionWindow';
import { book_journal_questions } from '../constants/questions';
import { JournalEntrySection } from '../components/JournalEntrySection';
import { PearlsOfWisdomWindow } from '../components/PearlsOfWisdomWindow';

export default function BookJourney() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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
            icons={book_journal_questions}
            setCurrentStep={setCurrentStep}
            onSave={() => setCurrentStep(2)}
            onCancel={() => {}}
          />
        );
      case 2:
        return (
          <JournalEntrySection
            triggerQuestion="What areas in your life, or certain situations required you to be conscious of protecting yourself? What were the threats?"
            triggerIcon="http://www.sandboxlife.com/images/icons/shield.jpg"
            chapterEntry="Write your story here"
            onCancel={() => setCurrentStep(1)}
            onSave={() => setCurrentStep(3)}
          />
        );
      case 3:
        return (
          <PearlsOfWisdomWindow
            triggerQuestion="What areas in your life, or certain situations required you to be conscious of protecting yourself? What were the threats?"
            triggerIcon="http://www.sandboxlife.com/images/icons/shield.jpg"
            chapterEntry="Pearls of wisdom"
            onCancel={() => setCurrentStep(2)}
            onSave={() => setCurrentStep(4)}
            setCurrentStep={setCurrentStep}
          />
        );

      default:
        return <div>Default component or message</div>;
    }
  };

  return (
    <div>
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
      {renderComponents()}
    </div>
  );
}
