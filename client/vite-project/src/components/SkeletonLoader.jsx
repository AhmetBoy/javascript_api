import React from 'react';

const SkeletonLoader = () => {
  return (
    <ul className="w-full">
      {[1, 2, 3].map((item) => (
        <li
          key={item}
          className="flex justify-between items-center border border-gray-100 dark:border-gray-800 p-3 rounded-xl mb-3 h-[58px] bg-gray-50/50 dark:bg-gray-800/20 relative overflow-hidden"
        >
          <div className="flex items-center w-full relative z-10">
            {/* Fake Circle */}
            <div className="w-[22px] h-[22px] rounded-full bg-gray-200 dark:bg-gray-700/50 mr-3 flex-shrink-0"></div>
            {/* Fake Text */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700/50 rounded w-1/2"></div>

            {/* Fake 3-dots */}
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700/50 rounded-md ml-auto"></div>
          </div>

          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite_linear] bg-gradient-to-r from-transparent via-white/50 dark:via-white/5 to-transparent skew-x-12 z-0 pointer-events-none"></div>
        </li>
      ))}
    </ul>
  );
};

export default SkeletonLoader;
