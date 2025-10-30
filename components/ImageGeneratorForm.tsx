import React, { useState } from 'react';
import { ASPECT_RATIO_OPTIONS } from '../constants';
import { type AspectRatioOptionValue } from '../types';
import { GenerateIcon } from './icons';

interface ImageGeneratorFormProps {
  onGenerate: (prompt: string, aspectRatio: AspectRatioOptionValue) => void;
  isLoading: boolean;
}

export const ImageGeneratorForm: React.FC<ImageGeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOptionValue>('9:16');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, aspectRatio);
    }
  };

  return (
    <div className="bg-dark-800 p-6 rounded-2xl shadow-2xl border border-dark-700 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="prompt" className="block text-lg font-semibold mb-2 text-gray-300">
            Describe your wallpaper
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A serene Japanese zen garden with a cherry blossom tree"
            className="w-full h-24 p-3 bg-dark-700 rounded-lg border-2 border-dark-600 focus:ring-2 focus:ring-primary-focus focus:border-primary-focus transition-colors duration-200 resize-none text-gray-200 placeholder-gray-500"
            required
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-300">Aspect Ratio</h3>
          <div className="grid grid-cols-2 gap-3">
            {ASPECT_RATIO_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setAspectRatio(option.value)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                  aspectRatio === option.value
                    ? 'bg-primary border-primary-focus text-white shadow-lg'
                    : 'bg-dark-700 border-dark-600 hover:border-primary text-gray-400 hover:text-white'
                }`}
              >
                {option.icon}
                <span className="font-semibold text-sm mt-1">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full flex items-center justify-center bg-primary hover:bg-primary-hover disabled:bg-dark-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 text-lg shadow-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
             <>
               <GenerateIcon className="mr-2"/>
               Generate Wallpaper
             </>
          )}
        </button>
      </form>
    </div>
  );
};
