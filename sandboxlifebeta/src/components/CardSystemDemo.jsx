import React, { useState } from 'react';
import BaseCard from './BaseCard';
import TopicCard from './TopicCard';
import OverviewCard from './OverviewCard';

/**
 * CardSystemDemo Component
 * 
 * Demonstrates the card system components with various states and configurations.
 * This component can be used for testing and showcasing the card functionality.
 */
const CardSystemDemo = () => {
  const [density, setDensity] = useState('comfort');

  // Sample data for demonstrations
  const sampleTodayStatus = {
    dailyStreak: 7,
    entriesCompleted: 3,
    nextReminder: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    lastEntry: 'Today I reflected on my personal growth and the challenges I\'ve overcome this week...'
  };

  const sampleQuickActions = [
    {
      label: 'Daily Journal',
      icon: '📅',
      onClick: () => console.log('Navigate to daily journal'),
      description: 'Quick daily reflection'
    },
    {
      label: 'Book Entry',
      icon: '📖',
      onClick: () => console.log('Navigate to book journal'),
      description: 'Deep life story'
    },
    {
      label: 'Thought',
      icon: '💭',
      onClick: () => console.log('Navigate to thought'),
      description: 'Quick thought'
    },
    {
      label: 'Review',
      icon: '🔍',
      onClick: () => console.log('Navigate to review'),
      description: 'Review past entries'
    }
  ];

  const handleTopicAction = (action, topicId, ...args) => {
    console.log(`${action} action for topic ${topicId}`, args);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard v2 Card System</h1>
          <p className="text-gray-600">Demonstrating the core card components with various states and configurations</p>
          
          {/* Density Toggle */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setDensity('comfort')}
              className={`px-4 py-2 rounded-md ${
                density === 'comfort' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Comfort Mode
            </button>
            <button
              onClick={() => setDensity('compact')}
              className={`px-4 py-2 rounded-md ${
                density === 'compact' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Compact Mode
            </button>
          </div>
        </div>

        {/* Overview Card */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview Card</h2>
          <div className="max-w-lg mx-auto">
            <OverviewCard
              todayStatus={sampleTodayStatus}
              quickActions={sampleQuickActions}
              personalizedMessage="You're doing great with your journaling practice!"
              density={density}
            />
          </div>
        </section>

        {/* Topic Cards */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Topic Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TopicCard
              topicId="daily-reflection"
              title="Daily Reflection"
              journalType="daily_journal"
              isPinned={true}
              streak={7}
              lastEntryDate={new Date(Date.now() - 24 * 60 * 60 * 1000)} // Yesterday
              entryCount={15}
              onPin={(id) => handleTopicAction('pin', id)}
              onArchive={(id) => handleTopicAction('archive', id)}
              onRename={(id, name) => handleTopicAction('rename', id, name)}
              onContinue={(id, type) => handleTopicAction('continue', id, type)}
              density={density}
            />
            
            <TopicCard
              topicId="life-story"
              title="My Life Story"
              journalType="book_journal"
              isPinned={false}
              streak={0}
              lastEntryDate={new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)} // 3 days ago
              entryCount={8}
              onPin={(id) => handleTopicAction('pin', id)}
              onArchive={(id) => handleTopicAction('archive', id)}
              onRename={(id, name) => handleTopicAction('rename', id, name)}
              onContinue={(id, type) => handleTopicAction('continue', id, type)}
              density={density}
            />
            
            <TopicCard
              topicId="quick-thoughts"
              title="Quick Thoughts"
              journalType="thought_of_the_day"
              isPinned={false}
              streak={2}
              lastEntryDate={new Date()} // Today
              entryCount={25}
              onPin={(id) => handleTopicAction('pin', id)}
              onArchive={(id) => handleTopicAction('archive', id)}
              onRename={(id, name) => handleTopicAction('rename', id, name)}
              onContinue={(id, type) => handleTopicAction('continue', id, type)}
              density={density}
            />
          </div>
        </section>

        {/* Base Card Variations */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Base Card States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BaseCard
              title="Default State"
              subtitle="Normal card appearance"
              metaInfo={{ cadence: 'Daily', count: 5 }}
              density={density}
            />
            
            <BaseCard
              title="With Action"
              subtitle="Card with primary action"
              primaryAction={{
                label: 'Continue',
                onClick: () => console.log('Action clicked'),
                variant: 'primary'
              }}
              density={density}
            />
            
            <BaseCard
              title="With Progress"
              subtitle="Shows progress indicator"
              progressIndicator={{
                label: 'Progress',
                value: 7,
                max: 10,
                percentage: 70
              }}
              density={density}
            />
            
            <BaseCard
              title="Disabled State"
              subtitle="Non-interactive card"
              state="disabled"
              density={density}
            />
          </div>
        </section>

        {/* Size Variations */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Size Variations</h2>
          <div className="space-y-4">
            <BaseCard
              title="Small Card"
              subtitle="Compact size"
              size="small"
              density={density}
            />
            <BaseCard
              title="Medium Card (Default)"
              subtitle="Standard size"
              size="medium"
              density={density}
            />
            <BaseCard
              title="Large Card"
              subtitle="Expanded size"
              size="large"
              density={density}
            />
            <BaseCard
              title="Full Width Card"
              subtitle="Takes full container width"
              size="full-width"
              density={density}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CardSystemDemo;