import { useState } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import IconSelectionWindow from '../components/IconSelectionWindow';
import { book_journal_questions } from '../constants/questions';
import { JournalEntrySection } from '../components/JournalEntrySection';
import { PearlsOfWisdomWindow } from '../components/PearlsOfWisdomWindow';

export default function NewJournal() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      {/* <IconSelectionWindow icons={book_journal_questions} /> */}
      <JournalEntrySection
        triggerQuestion="What areas in your life, or certain situations required you to be conscious of protecting yourself? What were the threats?"
        triggerIcon="http://www.sandboxlife.com/images/icons/shield.jpg"
        chapterEntry="Write your story here"
        onCancel={() => {}}
        onSave={() => {}}
      />

      {/* <PearlsOfWisdomWindow
        // triggerQuestion='What areas in your life, or certain situations required you to be conscious of protecting yourself? What were the threats?'
        triggerIcon='http://www.sandboxlife.com/images/icons/shield.jpg'
        chapterEntry='Pearls of wisdom'
        onCancel={() => { }}
        onSave={() => { }}
      /> */}
    </div>
  );
}
