
import { GoogleGenAI } from "@google/genai";
import { type AspectRatioOptionValue } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWallpaper = async (
  userPrompt: string,
  aspectRatio: AspectRatioOptionValue
): Promise<string | null> => {
  try {
    const fullPrompt = `HD wallpaper, ${userPrompt}, 4k, 8k, photorealistic, cinematic lighting, epic composition, ultra high detail`;
    
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio,
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    }
    return null;
  } catch (error) {
    console.error("Error generating wallpaper:", error);
    throw new Error("Failed to generate wallpaper. Please check your prompt or API key.");
  }
};
