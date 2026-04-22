import React, { useEffect, useMemo, useState, memo } from "react";
import { daily_journal_questions } from "../constants/questions";
import {
  BookOpenIcon,
  CalendarIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import OptimizedImage from "./OptimizedImage";

const ThoughtsOfTheDay = memo(({
  id,
  title,
  iconTitle,
  date,
  image,
  message,
  time,
  selected,
  index
}) => {

  const formatTime = (dateObj) => {
    const hrs = dateObj.getHours();
    const mns = dateObj.getMinutes();
    const formattedHours = hrs < 10 ? `0${hrs}` : hrs;
    const formattedMinutes = mns < 10 ? `0${mns}` : mns;
    return `${formattedHours}:${formattedMinutes}`;
  };

  // Memoize card styles to prevent recalculation on every render
  const cardStyles = useMemo(() => {
    const getCardStyles = (journalType) => {
      switch (journalType) {
        case "Book":
          return {
            bg: "bg-orange-50",
            border: "border-orange-200",
            accent: "bg-orange-100",
            text: "text-orange-800"
          };
        case "Status":
          return {
            bg: "bg-blue-50",
            border: "border-blue-200",
            accent: "bg-blue-100",
            text: "text-blue-800"
          };
        case "Daily":
        default:
          return {
            bg: "bg-green-50",
            border: "border-green-200",
            accent: "bg-green-100",
            text: "text-green-800"
          };
      }
    };
    return getCardStyles(title);
  }, [title]);

  // Memoize truncated message to prevent recalculation
  const truncatedMessage = useMemo(() => {
    return message?.length > 120 ? message?.slice(0, 120) + "..." : message;
  }, [message]);

  // Memoize icon component to prevent re-renders
  const IconComponent = useMemo(() => {
    const iconProps = {
      className: "h-4 w-4",
      "aria-hidden": "true"
    };

    switch (title) {
      case "Book":
        return <BookOpenIcon {...iconProps} className="h-4 w-4 text-orange-600" />;
      case "Daily":
        return <CalendarIcon {...iconProps} className="h-4 w-4 text-green-600" />;
      case "Status":
        return <LightBulbIcon {...iconProps} className="h-4 w-4 text-blue-600" />;
      default:
        return <CalendarIcon {...iconProps} className="h-4 w-4 text-green-600" />;
    }
  }, [title]);

  return (
    <div
      className={`
        flex flex-col
        w-full h-full
        min-h-[280px]
        bg-white
        border border-gray-200
        rounded-card
        shadow-card
        p-6
        transition-all duration-200 ease-in-out
        hover:shadow-card-hover hover:scale-[1.02] hover:border-gray-300
        cursor-pointer
      `}
    >
      {/* Header section with consistent spacing */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold leading-6 text-gray-900 truncate mb-2">
            {iconTitle}
          </h2>
          <span className={`
            inline-flex items-center px-2.5 py-0.5 
            text-xs font-medium rounded-full
            ${cardStyles.accent} ${cardStyles.text}
          `}>
            {title}
          </span>
        </div>

        {/* Journal type icon with consistent styling */}
        <div className="flex-shrink-0 ml-3">
          <div className="flex justify-center items-center w-10 h-10 bg-gray-50 border border-gray-200 rounded-lg">
            <div className={`${cardStyles.accent} rounded-md p-1.5`}>
              {IconComponent}
            </div>
          </div>
        </div>
      </div>

      {/* Content section with proper spacing and typography */}
      <div className="flex-1 mb-4">
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
          {truncatedMessage}
        </p>
      </div>

      {/* Image section with optimized loading and consistent aspect ratio */}
      {image && (
        <div className="mb-4">
          <OptimizedImage
            src={image}
            alt={`${iconTitle} journal entry`}
            className="w-full h-20 bg-gray-50 rounded-lg border border-gray-100"
            lazy={true}
            maintainAspectRatio={false}
            objectFit="contain"
            fallbackDimensions={{ width: 320, height: 80 }}
            style={{ height: '80px', padding: '4px' }}
            placeholder={
              <div className="flex items-center justify-center w-full h-full bg-gray-100">
                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
              </div>
            }
            errorFallback={
              <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            }
          />
        </div>
      )}

      {/* Footer section with date/time - always at bottom */}
      <div className="mt-auto pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium">{date}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
});

// Add display name for debugging
ThoughtsOfTheDay.displayName = 'JournalEntry';

export default ThoughtsOfTheDay;
