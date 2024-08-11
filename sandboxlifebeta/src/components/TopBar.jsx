import React, { useContext, useEffect, useRef, useState } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchAllEntries } from "../utils/supabase";
import logo from "../assets/otherImg/sandBoxLifeR.png";
import { Context } from "../utils/helpers";
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
  const [userId, setUserId] = useState(null);
  const [context, setContext] = useContext(Context);
  const {pathname} = useLocation();
  const currentPath = pathname.split("/")[1]
  const navigate = useNavigate()

  function getUserIdFromStorage() {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
  }
  useEffect(() => {
    getUserIdFromStorage();
  }, []);


  const handleCheckActivity = (e) => {
    setContext(e.target.value)
    console.log(currentPath);
    if(currentPath != "my-calendar"){
      navigate(`/my-calendar/${userId}`)
    }
  }


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
    <div className="fixed z-50 top-0 left-0 right-0 shadow-md  bg-darkpapyrus">
      <div className="container mx-auto px-2 py-2 flex items-center justify-between">
        <div className="flex items-center  ">
          <Bars4Icon className="h-6 w-6" onClick={toggleMenu} />
          <div className="flex justify-center ml-2">
            <a href="#">
              <img alt="" className="h-6 md:h-8 " src={logo} />
            </a>
          </div>
        </div>
        <div className="flex-grow">
          <div className="relative mx-auto max-w-md">
            {/* <input
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
            </svg> */}
            <div className=" hidden sm:flex  mx-auto   w-min   rounded-md     text-start text-sm ">
              <input
                type="month"
                className=" rounded-md px-1 cursor-pointer hover:bg-darkpapyrus w-[8rem] "
                value={context&&context}
                onChange={handleCheckActivity}
              />
              <p className="right-5 text-center font-semibold text-nowrap ml-2 ">
                Check activity
              </p>
            </div>
          </div>
        </div>
        <div className="flex  ">
          {/* Dropdown Button */}
          <div className="relative  ">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center ml-1 text-gray-800 hover:text-gray-600 "
            >
              <PlusIcon className="h-5 w-5 mx-1" />
              <span className=" text-[0.7rem] md:text-lg font-bold ">New</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute  border right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 bg-darkpapyrus">
                <a
                  href="#"
                  className=" flex justify-start items-center  px-2 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  <BookOpenIcon className="h-5 w-5  inline " />
                  {/* Book Journal */}
                  <Link
                    to="/bookjourney"
                    className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 focus:outline-none"
                  >
                    Book
                  </Link>
                </a>
                <a
                  href="#"
                  className=" flex justify-start items-center  px-2 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  <CalendarIcon className="h-5 w-5 inline " />
                  {/* Daily Journal */}
                  <Link
                    to="/dailyjournal"
                    className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 focus:outline-none"
                  >
                    Daily
                  </Link>
                </a>
                <a
                  href="#"
                  className="flex  justify-start items-center  px-2 py-1 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
                >
                  <LightBulbIcon className="h-5 w-5 inline " />
                  {/* Thoughts of the Day */}
                  <Link
                    to="/thoughtoftheday"
                    className="bg-gray-500 text-white px-2 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
                  >
                    Update Status
                  </Link>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" sm:hidden  mx-auto flex  w-min   rounded-md     text-start text-sm ">
        <input
          type="month"
          className=" rounded-md px-1 cursor-pointer hover:bg-darkpapyrus w-[8rem] "
          value={context&&context}
                onChange={handleCheckActivity}
        />
        <p className="right-5 text-center font-semibold text-nowrap ml-2 ">
          Check activity
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TopBar;
