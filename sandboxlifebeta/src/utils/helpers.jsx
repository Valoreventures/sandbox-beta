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
