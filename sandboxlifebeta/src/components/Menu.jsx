import { useEffect, useState, useRef } from "react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  XMarkIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon,
  BuildingLibraryIcon
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";
import { useOverlay, useFocusTrap } from "../hooks/useOverlay";
import logo from "../assets/otherImg/sandBoxLifeR.png";

const SidebarMenu = ({ toggleMenu, isOpen }) => {
  const [userId, setUserId] = useState(null);
  const menuRef = useRef(null);

  // Use overlay hooks for proper behavior
  useOverlay(isOpen, toggleMenu, {
    preventBodyScroll: false, // Don't prevent body scroll for menu
    closeOnEscape: true
  });

  // Focus trap for accessibility
  useFocusTrap(isOpen, menuRef);

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
      console.log("successfully logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLinkClick = () => {
    // Close menu when navigating on mobile
    toggleMenu();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="fixed bg-darkpapyrus text-gray-300 flex flex-col h-screen left-0 top-0 w-3/5 md:w-1/5 shadow-2xl z-modal transform transition-transform duration-300 ease-in-out"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Header with improved spacing and accessibility */}
      <div className="flex justify-between items-center px-6 py-6 border-b border-gray-600">
        <div className="flex justify-center items-center">
          <img 
            alt="SandboxLife Logo" 
            className="h-4 md:h-6" 
            src={logo} 
          />
        </div>
        <button 
          onClick={toggleMenu}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Close menu"
        >
          <XMarkIcon height={24} />
        </button>
      </div>

      {/* Navigation Links with improved spacing and accessibility */}
      <nav className="flex flex-col space-y-1 px-4 py-4 flex-1 overflow-y-auto">
        {userId && (
          <>
            <Link 
              to={`/home/${userId}`} 
              onClick={handleLinkClick}
              className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg py-3 px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <PresentationChartBarIcon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Dashboard</span>
            </Link>

            <Link 
              to={`/my-book/${userId}`} 
              onClick={handleLinkClick}
              className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg py-3 px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <BookOpenIcon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">My book</span>
            </Link>
            
            <Link 
              to={`/library/${userId}`} 
              onClick={handleLinkClick}
              className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg py-3 px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <BuildingLibraryIcon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Library</span>
            </Link>
            
            <Link 
              to={`/my-calendar/${userId}`} 
              onClick={handleLinkClick}
              className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg py-3 px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <CalendarDaysIcon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">My Calendar</span>
            </Link>
            
            <Link 
              to={`/chat/${userId}`} 
              onClick={handleLinkClick}
              className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg py-3 px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <InboxIcon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Inbox</span>
              <span className="bg-red-500 text-white rounded-full px-2 py-1 ml-auto text-xs"></span>
            </Link>
            
            <Link 
              to={`/profile/${userId}`} 
              onClick={handleLinkClick}
              className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg py-3 px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <UserCircleIcon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Profile</span>
            </Link>
            
            <Link 
              to={`/settings/${userId}`} 
              onClick={handleLinkClick}
              className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg py-3 px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <Cog6ToothIcon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Settings</span>
            </Link>

            {/* Logout with separator */}
            <div className="border-t border-gray-600 mt-4 pt-4">
              <Link 
                to={`/`} 
                onClick={(e) => {
                  handleLogout();
                  handleLinkClick();
                }}
                className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg py-3 px-3 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <PowerIcon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">Log Out</span>
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default SidebarMenu;
