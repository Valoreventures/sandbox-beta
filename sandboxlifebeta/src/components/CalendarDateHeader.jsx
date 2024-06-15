import { useEffect, useState } from "react";
import { fetchWeeklyData } from "../utils/supabase";

const CalendarComponent = () => {
  const [weeklyData, setweeklyData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = localStorage.getItem("user_id");
        const today = new Date();
        const week = new Date(today);
        week.setDate(today.getDate() - 6);
        const dateFrom = week.toISOString();

        const result = await fetchWeeklyData(storedUserId, dateFrom);

        if (result) {
          const newDataArray = new Array(7).fill().map((v, i) => {
            const currentDate = new Date(week);
            currentDate.setDate(week.getDate() + i);
            return { date: currentDate.getDate(), data: [] }; // Initialize data as an empty array
          });

          // Fill newDataArray with data from result
          result.forEach((item) => {
            const createdAtDate = new Date(item.created_at).getDate();
            const index = newDataArray.findIndex(
              (obj) => obj.date === createdAtDate
            );
            if (index !== -1) {
              newDataArray[index].data.push(item); // Add the item to the corresponding date in newDataArray
            }
          });

          setweeklyData(newDataArray);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className=" fixed z-10 w-full gap-2 h-auto flex justify-evenly text-xs items-center  right-0 top-6 md:top-6 bg-bgpapyrus bg-opacity-100 px-2 md:px-0 py-2  mt-8">
      {weeklyData &&
        weeklyData.map((day, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center   w-14 h-14  m-auto ${
              index === 6 &&
              "border w-18 h-18 rounded-md shadow-[#787878] shadow-md bg-lightpapyrus"
            }`}
          >
            <span className="absolute left-0 bottom-0  text-gray-600 font-medium ">
              {day.date}
            </span>
            {day?.data[day.data.length - 1]?.journal_icon?<img
              src={day?.data[day.data.length - 1]?.journal_icon}
              alt=""
              className={` w-8 my-auto rounded-md ${index === 6 && " w-10 "}`}
            />:<div className="w-8 h-8 bg-darkpapyrus my-auto rounded-md"/>}
          </div>
        ))}
    </div>
  );
};

export default CalendarComponent;
