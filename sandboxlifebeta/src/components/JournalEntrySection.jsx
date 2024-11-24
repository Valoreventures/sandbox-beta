import { ArrowPathIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

export const JournalEntrySection = ({
  triggerQuestion,
  triggerIcon,
  chapterEntry,
  onCancel,
  saveToDb,
  journalEntry,
  setJournalEntry,
  journalType,
  changeQuestion,
  isLimitReached
}) => {
  const [input, setInput] = useState('');
  const handleTextChange = (e) => {
    // setInput(e.target.value);
    setJournalEntry(e.target.value);
  };

  const onSave = (isEntry) => {
    saveToDb(isEntry);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-25 md:mt-35 ">
      <div className="bg-bgpapyrus rounded-md shadow-md p-4 max-w-2xl sm:w-auto md:w-[40rem]">
        <h2 className="mb-2 text-lg font-semibold">The Story...</h2>
        <p className="mb-4 text-gray-600">2. Answer the trigger question.</p>
        <div className="flex items-center justify-center mb-4">
          <img className="w-16 h-16" src={triggerIcon} alt="Trigger Icon" />
        </div>
        <p className="mb-4 text-gray-800">{typeof triggerQuestion === "string" ? triggerQuestion:triggerQuestion[0]}</p>
        {/* <ArrowPathIcon className='w-5 m-2 ml-auto cursor-pointer ' onClick={()=>changeQuestion()} /> */}
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
          rows={4}
          value={journalEntry}
          onChange={handleTextChange}
          placeholder="Chapter Entry 'The Story'"
          disabled={isLimitReached}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 mr-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Back
          </button>
          {journalType === "daily_journal" && <button
            onClick={()=>onSave(true)}
            disabled={isLimitReached}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Save &amp; Entry
          </button>}
          <button
            onClick={()=>onSave(false)}
            disabled={isLimitReached}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Save &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// export default JournalEntrySection;
