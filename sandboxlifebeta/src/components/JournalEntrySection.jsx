import React, { useState } from 'react';

export const JournalEntrySection = ({
  triggerQuestion,
  triggerIcon,
  chapterEntry,
  onCancel,
  onSave,
}) => {
  const [input, setInput] = useState('');
  const handleTextChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-bgpapyrus rounded-md shadow-md p-4 max-w-2xl">
        <h2 className="text-lg font-semibold mb-2">The Story...</h2>
        <p className="text-gray-600 mb-4">2. Answer the trigger question.</p>
        <div className="flex items-center justify-center mb-4">
          <img className="w-16 h-16" src={triggerIcon} alt="Trigger Icon" />
        </div>
        <p className="text-gray-800 mb-4">
          Click to show trigger question
          <br />
          {triggerQuestion}
        </p>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
          rows={4}
          value={input}
          onChange={handleTextChange}
          placeholder="Chapter Entry 'The Story'"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Save &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// export default JournalEntrySection;
