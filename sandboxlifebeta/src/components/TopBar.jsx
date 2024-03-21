import React, { useState } from 'react';
import {
  Bars4Icon,
  PlusIcon,
  BookOpenIcon,
  CalendarIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid';

import { Link } from 'react-router-dom';

const TopBar = ({ toggleMenu }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement your search logic here
  };

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
    </div>
  );
};

export default TopBar;
