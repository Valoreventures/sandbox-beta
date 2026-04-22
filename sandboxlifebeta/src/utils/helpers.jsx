import { useState, useMemo, useCallback, memo } from "react";
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

export const GridList = memo(({ items, chapters = [] }) => {

  const [selected, setSelected] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState("All");

  // Memoize filtered items to prevent recalculation on every render
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (!item || !item.id) return false; // Ensure item exists and has id
      if (selectedChapter === "All") return true;
      return item?.journal_meaning === selectedChapter;
    });
  }, [items, selectedChapter]);

  // Memoize chapter options to prevent Menu re-renders
  const chapterMenuItems = useMemo(() => {
    return chapters?.map((chapter, index) => (
      <MenuItem
        key={`${chapter}-${index}`}
        className="block px-3 hover:bg-darkpapyrus"
        onClick={() => setSelectedChapter(chapter)}
      >
        <p>{chapter}</p>
      </MenuItem>
    ));
  }, [chapters]);

  // Optimize click handler with useCallback
  const handleOnClick = useCallback((data) => {
    setSelected(data);
  }, []);

  // Optimize chapter selection with useCallback
  const handleChapterSelect = useCallback((chapter) => {
    setSelectedChapter(chapter);
  }, []);

  // Memoize grid items to prevent unnecessary re-renders
  const gridItems = useMemo(() => {
    return filteredItems.map((d, index) => (
      <div
        key={`${d.id}-${index}`}
        className="cursor-pointer"
        onClick={() => handleOnClick(d)}
      >
        <JournalEntry
          id={d.id}
          title={formatJournalType(d.journal_type)}
          iconTitle={d.journal_meaning}
          date={formatDatetime(d.created_at).date}
          image={d.journal_icon}
          message={d.journal_entry}
          time={formatDatetime(d.created_at).time}
          selected={selected}
          index={index}
        />
      </div>
    ));
  }, [filteredItems, selected, handleOnClick]);

  return (
    <div className="flex flex-col items-start justify-start gap-6">
      {chapters.length > 0 && (
        <div className="flex flex-row items-center justify-center gap-3">
          <p>Filter by chapter: </p>
          <Menu>
            <MenuButton className="px-4 py-2 bg-white border border-gray-300 rounded-md w-fit">
              {selectedChapter}
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="absolute z-10 w-48 py-2 mt-2 border rounded-md shadow-xl ml-9 bg-lightpapyrus"
            >
              {chapterMenuItems}
            </MenuItems>
          </Menu>
        </div>
      )}
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-8 w-full">
        {gridItems}
        {selected && (
          <EntryDetails
            id={selected.id}
            title={formatJournalType(selected.journal_type)}
            iconTitle={selected.journal_meaning}
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
});

// Add display name for debugging
GridList.displayName = 'GridList';
