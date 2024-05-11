import React, { useEffect, useRef, useState } from "react";
import {
  Bars4Icon,
  PlusIcon,
  BookOpenIcon,
  CalendarIcon,
  LightBulbIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { fetchAllEntries } from "../utils/supabase";

const TopBar = ({ toggleMenu }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //Check activity//
  const monthAndRef = useRef();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [totalDays, setTotalDays] = useState();
  const [total, setTotal] = useState();
  const [monthAndYear, setMonthAndYear] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement your search logic here
  };

  useEffect(() => {
    const handleAllData = async (selectedMonth) => {
      try {
        const storedUserId = localStorage.getItem("user_id");
        const date = new Date(selectedMonth);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const startDay = date.toISOString();
        date.setMonth(date.getMonth() + 1);
        date.setDate(date.getDate() - 1);
        const lastDay = date.toISOString();
        const result = await fetchAllEntries(storedUserId, startDay, lastDay);

        if (result.length >= 0) {
          const newDataArray = new Array(31).fill(null).map(() => []);
          result.forEach((entry) => {
            const dayOfMonth = new Date(entry.created_at).getDate();
            newDataArray[dayOfMonth - 1].push(entry);
          });
          setTotal(newDataArray);
          setOpen(true);
          setTotalDays(date.getDate());
          setMonthAndYear(`${month}-${year}`);
        } else {
          toast.error("Somthing wrong❗");
        }
      } catch (error) {
        console.log(error);
      }
    };
    value.length > 0 && handleAllData(value);
  }, [value]);

  return (
    <div className="fixed top-0 left-0 right-0 shadow-md z-10 bg-darkpapyrus">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Bars4Icon className="h-6 w-6" onClick={toggleMenu} />
          <a href="#" className="text-gray-800 font-bold text-xl ml-2">
            Sandbox Life
          </a>
        </div>
        <div className="flex-grow">
          <div className="relative mx-auto max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-0 mt-3 h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div>
          {/*check activity*/}
          <div className="relative w-min flex flex-col p-1  text-start text-sm mx-1">
            <p className="right-5 ">check activity</p>
            <input
              ref={monthAndRef}
              type="month"
              className=" rounded-md px-1 "
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          {/* Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-gray-800 hover:text-gray-600 mr-4"
            >
              <PlusIcon className="h-6 w-6" />
              <span className="ml-1">New Entry</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 bg-darkpapyrus">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  <BookOpenIcon className="h-5 w-5 inline mr-2" />
                  {/* Book Journal */}
                  <Link
                    to="/bookjourney"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
                  >
                    Book Entry
                  </Link>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  <CalendarIcon className="h-5 w-5 inline mr-2" />
                  {/* Daily Journal */}
                  <Link
                    to="/dailyjournal"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
                  >
                    Daily Entry
                  </Link>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  <LightBulbIcon className="h-5 w-5 inline mr-2" />
                  {/* Thoughts of the Day */}
                  <Link
                    to="/thoughtoftheday"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
                  >
                    Update Status
                  </Link>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {open && (
        <div className="absolute w-full   ">
          <div className="w-96 m-auto bg-darkpapyrus shadow-2xl shadow-[#000000] border rounded-md  p-1   mt-10">
            <XMarkIcon
              onClick={() => {
                setOpen(false),
                  (monthAndRef.current.value = ""), // here clearing the current value that showing in chek activity bar
                  setValue("");
              }}
              className="ml-auto w-6  bg-bgpapyrus shadow-md border cursor-pointer rounded-md"
            />
            <span>{monthAndYear && monthAndYear}</span>
            <div className="grid grid-cols-6 gap-1 p-1 w-full h-full border rounded-md">
              {total.map((value, index) => (
                <div
                  key={index}
                  className={`relative bg-opacity-35 h-14 w-14 cursor-pointer ${
                    index + 1 <= totalDays ? "bg-red" : "bg-[#000000] "
                  } `}
                >
                  {" "}
                  <p className="absolute text-xs">{index + 1}</p>
                  {/* Here will check last entry of the current day */}
                  {value.length ? (
                    <img
                      src={value[0].journal_icon}
                      alt=""
                      className=" object-cover h-14 w-full"
                    />
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TopBar;
