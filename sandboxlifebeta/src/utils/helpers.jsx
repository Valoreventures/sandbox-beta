import JournalEntry from '../components/JournalEntry';

export const formatJournalType = (journalType) => {
  switch (journalType) {
    case 'daily_journal':
      return 'Daily Entry';
    case 'book_journal':
      return 'Book Entry';

    case 'thought_of_the_day':
      return 'Status';

    case 'tought_of_the_day':
      return 'Status';

    default:
      return journalType;
  }
};

function formatDatetime(datetimeStr) {
  // Create a Date object from the datetime string
  const date = new Date(datetimeStr);

  // Function to extract date part (YYYY-MM-DD)
  function formatDate() {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Function to extract time part (hh:mm)
  function formatTime() {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  // Return the desired formats
  return {
    date: formatDate(),
    time: formatTime(),
  };
}

export const GridList = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {items.map((d, index) => (
        <JournalEntry
          key={index}
          title={formatJournalType(d.journal_type)}
          iconTitle={d.journal_meaning}
          // date="10th March 2023"
          date={formatDatetime(d.created_at).date}
          image={d.journal_icon}
          message={d.journal_entry}
          time={d.created_at}
        />
      ))}
    </div>
    // <div className={`grid grid-cols-${numColumns} gap-4`}>
    //   {items.map((d, index) => (
    //     <JournalEntry
    //       key={index}
    //       title={formatJournalType(d.journal_type)}
    //       iconTitle={d.journal_meaning}
    //       // date="10th March 2023"
    //       date={formatDatetime(d.created_at).date}
    //       image={d.journal_icon}
    //       message={d.journal_entry}
    //       time={d.created_at}
    //     />
    //   ))}
    // </div>
  );
};
