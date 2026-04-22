import { useState, useEffect } from 'react';
import { setb_preview_icons, getSpecialTreatmentIcons } from '../constants/setb-icons';

const SetBPreviewWindow = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  
  const iconsPerPage = viewMode === 'carousel' ? 5 : 12;
  const specialIcons = getSpecialTreatmentIcons();

  useEffect(() => {
    if (setb_preview_icons.length > 0) {
      setSelectedIcon(setb_preview_icons[0]);
    }
  }, []);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - iconsPerPage, 0));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => 
      Math.min(prevIndex + iconsPerPage, setb_preview_icons.length - iconsPerPage)
    );
  };

  const visibleIcons = setb_preview_icons.slice(startIndex, startIndex + iconsPerPage);

  const getIconFrameClass = (icon) => {
    if (!icon.special_treatment) return 'border-2 border-gray-300';
    
    // Special treatment for Mermaid (Lunar Swan equivalent)
    if (icon.uuid === 'sb_mermaid') {
      return 'border-4 border-blue-300 shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50';
    }
    
    // Special treatment for Peacock (Firebird equivalent)  
    if (icon.uuid === 'sb_peacock') {
      return 'border-4 border-orange-300 shadow-lg shadow-orange-200 bg-gradient-to-r from-orange-50 to-red-50';
    }
    
    return 'border-2 border-gray-300';
  };

  return (
    <div className="bg-bgpapyrus rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Set B Icon Collection
        </h1>
        <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 mb-4">
          <p className="text-yellow-800 font-semibold">
            🔍 Preview Only - These icons are not yet available for journaling
          </p>
        </div>
      </div>
      {/* View Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-1 border">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === 'carousel' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Carousel View
          </button>
        </div>
      </div>

      {/* Navigation Controls for Carousel */}
      {viewMode === 'carousel' && (
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevClick}
            disabled={startIndex === 0}
            className="px-3 py-2 rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-sm text-gray-600">
            {startIndex + 1} - {Math.min(startIndex + iconsPerPage, setb_preview_icons.length)} of {setb_preview_icons.length}
          </span>
          
          <button
            onClick={handleNextClick}
            disabled={startIndex >= setb_preview_icons.length - iconsPerPage}
            className="px-3 py-2 rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Icons Display */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4' 
          : 'flex justify-center space-x-4'
      } mb-6`}>
        {(viewMode === 'grid' ? setb_preview_icons : visibleIcons).map((icon, index) => (
          <div
            key={icon.uuid}
            className={`cursor-pointer transition-all duration-200 ${
              selectedIcon?.uuid === icon.uuid ? 'transform scale-105' : 'hover:transform hover:scale-102'
            }`}
            onClick={() => handleIconClick(icon)}
          >
            <div className={`rounded-lg p-3 ${getIconFrameClass(icon)}`}>
              <img 
                src={icon.icon} 
                alt={icon.name}
                className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-md object-cover"
              />
              <div className="text-center mt-2">
                <p className="text-xs md:text-sm font-semibold text-gray-800">{icon.name}</p>
                <p className="text-xs text-gray-600">{icon.meaning}</p>
                {icon.special_treatment && (
                  <div className="mt-1">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      Special
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Selected Icon Details */}
      {selectedIcon && (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className={`flex-shrink-0 rounded-lg p-4 ${getIconFrameClass(selectedIcon)}`}>
              <img 
                src={selectedIcon.icon} 
                alt={selectedIcon.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-md object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  {selectedIcon.name}
                </h3>
                {selectedIcon.special_treatment && (
                  <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">
                    Special Card
                  </span>
                )}
              </div>
              <p className="text-lg text-blue-600 font-semibold mb-3">
                {selectedIcon.meaning}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {selectedIcon.description}
              </p>
              {selectedIcon.special_treatment && (
                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-purple-800 text-sm">
                    <strong>Special Treatment:</strong> This icon receives unique visual styling 
                    to highlight its distinctive significance in the Set B collection.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Special Icons Highlight */}
      {specialIcons.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
            ✨ Special Cards in Set B
          </h3>
          <div className="flex justify-center space-x-6">
            {specialIcons.map((icon) => (
              <div 
                key={icon.uuid}
                className="text-center cursor-pointer"
                onClick={() => handleIconClick(icon)}
              >
                <div className={`rounded-lg p-3 ${getIconFrameClass(icon)}`}>
                  <img 
                    src={icon.icon} 
                    alt={icon.name}
                    className="w-16 h-16 mx-auto rounded-md object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-800 mt-2">{icon.name}</p>
                <p className="text-xs text-gray-600">{icon.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Set B Collection contains {setb_preview_icons.length} unique icons</p>
        <p className="mt-1">These icons will be available for journaling in a future update</p>
      </div>
    </div>
  );
};

export default SetBPreviewWindow;