'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

export const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');

  // Get canvas ref from store
  const { canvasRef } = useAppStore();

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Prompt is required');
      return;
    }

    if (!canvasRef?.current) {
      setError('Canvas not ready');
      return;
    }

    setError('');

    // Get base64 only when Generate is clicked
    const base64 = await canvasRef.current.exportImage('png');
    console.log('Base64:', base64);

    if (!base64) {
      setError('Please draw something on the canvas');
      return;
    }

    // Here you have both prompt and base64!
    console.log('Ready to generate image!');
    console.log('Calling API with:', { prompt, base64 });

    // TODO: Call your API here
    // const response = await fetch('/api/replicate', {
    //   method: 'POST',
    //   body: JSON.stringify({ image: base64, prompt })
    // });
  };
  return (
    <div className="flex items-center w-[280px] ml-[-6px] sm:w-[500px] md:w-[600px] lg:w-[700px] mx-auto">
      <input
        type="text"
        name="prompt"
        className="flex-1 rounded-l-lg px-4 py-3 focus:outline-none text-black border border-gray-300"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleGenerate}
        className="rounded-r-lg py-3.5 px-6 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium text-sm text-center transition-all duration-200"
      >
        Generate
      </button>
    </div>
  );
};
