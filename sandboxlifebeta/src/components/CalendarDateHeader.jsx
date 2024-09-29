import { useEffect, useState } from "react";
import { fetchWeeklyData } from "../utils/supabase";
import { formatDatetime } from "../utils/helpers";
import { useOutletContext } from "react-router-dom";

const CalendarComponent = () => {
  const [weeklyData, setweeklyData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = localStorage.getItem("user_id");
        const today = new Date();
        const week = new Date(today);
        week.setDate(today.getDate() - 5);
        const dateFrom = week.toISOString();

        const result = await fetchWeeklyData(storedUserId, dateFrom);

        if (result) {
          // const newDataArray = new Array(7).fill().map((v, i) => {
          //   const currentDate = new Date(week);
          //   currentDate.setDate(week.getDate() + i);
          //   return { date: currentDate.getDate(), data: [] }; // Initialize data as an empty array
          // });

          // // Fill newDataArray with data from result
          // result.forEach((item) => {
          //   const createdAtDate = new Date(item.created_at).getDate();
          //   const index = newDataArray.findIndex(
          //     (obj) => obj.date === createdAtDate
          //   );
          //   if (index !== -1) {
          //     newDataArray[index].data.push(item); // Add the item to the corresponding date in newDataArray
          //   }
          // });
          setweeklyData(result);
          console.log(weeklyData, "oooo");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fixed right-0 z-10 flex items-center w-full h-auto gap-2 px-2 py-2 text-xs bg-opacity-100 mt-9 justify-evenly top-12 md:top-4 bg-bgpapyrus md:px-0">
      {weeklyData &&
        weeklyData?.sort()?.map((day, index) => (
          <div key={index} className="w-16 h-20 m-auto ">
            <div
              className={`relative flex flex-col items-center   h-16   ${
                index === 4 &&
                "border  rounded-md shadow-[#787878] shadow-md bg-lightpapyrus"
              }`}
            >
              {day?.journal_icon && (
                <img
                  src={day?.journal_icon}
                  alt=""
                  className={` w-28 my-auto rounded-md ${
                    index === 4 && " w-28 "
                  }`}
                />
              )}
            </div>
            <span className={` font-semibold text-[0.4rem] sm:text-[0.5rem] `}>
              {formatDatetime(day.created_at).date}
            </span>
          </div>
        ))}
    </div>
  );
};

export default CalendarComponent;
