import {  useState } from 'react';
import React from "react";
import JournalEntry from '../components/JournalEntry';
import EntryDetails from '../components/EntryDetails';
export const Context = React.createContext(null);

export const formatJournalType = (journalType) => {
  switch (journalType) {
    case 'daily_journal':
      return 'Daily';
    case 'book_journal':
      return 'Book';

    case 'thought_of_the_day':
      return 'Status';

    case 'tought_of_the_day':
      return 'Status';

    default:
      return journalType;
  }
};

export  const formatDatetime = (datetimeStr)=> {


 

  // Create a Date object from the datetime string
  const date = new Date(datetimeStr);

  // Function to extract date part (YYYY-MM-DD)
  function formatDate() {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}/${day}`;
  }

  // Function to extract time part (hh:mm)
  function formatTime() {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes }`;
  }

  // Return the desired formats
  return {
    date: formatDate(),
    time: formatTime(),
  };
}



export const GridList = ({ items }) => {

  const [selected, setSelected] = useState(null)
  
  const handleOnClick = (data) => {
      setSelected(data);
  };

  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-2   " >
      {items.map((d, index) => (
        <div key={index} className=' cursor-pointer '  onClick={()=>handleOnClick(d)} >
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

  );
};
