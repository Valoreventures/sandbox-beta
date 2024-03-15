import { useState } from 'react';
import CalendarDateHeader from "../components/CalendarDateHeader";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";
import { Bars4Icon, XMarkIcon  } from "@heroicons/react/24/solid";
import ThoughtsOfTheDay from "../components/thoughtsoftheday";

export default function HomePage(){
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePrevClick = () => {
    setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)));
  };

  const handleNextClick = () => {
    setCurrentDate((prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)));
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const imageUrl = 'http://www.sandboxlife.com/images/icons/lotus.jpg';
  const postTime = new Date('2023-03-10T08:30:00');
  return (
    <div>
        
      <TopBar />
      {isMenuOpen && <Menu />}
      <button onClick={toggleMenu}>Menu</button>
      <CalendarDateHeader
        currentDate={currentDate}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
     <ThoughtsOfTheDay
      title="Thoughts of the Day"
      date="10th March 2023"
      image={imageUrl}
      message="The day didn't go well in morning. I tried to make coffee but it burned out. I missed my bus."
      time={postTime}
    />
      {/* Rest of your calendar components */}
    </div>
  );
}
