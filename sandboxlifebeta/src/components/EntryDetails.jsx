import { useContext, useEffect, useState } from "react";
import defaultImg from "../assets/icons/default.jpg";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  BookOpenIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,XMarkIcon
} from "@heroicons/react/24/outline";
import { daily_journal_questions } from "../constants/questions";
import { Context } from "../utils/helpers";

export default function EntryDetails({
  id,
  title,
  iconTitle,
  date,
  image,
  message,
  time,
  selected,
  setSelected
}) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [context, setContext] = useContext(Context);


  useEffect(() => {
    if (selected) setOpen(true);

    daily_journal_questions.find((data, i) => {
      if (data.meaning === iconTitle && data.trigger_question.length === 4) {
        console.log(data.trigger_question.length);
      } else if (data.trigger_question.length > 4) {
        setQuestion(data.trigger_question);
      }
    });
  }, [selected,iconTitle]);


 


  return (
    <>
      <Transition show={open}>
        <Dialog
          className="relative  z-10"
          onClose={setOpen}
          onClick={() => setOpen(false)}
        >
          <div
            className="fixed inset-0 z-10 w-full h-full overflow-y-auto bg-opacity-50 bg-[#00000067]"
            onClick={() => {setOpen(false) , setSelected(null) } }
          >
            <div className="flex  min-h-full  justify-center items-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 "
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 "
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl ">
                  <div
                    className={` flex justify-between items-stretch shadow-md rounded-lg p-5 gap-5  min-w-[200px]   mx-2   border bg-white ${
                      (title === "Book" && "bg-[#83cefd] border-[#83cefd]") ||
                      (title === "Status" && "bg-[#f5c15f] border-[#f5c15f]") ||
                      (title === "Daily" && "bg-[#72fe82] border-[#44f959]")
                    }  `}
                  >
                    <div className="space-y-1   w-2/3 md:w-4/5  ">
                      <h2 className="text-sm md:text-lg lg:text-xl font-bold">
                       <span className="font-bold text-[#626262]">Q.</span> {question}
                      </h2>

                      <p className="flex items-left text-gray-700 mb-2">
                        {/* {date} at {time && formatTime(new Date(time))} */}
                      </p>
                      <span className="font-bold text-[#626262]">Ans.</span>
                      <div
                        style={{ scrollbarWidth: "thin" }} 
                        className={`h-[10rem] w-full  overflow-y-hidden capitalize text-gray-600  text-sm ${message?.length > 32 && "overflow-y-scroll"}`}
                      >
                        <p>  {message}</p>
                      </div>
                    </div>
                    <div className=" grid  w-1/3 md:w-1/5   text-center justify-center  items-center   ">
                    <XMarkIcon className="absolute top-0 right-0 w-5 h-5 mr-[4%] mt-2 cursor-pointer bg-bgpapyrus rounded-md " onClick={()=>{setOpen(false) , setSelected(null) }}/>
                      <h3 className="text-[0.6rem] sm:text-sm font-bold w-full  ">{iconTitle}</h3>
                      <img
                        src={image ? image : defaultImg}
                        alt="Image"
                        className=" h-20 w-20 md:w-28 md:h-28  rounded-md"
                      />

                    <p className="text-[0.6rem] sm:text-sm">{date} <br/> {time}</p>

                      <div className="flex justify-start  items-center gap-2  w-auto">
                        <div className="flex justify-center items-center w-8 h-8 md:w-10 md:h-10  border border-[#b1b1b1] rounded-xl bg-[#ffff]">
                          <div className=" bg-darkpapyrus rounded-md">
                            {title === "Book" && (
                              <BookOpenIcon className="w-3 h-3 md:h-5 md:w-5 inline m-1 " />
                            )}
                            {title === "Daily" && (
                              <CalendarIcon className="w-3 h-3 md:h-5 md:w-5 inline m-1 " />
                            )}
                            {title === "Status" && (
                              <LightBulbIcon className="w-3 h-3 md:h-5 md:w-5 inline m-1 " />
                            )}
                          </div>
                        </div>
                        <p>{title}</p>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
