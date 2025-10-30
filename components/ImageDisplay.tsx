import React from 'react';
import { Spinner } from './Spinner';
import { DownloadIcon, ErrorIcon, ImageIcon } from './icons';

interface ImageDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
  prompt: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ isLoading, generatedImage, error, prompt }) => {
    const getFileName = () => {
        // Sanitize the filename without using a regular expression to avoid
        // potential parsing issues in specific JavaScript environments.
        const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const sanitized = prompt
          .toLowerCase()
          .split('')
          .map(char => (allowedChars.includes(char) ? char : '_'))
          .join('');

        return sanitized.slice(0, 50) + '.jpeg';
    }

  return (
    <div className="w-full p-4 bg-dark-800 rounded-2xl shadow-inner border border-dark-700 min-h-[400px] flex flex-col justify-center items-center">
      {isLoading && <Spinner />}
      {error && !isLoading && (
        <div className="text-center text-red-400">
            <ErrorIcon className="mx-auto w-16 h-16 mb-4"/>
            <p className="text-xl font-semibold">Generation Failed</p>
            <p className="text-sm mt-2 text-gray-400">{error}</p>
        </div>
      )}
      {!isLoading && !error && generatedImage && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <img src={generatedImage} alt={prompt} className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl mb-6" />
          <a
            href={generatedImage}
            download={getFileName()}
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            <DownloadIcon className="mr-2"/>
            Download Wallpaper
          </a>
        </div>
      )}
      {!isLoading && !error && !generatedImage && (
         <div className="text-center text-gray-500">
            <ImageIcon className="mx-auto w-16 h-16 mb-4"/>
            <p className="text-xl font-semibold">Your wallpaper will appear here</p>
            <p className="text-sm mt-1">Describe your vision and click generate</p>
        </div>
      )}
    </div>
  );
};
