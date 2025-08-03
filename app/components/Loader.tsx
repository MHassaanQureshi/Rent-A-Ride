
import React from 'react';

// loader
const Loader = () => {
  return (
    <div className="flex items-center justify-center py-10 translate-y-1/2">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
