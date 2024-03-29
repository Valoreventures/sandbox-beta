import React from 'react';

const CalendarComponent = () => {
  const daysOfWeek = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
  const icons = [
    <img
      src="http://www.sandboxlife.com/images/icons/snake.jpg"
      alt="Snake"
      className="h-6 w-6"
    />, // Thursday (no icon)
    <img
      src="http://www.sandboxlife.com/images/icons/lotus.jpg"
      alt="Lotus"
      className="h-6 w-6"
    />, // Friday (no icon)
    <img
      src="http://www.sandboxlife.com/images/icons/bird.jpg"
      alt="bird"
      className="h-6 w-6"
    />, // Saturday
    [
      <div className="bg-purple-500 rounded-full h-8 w-8 flex items-center justify-center mb-1">
        <span className="text-white font-bold">4</span>
      </div>,
      <img
        src="http://www.sandboxlife.com/images/icons/lotus.jpg"
        alt="Lotus"
        className="h-6 w-6"
      />,
    ], // Sunday
    <img
      src="http://www.sandboxlife.com/images/icons/key.jpg"
      alt="Access"
      className="h-6 w-6"
    />, // Monday (no icon)
    <img
      src="http://www.sandboxlife.com/images/icons/trophy.jpg"
      alt="Trophy"
      className="h-6 w-6"
    />, // Tuesday (no icon)
    <img
      src="http://www.sandboxlife.com/images/icons/bird.jpg"
      alt="Butterfly"
      className="h-6 w-6"
    />, // Wednesday (no icon)
  ];

  return (
    <div className=" fixed w-full flex justify-between items-center right-0 top-8 bg-lightpapyrus px-10 py-10">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="text-gray-600 font-medium mb-2">{day}</span>
          {Array.isArray(icons[index]) ? (
            icons[index].map((icon, iconIndex) => (
              <div key={iconIndex} className="mb-1">
                {icon}
              </div>
            ))
          ) : (
            <div>{icons[index]}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CalendarComponent;
