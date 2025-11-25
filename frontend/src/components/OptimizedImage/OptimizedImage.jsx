import React, { useState } from "react";

const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  fallback = "/default.png",
  fill = false, // <--- NEW
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={
        fill
          ? "relative w-full h-full overflow-hidden"
          : "relative inline-block overflow-hidden"
      }
    >
      {!loaded && !error && (
        <div
          className={
            fill
              ? "absolute inset-0 bg-gray-200 animate-pulse rounded-lg"
              : "absolute inset-0 bg-gray-200 animate-pulse rounded-full"
          }
        />
      )}

      <img
        loading="lazy"
        src={error ? fallback : src}
        alt={alt}
        className={`${fill ? "w-full h-full object-cover" : ""} 
          ${className}
          transition-all duration-500 
          ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
