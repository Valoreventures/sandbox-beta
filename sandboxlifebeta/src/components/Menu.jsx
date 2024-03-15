import React from 'react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  Bars4Icon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const SidebarMenu = ({ toggleMenu }) => {
  return (
    <div className="fixed bg-darkpapyrus text-gray-300 flex flex-col h-screen left-0 top-0 z-11 w-1/5">
      <div className="flex justify-between items-cente px-10 py-20">
        <div className="text-xl font-semibold mb-4">Sandbox Life</div>
        <XMarkIcon height={24} onClick={toggleMenu} />
      </div>

      <div className="flex flex-col space-y-2">
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3"
        >
          <PresentationChartBarIcon className="h-5 w-5" />
          {/* <span>Dashboard</span> */}
          <Link to="/home">Dashboard</Link>
        </a>

        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3"
        >
          <ShoppingBagIcon className="h-5 w-5" />
          <span>About Us</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3"
        >
          <InboxIcon className="h-5 w-5" />
          <span>Inbox</span>
          <span className="bg-red-500 text-white rounded-full px-2 py-1 ml-auto">
            14
          </span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3"
        >
          <UserCircleIcon className="h-5 w-5" />
          <span>Profile</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3"
        >
          <Cog6ToothIcon className="h-5 w-5" />
          <span>Settings</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 rounded-md py-2 px-3"
        >
          <PowerIcon className="h-5 w-5" />
          <span>Log Out</span>
        </a>
      </div>
    </div>
  );
};

export default SidebarMenu;
