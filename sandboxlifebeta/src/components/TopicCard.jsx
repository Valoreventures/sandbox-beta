import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseCard from './BaseCard';

/**
 * TopicCard Component
 * 
 * Extends BaseCard to provide topic-specific functionality including:
 * - Pin/unpin functionality with visual indicators
 * - Archive with undo capability
 * - Progress indicators and streak display
 * - Topic management actions (rename, etc.)
 * 
 * Requirements: 9.1, 9.2, 9.4
 */
const TopicCard = ({
  topicId,
  title,
  journalType,
  isPinned = false,
  streak = 0,
  lastEntryDate,
  entryCount = 0,
  onPin,
  onArchive,
  onRename,
  onContinue,
  density = 'comfort',
  className = '',
  ...props
}) => {
  const [showRenameInput, setShowRenameInput] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isArchiving, setIsArchiving] = useState(false);

  // Format last entry date
  const formatLastEntry = (date) => {
    if (!date) return 'No entries yet';

    const now = new Date();
    const entryDate = new Date(date);
    const diffTime = Math.abs(now - entryDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return entryDate.toLocaleDateString();
  };

  // Get journal type display info
  const getJournalTypeInfo = () => {
    const typeMap = {
      daily_journal: {
        label: 'Daily',
        color: 'bg-blue-100 text-blue-800',
        icon: '📅'
      },
      book_journal: {
        label: 'Book',
        color: 'bg-orange-100 text-orange-800',
        icon: '📖'
      },
      thought_of_the_day: {
        label: 'Thought',
        color: 'bg-purple-100 text-purple-800',
        icon: '💭'
      }
    };
    return typeMap[journalType] || typeMap.daily_journal;
  };

  // Handle pin/unpin action
  const handlePin = (e) => {
    e.stopPropagation();
    if (onPin) {
      onPin(topicId);
    }
  };

  // Handle archive action
  const handleArchive = (e) => {
    e.stopPropagation();
    setIsArchiving(true);
    if (onArchive) {
      onArchive(topicId);
    }
    // Reset archiving state after animation
    setTimeout(() => setIsArchiving(false), 300);
  };

  // Handle rename functionality
  const handleRename = (e) => {
    e.stopPropagation();
    setShowRenameInput(true);
  };

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (newTitle.trim() && newTitle !== title && onRename) {
      onRename(topicId, newTitle.trim());
    }
    setShowRenameInput(false);
  };

  const handleRenameCancel = (e) => {
    e.stopPropagation();
    setNewTitle(title);
    setShowRenameInput(false);
  };

  // Build meta information
  const metaInfo = {
    cadence: getJournalTypeInfo().label,
    lastUpdated: formatLastEntry(lastEntryDate),
    count: entryCount,
    additionalInfo: streak > 0 ? `${streak} day streak` : undefined
  };

  // Build progress indicator for streaks
  const progressIndicator = streak > 0 ? {
    label: 'Current Streak',
    value: streak,
    percentage: Math.min(100, (streak / 30) * 100) // Show progress toward 30-day milestone
  } : undefined;

  // Primary action - Continue journaling
  const primaryAction = onContinue ? {
    label: 'Continue',
    onClick: () => onContinue(topicId, journalType),
    variant: 'primary',
    description: 'Add a new entry to this topic',
    icon: '✏️'
  } : undefined;

  // Secondary actions menu
  const secondaryActions = [
    {
      label: isPinned ? 'Unpin' : 'Pin',
      onClick: handlePin,
      icon: isPinned ? '📌' : '📍'
    },
    {
      label: 'Rename',
      onClick: handleRename,
      icon: '✏️'
    },
    {
      label: 'Archive',
      onClick: handleArchive,
      icon: '📦'
    }
  ];

  // Visual token - journal type icon with pin indicator
  const visualToken = (
    <div className="relative">
      <div className={`
        ${density === 'comfort' ? 'w-8 h-8 text-lg' : 'w-6 h-6 text-sm'} 
        rounded-full flex items-center justify-center
        ${getJournalTypeInfo().color}
      `}>
        {getJournalTypeInfo().icon}
      </div>
      {isPinned && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">📌</span>
        </div>
      )}
    </div>
  );

  // Custom content for streak display
  const streakContent = streak > 0 && (
    <div className={`flex items-center gap-2 ${density === 'comfort' ? 'text-sm' : 'text-xs'} text-orange-600`}>
      <span>🔥</span>
      <span className="font-medium">{streak} day streak</span>
    </div>
  );

  return (
    <div className={`${isArchiving ? 'animate-pulse opacity-50' : ''} ${className}`}>
      {showRenameInput ? (
        // Rename input overlay
        <div className="bg-white rounded-2xl shadow-lg border border-blue-500 p-6">
          <form onSubmit={handleRenameSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rename Topic
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter new topic name"
              autoFocus
              maxLength={100}
            />
            <div className="flex gap-2 mt-4 justify-end">
              <button
                type="button"
                onClick={handleRenameCancel}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                disabled={!newTitle.trim() || newTitle === title}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <BaseCard
          title={null}
          // We suppress standard subtitle/meta to implement custom body
          subtitle={null}
          // metaInfo={metaInfo} // We will render meta info in the footer manually
          primaryAction={null} // We render custom action area or entire card click
          secondaryActions={[]} // We render custom actions
          // visualToken={visualToken} // Rendered in custom body
          progressIndicator={undefined} // handled custom if needed
          density={density}
          state={isArchiving ? 'disabled' : 'default'}
          className="relative h-full flex flex-col"
          onClick={() => onContinue && onContinue(topicId, journalType)}
          {...props}
        >
          {/* Top Right Actions / Badge Area */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            {/* Pin/Unpin */}
            <button
              onClick={handlePin}
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isPinned ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-400 hover:bg-white hover:shadow-sm'}`}
            >
              {isPinned ? '📌' : '📍'}
            </button>
            {/* Archive/More */}
            <button
              onClick={handleArchive}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-white hover:shadow-sm transition-all"
            >
              📦
            </button>
          </div>

          {/* Centered Content */}
          <div className="flex flex-col items-center pt-2 pb-6">
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>

            {/* Status Pill */}
            <div className="px-3 py-1 bg-blue-100/50 text-blue-700 text-xs font-semibold rounded-full mb-6">
              {getJournalTypeInfo().label}
            </div>

            {/* Central Visual */}
            <div className="w-full flex justify-center mb-6">
              <div className="w-32 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden group">
                {/* Decorative background or actual image would go here */}
                <div className="text-5xl transform group-hover:scale-110 transition-transform duration-500">
                  {getJournalTypeInfo().icon}
                </div>
                {/* Visual streak overlay if exists */}
                {streak > 0 && (
                  <div className="absolute bottom-0 inset-x-0 bg-orange-500/10 backdrop-blur-sm p-1 flex justify-center">
                    <span className="text-xs text-orange-700 font-bold">🔥 {streak}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Subtitle / Context */}
            <p className="text-gray-400 text-sm font-medium tracking-wide">
              {entryCount} {entryCount === 1 ? 'Entry' : 'Entries'}
            </p>
          </div>

          {/* Footer: Date Split */}
          <div className="mt-auto pt-4 border-t border-gray-100/50 flex items-center justify-between text-xs text-gray-400 font-medium">
            <span>
              {lastEntryDate ? new Date(lastEntryDate).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' }) : '--/--'}
            </span>
            <span>
              {lastEntryDate ? new Date(lastEntryDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'}
            </span>
          </div>
        </BaseCard>
      )}
    </div>
  );
};

TopicCard.propTypes = {
  topicId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  journalType: PropTypes.oneOf(['daily_journal', 'book_journal', 'thought_of_the_day']).isRequired,
  isPinned: PropTypes.bool,
  streak: PropTypes.number,
  lastEntryDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  entryCount: PropTypes.number,
  onPin: PropTypes.func,
  onArchive: PropTypes.func,
  onRename: PropTypes.func,
  onContinue: PropTypes.func,
  density: PropTypes.oneOf(['comfort', 'compact']),
  className: PropTypes.string,
};

export default TopicCard;