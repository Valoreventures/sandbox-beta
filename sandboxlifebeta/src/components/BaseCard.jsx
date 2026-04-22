import React from 'react';
import PropTypes from 'prop-types';

/**
 * BaseCard Component
 * 
 * A foundational card component that provides consistent visual hierarchy,
 * interactive states, and density modes for the Dashboard v2 card system.
 * 
 * Features:
 * - Multiple interactive states (default, hover, pressed, focused, selected, disabled)
 * - Density modes (comfort, compact) for accessibility
 * - Flexible content areas (title, subtitle, meta, actions, visual token)
 * - Responsive sizing options
 * - Accessibility-compliant touch targets (48x48px minimum)
 */
const BaseCard = ({
  title,
  subtitle,
  metaInfo,
  primaryAction,
  secondaryActions = [],
  visualToken,
  progressIndicator,
  state = 'default',
  size = 'medium',
  density = 'comfort',
  className = '',
  onClick,
  children,
  ...props
}) => {
  // Base card styling with state variations
  const getCardClasses = () => {
  // UPDATED: Rounded corners to 2xl (approx 16px), adjusted background and border
  const baseClasses = 'rounded-2xl bg-white transition-all duration-300 border relative overflow-hidden';

  // Density-based spacing
  // UPDATED: Increased padding for comfort
  const densityClasses = {
    comfort: 'p-6 space-y-4',
    compact: 'p-4 space-y-3'
  };

  // Size variations
  const sizeClasses = {
    small: 'w-full max-w-xs',
    medium: 'w-full max-w-md',
    large: 'w-full max-w-lg',
    'full-width': 'w-full'
  };

  // State-based styling
  // UPDATED: Shadows and border colors for softer look
  const stateClasses = {
    default: 'border-transparent shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.04)]',
    hover: 'border-gray-200 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]',
    pressed: 'border-gray-300 shadow-sm transform scale-[0.99]',
    focused: 'border-blue-400 shadow-md ring-2 ring-blue-100',
    selected: 'border-blue-500 shadow-md bg-blue-50/30 ring-1 ring-blue-200',
    disabled: 'border-gray-100 shadow-none bg-gray-50 opacity-60 cursor-not-allowed'
  };

  return `${baseClasses} ${densityClasses[density]} ${sizeClasses[size]} ${stateClasses[state]}`;
};

// Typography classes based on density
const getTitleClasses = () => {
  return density === 'comfort'
    ? 'text-lg font-semibold text-gray-900'
    : 'text-base font-semibold text-gray-900';
};

const getSubtitleClasses = () => {
  return density === 'comfort'
    ? 'text-sm text-gray-600'
    : 'text-xs text-gray-600';
};

const getMetaClasses = () => {
  return density === 'comfort'
    ? 'text-xs text-gray-500'
    : 'text-xs text-gray-500';
};

// Handle card click if onClick is provided
const handleCardClick = (e) => {
  if (state === 'disabled') return;
  if (onClick) {
    onClick(e);
  }
};

// Handle keyboard navigation
const handleKeyDown = (e) => {
  if (state === 'disabled') return;
  if ((e.key === 'Enter' || e.key === ' ') && onClick) {
    e.preventDefault();
    onClick(e);
  }
};

return (
  <div
    className={`${getCardClasses()} ${className}`}
    onClick={handleCardClick}
    onKeyDown={handleKeyDown}
    tabIndex={onClick && state !== 'disabled' ? 0 : -1}
    role={onClick ? 'button' : 'article'}
    aria-disabled={state === 'disabled'}
    {...props}
  >
    {/* Header Section */}
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        {/* Visual Token */}
        {visualToken && (
          <div className="mb-3">
            {typeof visualToken === 'string' ? (
              <img
                src={visualToken}
                alt=""
                className={`${density === 'comfort' ? 'w-8 h-8' : 'w-6 h-6'} rounded object-cover`}
              />
            ) : (
              visualToken
            )}
          </div>
        )}

        {/* Title */}
        <h3 className={`${getTitleClasses()} truncate`}>
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className={`${getSubtitleClasses()} truncate mt-1`}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Secondary Actions Menu */}
      {secondaryActions.length > 0 && (
        <div className="ml-3 flex-shrink-0">
          <button
            className={`${density === 'comfort' ? 'p-2' : 'p-1'} rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
            style={{ minWidth: '48px', minHeight: '48px' }}
            aria-label="More actions"
            disabled={state === 'disabled'}
          >
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      )}
    </div>

    {/* Meta Information */}
    {metaInfo && (
      <div className={`${getMetaClasses()} flex flex-wrap gap-2`}>
        {metaInfo.cadence && (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-xs">
            {metaInfo.cadence}
          </span>
        )}
        {metaInfo.lastUpdated && (
          <span>Last updated: {metaInfo.lastUpdated}</span>
        )}
        {metaInfo.count !== undefined && (
          <span>{metaInfo.count} entries</span>
        )}
        {metaInfo.additionalInfo && (
          <span>{metaInfo.additionalInfo}</span>
        )}
      </div>
    )}

    {/* Progress Indicator */}
    {progressIndicator && (
      <div className="space-y-2">
        {progressIndicator.label && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{progressIndicator.label}</span>
            {progressIndicator.value !== undefined && (
              <span className="text-gray-900 font-medium">
                {progressIndicator.value}
                {progressIndicator.max && `/${progressIndicator.max}`}
              </span>
            )}
          </div>
        )}
        {progressIndicator.percentage !== undefined && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progressIndicator.percentage))}%` }}
            />
          </div>
        )}
      </div>
    )}

    {/* Custom Children Content */}
    {children && (
      <div className="mt-4">
        {children}
      </div>
    )}

    {/* Primary Action */}
    {primaryAction && (
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (state !== 'disabled') {
              primaryAction.onClick();
            }
          }}
          disabled={state === 'disabled'}
          className={`
              w-full flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${primaryAction.variant === 'primary'
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              : primaryAction.variant === 'secondary'
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500'
                : 'bg-transparent text-gray-600 hover:bg-gray-50 focus:ring-gray-500'
            }
              ${state === 'disabled' ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          style={{ minHeight: '48px' }}
        >
          {primaryAction.icon && (
            <span className="mr-2">
              {typeof primaryAction.icon === 'string' ? (
                <img src={primaryAction.icon} alt="" className="w-4 h-4" />
              ) : (
                primaryAction.icon
              )}
            </span>
          )}
          {primaryAction.label}
        </button>
        {primaryAction.description && (
          <p className="mt-2 text-xs text-gray-500 text-center">
            {primaryAction.description}
          </p>
        )}
      </div>
    )}
  </div>
);
};

BaseCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  metaInfo: PropTypes.shape({
    cadence: PropTypes.string,
    lastUpdated: PropTypes.string,
    count: PropTypes.number,
    additionalInfo: PropTypes.string,
  }),
  primaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    description: PropTypes.string,
  }),
  secondaryActions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    description: PropTypes.string,
  })),
  visualToken: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  progressIndicator: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
    max: PropTypes.number,
    percentage: PropTypes.number,
  }),
  state: PropTypes.oneOf(['default', 'hover', 'pressed', 'focused', 'selected', 'disabled']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full-width']),
  density: PropTypes.oneOf(['comfort', 'compact']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default BaseCard;