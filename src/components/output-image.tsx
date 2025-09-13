'use client';

import { useAppStore } from '@/store/useAppStore';
import Image from 'next/image';

export const OutputImage = () => {
  const { outputImage, isLoading } = useAppStore();

  if (isLoading) {
    return (
      <div className="h-[280px] sm:h-[400px] flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-slate-300 border-t-red-600 animate-spin rounded-full"></div>
          </div>
          <div className="text-center">
            <p className="text-slate-700 font-medium text-lg">
              Generating your LEGO creation...
            </p>
            <p className="text-slate-500 text-sm mt-1">
              This may take a few moments
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!outputImage) {
    return (
      <div className="h-[280px] sm:h-[400px] flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 text-slate-400">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-slate-700 text-lg font-medium">
            Your LEGO creation will appear here
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Draw something and describe your vision to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[280px] sm:h-[400px] flex items-center justify-center relative overflow-hidden border border-slate-200 rounded-xl">
      <Image
        src={outputImage}
        alt="Generated AI image"
        width={500}
        height={400}
        className="object-cover w-full h-full transition-all duration-300 ease-in-out hover:scale-105 rounded-xl"
        priority
      />
      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-sm font-medium rounded-lg">
        Generated
      </div>
    </div>
  );
};
