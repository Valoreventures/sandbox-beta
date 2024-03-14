import { useState } from 'react';
import CalendarDateHeader from "../components/CalendarDateHeader";
import Menu from "../components/Menu";
import { Bars4Icon, XMarkIcon  } from "@heroicons/react/24/solid";

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

  return (
    <div>
        
       
      <button onClick={toggleMenu}>Menu</button>
      <CalendarDateHeader
        currentDate={currentDate}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      {isMenuOpen && <Menu />}
      {/* Rest of your calendar components */}
    </div>
  );
}
