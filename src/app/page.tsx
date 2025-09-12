'use client';

import { useState } from 'react';
import { Canvas } from '@/components/canvas';

export default function Home() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-indigo-500 mb-4">
            ScribbleAI
          </h1>
          <p className="text-gray-600 text-lg">
            Transform your sketches into stunning AI-generated images
          </p>
        </section>

        {/* Main Content Container */}
        <div className="w-[320px] sm:w-[540px] md:w-[640px] lg:w-[740px] xl:w-[740px] mx-auto">
          <div className="flex flex-col gap-8 items-center">
            {/* Sketch Section */}
            <div className="w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left w-[280px] ml-[-6px] sm:w-[500px] md:w-[600px] lg:w-[700px] mx-auto">
                Draw Your Sketch
              </h2>
              <Canvas />
            </div>

            {/* Prompt Section */}
            <div className="w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left w-[280px] ml-[-6px] sm:w-[500px] md:w-[600px] lg:w-[700px] mx-auto">
                Describe Your Vision
              </h2>
              <div className="flex items-center w-[280px] ml-[-6px] sm:w-[500px] md:w-[600px] lg:w-[700px] mx-auto">
                <input
                  type="text"
                  name="prompt"
                  className="flex-1 rounded-l-lg px-4 py-3 focus:outline-none text-black border border-gray-300"
                  placeholder="Enter your prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button className="rounded-r-lg py-3.5 px-6 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium text-sm text-center transition-all duration-200">
                  Generate
                </button>
              </div>
            </div>

            {/* Output Image Section */}
            <div className="w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-left w-[280px] ml-[-6px] sm:w-[500px] md:w-[600px] lg:w-[700px] mx-auto">
                Generated Image
              </h2>
              <div className="w-[280px] sm:w-[500px] ml-[-6px] md:w-[600px] lg:w-[700px]  mx-auto h-80 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Your AI-generated image will appear here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
