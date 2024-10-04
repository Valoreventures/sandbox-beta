import { useState } from "react";
import React from "react";
import JournalEntry from "../components/JournalEntry";
import EntryDetails from "../components/EntryDetails";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const Context = React.createContext(null);

export const formatJournalType = (journalType) => {
  switch (journalType) {
    case "daily_journal":
      return "Daily";
    case "book_journal":
      return "Book";

    case "thought_of_the_day":
      return "Status";

    case "tought_of_the_day":
      return "Status";

    default:
      return journalType;
  }
};

export const formatDatetime = (datetimeStr) => {
  // Create a Date object from the datetime string
  const date = new Date(datetimeStr);

  // Function to extract date part (YYYY-MM-DD)
  function formatDate() {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}`;
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
};

export const GridList = ({ items, chapters = [] }) => {
  const [selected, setSelected] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState("All");

  const handleOnClick = (data) => {
    setSelected(data);
  };

  console.log(chapters);

  return (
    <div className="flex flex-col items-start justify-start gap-4 p-4 mt-0">
      {chapters.length>0 && <div className="flex flex-row items-center justify-center gap-2">
        <p>Filter by chapter: </p>
        <Menu>
          <MenuButton className="px-4 py-2 bg-white border border-gray-300 rounded-md w-fit">
            {selectedChapter}
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="absolute z-10 w-48 py-2 mt-2 border rounded-md shadow-xl ml-9 bg-lightpapyrus "
          >
            {chapters?.map((chapter, index) => (
              <MenuItem key={index} className="block px-3 hover:bg-darkpapyrus"
                onClick={() => setSelectedChapter(chapter)}
              >
                <p className="">{chapter}</p>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>}
      <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
        {items.filter((item)=>{
          if(selectedChapter === "All") return true;
          return item.journal_meaning === selectedChapter;
        }).map((d, index) => (
          <div
            key={index}
            className="cursor-pointer "
            onClick={() => handleOnClick(d)}
          >
            <JournalEntry
              id={d.id}
              title={formatJournalType(d.journal_type)}
              iconTitle={d.journal_meaning}
              // date="10th March 2023"
              date={formatDatetime(d.created_at).date}
              image={d.journal_icon}
              message={d.journal_entry}
              time={formatDatetime(d.created_at).time}
              selected={selected}
            />
          </div>
        ))}
        {selected && (
          <EntryDetails
            id={selected.id}
            title={formatJournalType(selected.journal_type)}
            iconTitle={selected.journal_meaning}
            // date="10th March 2023"
            date={formatDatetime(selected.created_at).date}
            image={selected.journal_icon}
            message={selected.journal_entry}
            time={formatDatetime(selected.created_at).time}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>
    </div>
  );
};
