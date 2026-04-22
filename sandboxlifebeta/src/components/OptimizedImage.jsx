import React, { useState } from 'react';

/**
 * Optimized image component with simple loading state
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  style = {},
  lazy = true,
  fallbackDimensions,
  placeholder,
  errorFallback,
  onLoad,
  onError,
  maintainAspectRatio = true,
  objectFit = 'cover',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError(e);
  };

  // Default placeholder
  const DefaultPlaceholder = () => (
    <div className="flex items-center justify-center bg-gray-100 w-full h-full">
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );

  // Default error fallback
  const DefaultErrorFallback = () => (
    <div className="flex items-center justify-center bg-gray-100 text-gray-400 w-full h-full">
      <span className="text-xs">Image Error</span>
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        position: 'relative'
      }}
      {...props}
    >
      {/* Loading Placeholder */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10">
          {placeholder || <DefaultPlaceholder />}
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 z-10">
          {errorFallback || <DefaultErrorFallback />}
        </div>
      )}

      {/* Image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading={lazy ? "lazy" : "eager"}
          className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: objectFit
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;