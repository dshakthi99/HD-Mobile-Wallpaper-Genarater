
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        <p className="text-lg font-semibold mt-4 text-gray-300">Generating your masterpiece...</p>
        <p className="text-sm text-gray-500">This might take a moment.</p>
    </div>
  );
};
