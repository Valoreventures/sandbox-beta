import React, { useState } from 'react';

export const PearlsOfWisdomWindow = ({
  triggerQuestion,
  triggerIcon,
  chapterEntry,
  onCancel,
  onSave,
  wisdomMessage,
  setWisdomMessage,
}) => {
  const [input, setInput] = useState('');
  const handleTextChange = (e) => {
    setWisdomMessage(e.target.value); 
  };

  return (
    <div className="flex flex-col items-center justify-center p-4  mt-44 md:mt-12">
      <div className="bg-bgpapyrus rounded-md shadow-md p-4 max-w-2xl">
        <h2 className="text-lg font-semibold mb-2">Pearls of Wisdom</h2>
        <p className="text-gray-600 mb-4">3. Reflect on the topic.</p>
        <div className="flex items-center justify-center mb-4">
          <img className="w-16 h-16" src={triggerIcon} alt="Trigger Icon" />
        </div>

        <textarea
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
          rows={4}
          value={wisdomMessage}
          onChange={handleTextChange}
          placeholder="Chapter Entry 'The Story'"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none mr-2"
          >
            Back
          </button>
          <button
            onClick={onSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none border border-red-500"
          >
            Save &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// export default JournalEntrySection;
