import React, { useState } from 'react';

const LazyImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full relative bg-gray-50 min-h-[200px]"> 
      {/* min-h-[200px] prevents layout shift (CLS) 
         by reserving space before image loads 
      */}
      
      {/* Loading Skeleton / Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy" // Native Browser Lazy Loading
        onLoad={() => setIsLoaded(true)}
        className={`
          w-full h-auto block transition-opacity duration-700 ease-in-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </div>
  );
};

export default LazyImage;