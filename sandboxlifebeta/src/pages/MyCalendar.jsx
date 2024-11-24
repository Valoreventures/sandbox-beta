import { useState, useEffect, useRef, useContext } from "react";
import CalendarDateHeader from "../components/CalendarDateHeader";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";
import { fetchAllEntries, fetchEntries } from "../utils/supabase";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link, animateScroll as scroll } from 'react-scroll';
import JournalEntry from "../components/JournalEntry";
import { Context, formatJournalType } from "../utils/helpers";
import EntryDetails from "../components/EntryDetails";

export default function MyCalendar() {
  const { userId } = useParams();
  // const date = parseISO(datetimeStr);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [context, setContext] = useContext(Context);
  

  //Check activity//

  // const [value, setValue] = useState("");
  const [selectedDay, setSelectedDay] = useState();
  const [totalDays, setTotalDays] = useState();
  const [total, setTotal] = useState(new Array(31).fill(null).map(() => []));
  const [monthAndYear, setMonthAndYear] = useState("");
  const [selected, setSelected] = useState(null)

  // const [userId, setUserId] = useState(null);
  useEffect(() => {
    fetchEntries(userId, "daily_journal", 50)
      .then((data) => {
        console.log("My Calendar", data);
        let tempData = data.map((entry) => {
          // Format the created_at field
          const formattedDatetime = formatDatetime(entry.created_at);
          // Add the formatted date and time to the entry
          return {
            ...entry,
            date: formattedDatetime.date,
            time: formattedDatetime.time,
          };
        });
        setEntries(tempData);
      })
      .catch((error) => {
        console.log("ERROR", error), toast.error(error.message);
      });
  }, []);

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
          setTotalDays(date.getDate());
          setMonthAndYear(`${month}/${year}`);
        } else {
          toast.error("Somthing wrong❗");
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    context && handleAllData(context);
  }, [context]);



  const handlePrevClick = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1))
    );
  };

  const handleNextClick = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1))
    );
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  function formatDatetime(datetimeStr) {
    // Create a Date object from the datetime string
    const date = new Date(datetimeStr);

    // Function to extract date part (YYYY-MM-DD)
    function formatDate() {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, "0");

      return `${month}-${day}`;
    }

    // Function to extract time part (hh:mm)
    function formatTime() {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${hours}:${minutes}`;
    }

    // Return the desired formats
    return {
      date: formatDate(),
      time: formatTime(),
    };
  }

  const formatTime = (dateObj) => {
    const hrs = dateObj.getHours();
    const mns = dateObj.getMinutes();
    const formattedHours = hrs < 10 ? `0${hrs}` : hrs;
    const formattedMinutes = mns < 10 ? `0${mns}` : mns;
    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleOnClick = (data) => {
    setSelected(data);
};

const resetContextAndStates = () => {
  setTotalDays(null);
  setMonthAndYear("");
  setTotal(new Array(31).fill(null).map(() => []));
  setSelectedDay(null);
  setContext(null);
};

  return (
    <div className="">
      <TopBar toggleMenu={toggleMenu} />

      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <Menu toggleMenu={toggleMenu} />
        </div>
      )}
      <CalendarDateHeader
        currentDate={currentDate}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      <ToastContainer />

      <div className="w-full mt-2 ">
        {/* <div className="flex flex-col p-1 mx-auto my-5 text-sm border-2 rounded-md w-min text-start ">
          <p className="font-semibold text-center right-5 ">Check activity</p>
          <input
            ref={monthAndRef}
            type="month"
            className="px-1 rounded-md cursor-pointer hover:bg-darkpapyrus"
            onChange={(e) => setValue(e.target.value)}
          />
        </div> */}
      {context&&<div className="grid md:flex ">
      <div className="w-auto px-2 mb-10 md:w-1/2">
      <h2 className="text-lg font-bold">Calendar</h2>
          <div className="w-auto sm:w-[23rem] lg:w-[24rem]  m-auto bg-darkpapyrus shadow-2xl shadow-[#000000] border rounded-md  p-1   ">
            <XMarkIcon
              onClick={resetContextAndStates}
              className="w-6 my-1 ml-auto border rounded-md shadow-md cursor-pointer bg-bgpapyrus"
            />
            <span>{monthAndYear && monthAndYear}</span>
            <div className="grid w-full h-full grid-cols-6 gap-1 p-1 border rounded-md ">
              {total?.map((value, index) => (
                <Link  key={index} activeClass="active" to="section1" spy={true} smooth={true} duration={500}>
                <div
                 
                  onClick={() =>{
                    const bookJournals = value.filter(
                      (entry) => entry.journal_type === "book_journal"
                    );

                    const dailyJournals = value.filter(
                      (entry) => entry.journal_type === "daily_journal"
                    );

                    dailyJournals.reverse();

                    setSelectedDay([...dailyJournals, ...bookJournals]);
                  }}
                  className={` bg-opacity-35 h-11 w-11  md:h-14 md:w-14 cursor-pointer  ${
                    index + 1 <= totalDays ? "bg-red" : "bg-[#000000] "
                  } `}
                >
                  {" "}
                  <p className="absolute text-xs">{index + 1}</p>
                  
                  {value.length ? (
                    <img
                    src={value[value.length - 1].journal_icon} // Oldest journal entry
                      alt=""
                      className="object-cover w-full h-auto md:h-14"
                    />
                  ) : (
                    ""
                  )}
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className=" h-[25vh] md:hidden" id="section1"></div>
        <div className="w-auto md:w-1/2 " >
        <h2 className="text-lg font-bold ">Activity</h2>
          {selectedDay &&
            selectedDay?.map((value, index) => (
              // <div
              //   key={index}
              //   className="w-auto p-4 mx-2 mb-2 bg-white border rounded-lg shadow-md h-min"
              // >
              //   <h2 className="text-lg font-bold">{value.journal_type}</h2>
              //   <div className="flex items-center justify-between mb-2">
              //     <h3 className="text-sm font-bold">
              //       {value.journal_meaning}
              //     </h3>
              //     {value.journal_icon && (
              //       <img
              //         src={value.journal_icon}
              //         alt="Image"
              //         className="w-6 h-6"
              //       />
              //     )}
              //   </div>
              //   <p className="flex mb-2 text-gray-700 items-left">
              //     {formatDatetime(value.created_at).date} at{" "}
              //     {value.created_at && formatTime(new Date(value.created_at))}
              //   </p>
              //   <p className="text-gray-600">{value.journal_entry}</p>
              // </div>
              <div key={index} className='my-2 cursor-pointer' 
               onClick={()=>handleOnClick(value)} 
               >
              <JournalEntry
                id={value.id}
                index={index}
                title={formatJournalType(value.journal_type)}
                iconTitle={value.journal_meaning}
                // date="10th March 2023"
                date={formatDatetime(value.created_at).date}
                image={value.journal_icon}
                message={value.journal_entry}
                time={formatDatetime(value.created_at).time} 
                // selected={selected}
              />
              </div>
                
            ))}

                {selected && <EntryDetails  id={selected.id}
                title={formatJournalType(selected.journal_type)}
                iconTitle={selected.journal_meaning}
                // date="10th March 2023"
                date={formatDatetime(selected.created_at).date}
                image={selected.journal_icon}
                message={selected.journal_entry}
                time={formatDatetime(selected.created_at).time} 
                selected={selected} 
                setSelected={setSelected}
                />}
        </div>
      </div>}
      </div>
      <ToastContainer />
    </div>
  );
}
