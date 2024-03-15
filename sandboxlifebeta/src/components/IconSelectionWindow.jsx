import { useState, useEffect, useRef } from 'react';

const IconCarousel = ({ icons, setCurrentStep }) => {
  const [selectedIcon, setSelectedIcon] = useState({ name: '', meaning: '' });
  const [startIndex, setStartIndex] = useState(0);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 4, 0));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 4, icons.length - 4));
  };

  const handleSave = () => {
    setCurrentStep(2);
  };

  const visibleIcons = icons.slice(startIndex, startIndex + 4);

  return (
    <div className="bg-bgpapyrus rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">
        1. Pick an icon for your Chapter...
      </h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {selectedIcon && (
            <span className="text-sm font-bold">{selectedIcon.label}</span>
          )}
        </div>
        <div className="flex">
          <button
            onClick={handlePrevClick}
            disabled={startIndex === 0}
            className="px-2 py-1 rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="h-6 w-6 text-gray-600"
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
          <div className="flex mx-2">
            {visibleIcons.map((icon, index) => (
              <div
                key={index}
                className={`mx-1 cursor-pointer ${
                  selectedIcon === icon ? 'opacity-100' : 'opacity-50'
                }`}
                onClick={() => handleIconClick(icon)}
              >
                <img src={icon.icon} alt={icon.label} className="h-12 w-12" />
              </div>
            ))}
          </div>
          <button
            onClick={handleNextClick}
            disabled={startIndex >= icons.length - 4}
            className="px-2 py-1 rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="h-6 w-6 text-gray-600"
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
      </div>
      <button
        onClick={() => handleIconClick(null)}
        className={`border border-gray-300 rounded-lg p-2 mr-2 ${
          !selectedIcon ? 'bg-gray-200' : 'bg-white'
        }`}
      >
        <span className="text-sm font-bold">
          {selectedIcon.name}-{selectedIcon.meaning}
        </span>
      </button>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none border"
      >
        Next Step
      </button>
    </div>
  );
};

export default IconCarousel;
