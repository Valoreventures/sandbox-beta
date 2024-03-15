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

  const cards = [{}, {}, {}, {}, {}, {}]; // TODO: Fill this with actual data
  const imageUrl = 'http://www.sandboxlife.com/images/icons/lotus.jpg';
  const postTime = new Date('2023-03-10T08:30:00');

  return (
    <>
      <TopBar toggleMenu={toggleMenu} />
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-bgpapyrus">
        {isMenuOpen && (
          <div className="fixed inset-0 z-50">
            <Menu toggleMenu={toggleMenu} />
          </div>
        )}

        <div className="flex-grow overflow-auto pt-10">
          <CalendarDateHeader
            currentDate={currentDate}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
          <div className="flex flex-wrap justify-center p-5">
            {cards.map((v, index) => (
              <div key={index} className="m-2">
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
        </div>
      </div>
    </>
  );
}
