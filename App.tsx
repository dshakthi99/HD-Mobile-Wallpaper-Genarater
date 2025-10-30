
import React, { useState, useCallback } from 'react';
import { ImageGeneratorForm } from './components/ImageGeneratorForm';
import { ImageDisplay } from './components/ImageDisplay';
import { Header } from './components/Header';
import { generateWallpaper } from './services/geminiService';
import { type AspectRatioOptionValue } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');

  const handleGenerate = useCallback(async (userPrompt: string, aspectRatio: AspectRatioOptionValue) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setPrompt(userPrompt);

    try {
      const imageBase64 = await generateWallpaper(userPrompt, aspectRatio);
      if (imageBase64) {
        setGeneratedImage(`data:image/jpeg;base64,${imageBase64}`);
      } else {
        setError('Failed to generate image. The API returned no image data.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <ImageGeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
          <ImageDisplay 
            isLoading={isLoading} 
            generatedImage={generatedImage} 
            error={error} 
            prompt={prompt} 
          />
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini. Wallpapers for personal use only.</p>
      </footer>
    </div>
  );
};

export default App;
