'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  const { canvasRef, setOutputImage, isLoading, setIsLoading } =
    useAppStore();

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Prompt is required');
      return;
    }

    if (!canvasRef?.current) {
      setError('Canvas not available');
      return;
    }

    const base64 = canvasRef.current.toDataURL({
      mimeType: 'image/png',
      pixelRatio: 2,
    });

    console.log('Canvas base64 length:', base64.length);
    console.log('Base64 preview:', base64.substring(0, 100));

    if (!base64 || base64.length < 100) {
      setError('Please draw something on the canvas');
      return;
    }

    setIsLoading(true);
    setError('');
    generateAIImage(base64);
  };

  const generateAIImage = async (base64: string) => {
    try {
      const response = await fetch('/api/replicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, image: base64 }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: 'Unknown error' }));
        setError(
          errorData.error || `Server error: ${response.status}`
        );
        return;
      }

      const result = await response.json();

      if (!result.output) {
        setError('No image generated');
        return;
      }

      const imageUrl = result.output;

      if (!imageUrl) {
        setError('No generated image found');
        return;
      }

      setOutputImage(imageUrl);
    } catch (error) {
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[280px] ml-[-6px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[700px] mx-auto">
      <div className="flex items-center border border-slate-300 overflow-hidden rounded-xl bg-white">
        <input
          type="text"
          name="prompt"
          className="flex-1 px-4 py-3 focus:outline-none text-slate-900 border-r border-slate-300 bg-transparent text-lg font-medium placeholder-slate-500"
          placeholder="Describe what you want to build..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`py-3 px-6 text-white font-semibold text-lg text-center transition-all duration-200 flex items-center justify-center gap-2 min-w-[120px] focus:outline-none rounded-r-xl ${
            isLoading
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 cursor-pointer'
          }`}
        >
          {isLoading ? 'Building...' : 'Generate'}
        </button>
      </div>
      {error && (
        <div className="mt-4 px-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="text-red-800 text-sm font-medium">
              {error}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
