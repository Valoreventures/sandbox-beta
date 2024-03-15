import React from 'react';

const ThoughtsOfTheDay = ({ title, iconTitle, date, image, message, time }) => {
  const formatTime = (dateObj) => {
    const hrs = dateObj.getHours();
    const mns = dateObj.getMinutes();
    const formattedHours = hrs < 10 ? `0${hrs}` : hrs;
    const formattedMinutes = mns < 10 ? `0${mns}` : mns;
    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-sm mx-2 my-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold">{iconTitle}</h3>
        {image && <img src={image} alt="Image" className="h-6 w-6" />}
      </div>
      <p className="flex items-left text-gray-700 mb-2">
        {date} at {time && formatTime(new Date(time))}
      </p>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default ThoughtsOfTheDay;
