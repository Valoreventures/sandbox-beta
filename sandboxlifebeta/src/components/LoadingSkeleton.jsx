const LoadingSkeleton = ({ variant = 'card', count = 4 }) => {
  if (variant === 'card') {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-8">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
            >
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'profile') {
    return (
      <div className="animate-pulse max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'settings') {
    return (
      <div className="animate-pulse max-w-4xl mx-auto p-6 space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border p-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
