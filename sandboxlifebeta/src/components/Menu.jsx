import { useEffect, useState } from "react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  XMarkIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";
import logo from "../assets/otherImg/sandBoxLifeR.png";

const SidebarMenu = ({toggleMenu }) => {
  const [userId, setUserId] = useState(null);

  function getUserIdFromStorage() {
    const storedUserId = localStorage.getItem("user_id");
    setUserId(storedUserId);
  }

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      console.log("successfully loggerd out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed bg-darkpapyrus text-gray-300 flex flex-col h-screen left-0 top-0 z-11 w-3/5 md:w-1/5 ">
      <div className="flex justify-between items-cente px-10 py-10">
        <div className=" flex justify-center items-center mx-2 ">
          <img alt="" className="h-4 md:h-6 " src={logo} />
        </div>
        <XMarkIcon height={24} onClick={toggleMenu} />
      </div>

      <div className="flex flex-col space-y-2">
        {userId && (
          <>
            <a className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3">
              <PresentationChartBarIcon className="h-5 w-5" />
              {/* <span>Dashboard</span> */}
              <Link to={`/home/${userId}`}>Dashboard</Link>
            </a>

            <a className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3">
              <BookOpenIcon className="h-5 w-5" />
              {/* <span>My book</span> */}
              <Link to={`/my-book/${userId}`}>My book</Link>
            </a>
            <a className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3">
              <CalendarDaysIcon className="h-5 w-5" />
              {/* <span>My calendar</span> */}
              <Link to={`/my-calendar/${userId}`}>My Calendar</Link>
            </a>
            <a className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3">
              <InboxIcon className="h-5 w-5" />
              <span>Inbox</span>
              <span className="bg-red-500 text-white rounded-full px-2 py-1 ml-auto"></span>
            </a>
            <a className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3">
              <UserCircleIcon className="h-5 w-5" />
              {/* <span>Profile</span> */}
              <Link to={`/profile/${userId}`}>Profile</Link>
            </a>
            <a className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3">
              <Cog6ToothIcon className="h-5 w-5" />
              {/* <span>Settings</span> */}
              <Link to={`/settings/${userId}`}>Settings</Link>
            </a>

            {/* chat room page link*/}
            <a className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3">
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
              {/* <span>Log Out</span> */}
              <Link to={`/chat/${userId}`}>Chat Room</Link>
            </a>

            <a className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3">
              <PowerIcon className="h-5 w-5" />
              {/* <span>Log Out</span> */}
              <Link to={`/`} onClick={handleLogout}>
                Log Out
              </Link>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarMenu;
