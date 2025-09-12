'use client';

import { useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

export default function Home() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      {/* Header Section */}
      <section className="flex items-center justify-center mb-10">
        <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r  from-blue-500 via-green-500 to-indigo-500">
          ScribbleAI
        </h1>
      </section>
      {/* Sketch Canvas Section */}
      <section className="w-[400px] h-[400px] mx-auto mb-12 mt-6">
        <div className="w-full aspect-square border-none">
          <ReactSketchCanvas
            width="100%"
            height="100%"
            strokeWidth={4}
            strokeColor="#000000"
          />
        </div>
      </section>
      {/* Prompt Section */}
      <section className="w-[400px] mx-auto relative">
        <div className="flex items-center">
          <input
            type="text"
            name="prompt"
            className="rounded-l-lg px-4 py-3 w-full focus:outline-none text-black border border-gray-300"
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="rounded-r-lg py-3.5 px-4 ml-1 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium text-sm text-center">
            Generate
          </button>
        </div>
      </section>
      {/* Output Image Section */}
      <section className="w-[400px] h-[400px] flex items-center justify center mx-auto mt-12"></section>
    </div>
  );
}
