import React from 'react';
import { WallpaperIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-dark-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <WallpaperIcon className="w-8 h-8 mr-3 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          HD Mobile Wallpaper Generator
        </h1>
      </div>
    </header>
  );
};
