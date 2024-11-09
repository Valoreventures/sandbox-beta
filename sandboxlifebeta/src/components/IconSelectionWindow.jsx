import { useState, useEffect, useRef } from 'react';
import { toast } from "react-toastify";

const IconCarousel = ({ icons, onSave, setSelectedIconTheme, dailyEntryCount }) => {
  const [selectedIcon, setSelectedIcon] = useState({ name: '', meaning: '' });
  const [startIndex, setStartIndex] = useState(0);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setSelectedIconTheme(icon);
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 4, icons.length - 4));
  };

  const visibleIcons = icons.slice(startIndex, startIndex + 5);

  useEffect(()=>{
    handleIconClick(icons[0])
  },[])


  const handleNextStep = () => {
    if (dailyEntryCount >= 5) {
      // Show a toast message if the limit is reached
      toast.error("You have reached the daily limit of 5 entries.");
    } else {
      // Proceed to the next step if the limit is not reached
      onSave();
    }
  };

  return (
    <div className="bg-bgpapyrus rounded-lg shadow-md py-4 w-[19rem] sm:w-auto md:w-[40rem]">
      <h2 className=" md:text-xl font-bold mb-4">
        1. Pick an icon for your Chapter...
      </h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {selectedIcon && (
            <span className="text-sm font-bold">{selectedIcon.label}</span>
          )}
        </div>
          <button
            onClick={handlePrevClick}
            disabled={startIndex === 0}
            className=" px-1 py-1 md:px-2 rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="h-5 w-5 md:w-8 md:h-8 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        <div className="flex  mx-auto ">
          <div className="flex mx-2  ">
            {visibleIcons.map((icon, index) => (
              <div
                key={index}
                className={`mx-1 cursor-pointer ${
                  selectedIcon === icon ? 'opacity-100' : 'opacity-50'
                }`}
                onClick={() => handleIconClick(icon)}
              >
                <img src={icon.icon} alt={icon.label} className="w-10 h-10 md:h-24 md:w-24 rounded-md shadow-md shadow-[#9c9c9c]" />
              </div>
            ))}
          </div>
        </div>
          <button
            onClick={handleNextClick}
            disabled={startIndex >= icons.length - 4}
            className="px-1 py-1 md:px-2 rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="h-5 w-5 md:w-8 md:h-8 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
      </div>
      <div className=' justify-end'>
      <div
        onClick={() => handleIconClick(null)}
        className={` w-full p-2  ${
          !selectedIcon ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        <span className="text-sm font-bold">
          {selectedIcon.name}-{selectedIcon.meaning}
        </span>
      </div>
      <button
        onClick={handleNextStep}
        className="bg-blue-500 text-white px-4 py-2 mx-2 w-1/3 md:w-1/5 text-xs sm:text-base rounded-xl hover:bg-darkpapyrus focus:outline-none border"
      >
        Next Step
      </button>
      </div>
    </div>
  );
};

export default IconCarousel;
