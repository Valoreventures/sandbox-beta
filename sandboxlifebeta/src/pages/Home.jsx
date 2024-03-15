import { useState } from 'react';
import CalendarDateHeader from '../components/CalendarDateHeader';
import Menu from '../components/Menu';
import TopBar from '../components/TopBar';
import JournalEntry from '../components/JournalEntry';

export default function HomePage() {
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

  const cards = [{}, {}, {}, {}]; // TODO: Fill this with actual data
  const imageUrl = 'http://www.sandboxlife.com/images/icons/lotus.jpg';
  const postTime = new Date('2023-03-10T08:30:00');

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

      <div className="flex flex-row py-16 w-full left-0 border border-gray-300 rounded-xl  ">
        {cards.map((v, index) => (
          <div key={index} className=" m-2">
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
      </div>
    </>
  );
}
