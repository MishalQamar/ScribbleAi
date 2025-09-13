import { Canvas } from '@/components/canvas';
import { OutputImage } from '@/components/output-image';
import { Prompt } from '@/components/prompt';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto py-8 px-4 relative z-10">
        {/* Header Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
            LEGO Scribble
          </h1>
          <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">
            Transform your sketches into LEGO-inspired creations with
            AI
          </p>
        </section>

        {/* Main Content Container */}
        <div className="w-[320px] sm:w-[540px] md:w-[640px] lg:w-[740px] xl:w-[740px] mx-auto">
          <div className="flex flex-col gap-8 items-center">
            {/* Sketch Section */}
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">
                Sketch Your Idea
              </h2>
              <Canvas />
            </div>

            {/* Prompt Section */}
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">
                Describe Your Vision
              </h2>
              <Prompt />
            </div>

            {/* Output Image Section */}
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">
                Your LEGO Creation
              </h2>
              <div className="w-[280px] ml-[-6px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[700px] mx-auto">
                <OutputImage />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
