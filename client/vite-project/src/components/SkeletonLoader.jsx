import React from 'react';

const SkeletonLoader = () => {
  return (
    <ul className="w-full">
      {[1, 2, 3].map((item) => (
        <li 
          key={item} 
          className="flex justify-between items-center border p-2 rounded mb-2 h-[58px] bg-gray-800/20 relative overflow-hidden"
        >
          <div className="h-4 bg-gray-700/30 rounded w-1/2 relative z-10"></div>
          <div className="flex gap-2 relative z-10">
            <div className="h-8 w-[72px] bg-gray-700/30 rounded"></div>
            <div className="h-8 w-11 bg-gray-700/30 rounded"></div>
          </div>
          
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite_linear] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-0 pointer-events-none"></div>
        </li>
      ))}
    </ul>
  );
};

export default SkeletonLoader;
