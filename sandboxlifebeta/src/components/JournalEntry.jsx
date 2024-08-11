import React, { useEffect, useMemo, useState } from "react";
import { daily_journal_questions } from "../constants/questions";
import {
  BookOpenIcon,
  CalendarIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";

const ThoughtsOfTheDay = ({
  id,
  title,
  iconTitle,
  date,
  image,
  message,
  time,
  selected,
  index
}) => {
  const formatTime = (dateObj) => {
    const hrs = dateObj.getHours();
    const mns = dateObj.getMinutes();
    const formattedHours = hrs < 10 ? `0${hrs}` : hrs;
    const formattedMinutes = mns < 10 ? `0${mns}` : mns;
    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div
      className={` flex justify-between bg-opacity-70 shadow-md rounded-lg p-2 md:p-4 min-w-[280px] ${index == 0 ? "shadow-md shadow-red border-2 border-red":"border"}   mx-2    bg-white ${
        (title === "Book" && "bg-[#83cefd] border-[#83cefd]") ||
        (title === "Status" && "bg-[#f5c15f] border-[#f5c15f]") ||
        (title === "Daily" && "bg-[#72fe82] border-[#44f959]")
      }  `}
    >
      <div className="w-full   text-start space-y-2 ">
        <h2 className="text-lg font-bold leading-5 ">{iconTitle}</h2>
        <div className=" md:h-1/3 capitalize text-gray-600  text-sm">
          <p>
            {message?.length > 32 ? message?.slice(0, 32) + "..." : message}
          </p>
        </div>
        <div className="flex justify-between  items-center mr-2 ">
          <div>
            <p className="mr-2 text-xs">
              {date}
              <br />
              {time}
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="flex justify-center items-center w-10 h-10  border border-[#b1b1b1] rounded-xl bg-[#ffff]">
              <div className=" bg-darkpapyrus rounded-md">
                {title === "Book" && (
                  <BookOpenIcon className="h-5 w-5 inline m-1 " />
                )}
                {title === "Daily" && (
                  <CalendarIcon className="h-5 w-5 inline m-1 " />
                )}
                {title === "Status" && (
                  <LightBulbIcon className="h-5 w-5 inline m-1 " />
                )}
              </div>
            </div>
            <p>{title}</p>
          </div>
        </div>
      </div>
      <div className="flex w-[7rem]  md:w-[12rem]  justify-center items-center ">
        {image && (
          <img
            src={image}
            alt="Image"
            className="w-20 h-20 md:h-32 md:w-32 rounded-md "
          />
        )}
      </div>
    </div>
  );
};

export default ThoughtsOfTheDay;
