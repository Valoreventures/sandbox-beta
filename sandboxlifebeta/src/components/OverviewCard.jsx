import React from 'react';
import PropTypes from 'prop-types';
import BaseCard from './BaseCard';

/**
 * OverviewCard Component
 * 
 * Displays today's status and streaks with personalized messaging and quick actions.
 * Provides an at-a-glance view of the user's journaling progress and next steps.
 * 
 * Requirements: 3.3
 */
const OverviewCard = ({
  todayStatus,
  quickActions = [],
  personalizedMessage,
  density = 'comfort',
  className = '',
  ...props
}) => {
  // Get current date for display
  const getCurrentDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Format next reminder time
  const formatReminderTime = (reminderDate) => {
    if (!reminderDate) return null;
    
    const reminder = new Date(reminderDate);
    const now = new Date();
    const diffMs = reminder - now;
    
    if (diffMs <= 0) return 'Now';
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `in ${diffHours}h ${diffMinutes}m`;
    }
    return `in ${diffMinutes}m`;
  };

  // Get streak status with emoji
  const getStreakStatus = (streak) => {
    if (streak === 0) return { emoji: '🌱', message: 'Start your streak today!' };
    if (streak < 7) return { emoji: '🔥', message: `${streak} day streak` };
    if (streak < 30) return { emoji: '⭐', message: `${streak} day streak - Amazing!` };
    return { emoji: '🏆', message: `${streak} day streak - Incredible!` };
  };

  // Build the visual token - today's status icon
  const getTodayStatusIcon = () => {
    const { entriesCompleted = 0 } = todayStatus;
    
    if (entriesCompleted === 0) {
      return (
        <div className={`
          ${density === 'comfort' ? 'w-12 h-12 text-2xl' : 'w-10 h-10 text-xl'}
          rounded-full bg-gray-100 flex items-center justify-center
        `}>
          📝
        </div>
      );
    }
    
    return (
      <div className={`
        ${density === 'comfort' ? 'w-12 h-12 text-2xl' : 'w-10 h-10 text-xl'}
        rounded-full bg-green-100 flex items-center justify-center
      `}>
        ✅
      </div>
    );
  };

  // Build status summary
  const getStatusSummary = () => {
    const { dailyStreak = 0, entriesCompleted = 0 } = todayStatus;
    const streakInfo = getStreakStatus(dailyStreak);
    
    return {
      title: entriesCompleted > 0 ? 'Great progress today!' : 'Ready to journal?',
      subtitle: `${entriesCompleted} ${entriesCompleted === 1 ? 'entry' : 'entries'} today`,
      streak: streakInfo
    };
  };

  // Build meta information
  const statusSummary = getStatusSummary();
  const metaInfo = {
    additionalInfo: getCurrentDate()
  };

  // Build progress indicator for daily goal
  const progressIndicator = {
    label: 'Daily Progress',
    value: todayStatus.entriesCompleted || 0,
    max: 5, // Assuming 5 is the daily goal
    percentage: Math.min(100, ((todayStatus.entriesCompleted || 0) / 5) * 100)
  };

  // Primary action - most relevant quick action
  const primaryAction = quickActions.length > 0 ? {
    ...quickActions[0],
    variant: 'primary'
  } : {
    label: 'Start Journaling',
    onClick: () => console.log('Navigate to journal creation'),
    variant: 'primary',
    description: 'Begin your daily reflection',
    icon: '✏️'
  };

  // Custom content for overview details
  const overviewContent = (
    <div className="space-y-4">
      {/* Greeting and Status */}
      <div className="text-center">
        <p className={`${density === 'comfort' ? 'text-lg' : 'text-base'} text-gray-600`}>
          {getGreeting()}! {personalizedMessage || 'Ready to reflect on your day?'}
        </p>
      </div>

      {/* Streak Display */}
      {todayStatus.dailyStreak > 0 && (
        <div className="flex items-center justify-center gap-2 p-3 bg-orange-50 rounded-lg">
          <span className="text-2xl">{getStatusSummary().streak.emoji}</span>
          <span className={`${density === 'comfort' ? 'text-base' : 'text-sm'} font-medium text-orange-800`}>
            {getStatusSummary().streak.message}
          </span>
        </div>
      )}

      {/* Next Reminder */}
      {todayStatus.nextReminder && (
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏰</span>
            <span className={`${density === 'comfort' ? 'text-sm' : 'text-xs'} text-blue-800`}>
              Next reminder
            </span>
          </div>
          <span className={`${density === 'comfort' ? 'text-sm' : 'text-xs'} font-medium text-blue-900`}>
            {formatReminderTime(todayStatus.nextReminder)}
          </span>
        </div>
      )}

      {/* Last Entry Preview */}
      {todayStatus.lastEntry && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">📖</span>
            <span className={`${density === 'comfort' ? 'text-sm' : 'text-xs'} text-gray-600`}>
              Last entry
            </span>
          </div>
          <p className={`${density === 'comfort' ? 'text-sm' : 'text-xs'} text-gray-800 line-clamp-2`}>
            {typeof todayStatus.lastEntry === 'string' 
              ? todayStatus.lastEntry 
              : todayStatus.lastEntry.content || 'No preview available'
            }
          </p>
        </div>
      )}

      {/* Quick Actions Grid */}
      {quickActions.length > 1 && (
        <div className="grid grid-cols-2 gap-2">
          {quickActions.slice(1, 5).map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`
                p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200 text-left
              `}
              style={{ minHeight: '48px' }}
            >
              <div className="flex items-center gap-2">
                {action.icon && (
                  <span className="text-lg">{action.icon}</span>
                )}
                <span className={`${density === 'comfort' ? 'text-sm' : 'text-xs'} font-medium text-gray-900`}>
                  {action.label}
                </span>
              </div>
              {action.description && (
                <p className={`${density === 'comfort' ? 'text-xs' : 'text-xs'} text-gray-500 mt-1`}>
                  {action.description}
                </p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <BaseCard
      title={statusSummary.title}
      subtitle={statusSummary.subtitle}
      metaInfo={metaInfo}
      primaryAction={primaryAction}
      visualToken={getTodayStatusIcon()}
      progressIndicator={progressIndicator}
      density={density}
      size="large"
      className={`overview-card ${className}`}
      {...props}
    >
      {overviewContent}
    </BaseCard>
  );
};

OverviewCard.propTypes = {
  todayStatus: PropTypes.shape({
    dailyStreak: PropTypes.number,
    entriesCompleted: PropTypes.number,
    nextReminder: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    lastEntry: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        content: PropTypes.string,
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      })
    ]),
  }).isRequired,
  quickActions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    description: PropTypes.string,
  })),
  personalizedMessage: PropTypes.string,
  density: PropTypes.oneOf(['comfort', 'compact']),
  className: PropTypes.string,
};

export default OverviewCard;