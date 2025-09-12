'use client';

import { useRef, useState, useEffect } from 'react';
import {
  ReactSketchCanvas,
  ReactSketchCanvasRef,
} from 'react-sketch-canvas';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Eraser, Pen, Redo2, RotateCcw, Undo2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const Canvas = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [earseMode, setEraseMode] = useState(false);
  const { setCanvasRef } = useAppStore();

  // Store canvas ref when component mounts
  useEffect(() => {
    setCanvasRef(canvasRef);
  }, [setCanvasRef]);

  const colorInputRef = useRef<HTMLInputElement>(null);
  const handleStrokeColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStrokeColor(e.target.value);
  };

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };
  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };
  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };
  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <div className="mt-6 flex gap-4 mx-auto">
      {/* Canvas */}
      <div className="w-[280px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[700px]">
        <ReactSketchCanvas
          width="100%"
          height="400px"
          ref={canvasRef}
          strokeColor={strokeColor}
          canvasColor="transparent"
          className="!rounded-2xl border border-blue-300 cursor-crosshair"
        />
      </div>

      {/* Tools */}
      <div className="flex flex-col gap-y-6 divide-y divide-gray-200">
        <Button
          size="icon"
          type="button"
          onClick={() => colorInputRef.current?.click()}
          className={cn(
            'border border-gray-300',
            !strokeColor && 'border border-gray-300'
          )}
          style={{ backgroundColor: strokeColor }}
        >
          <input
            type="color"
            className="sr-only"
            ref={colorInputRef}
            value={strokeColor}
            onChange={handleStrokeColorChange}
          />
        </Button>

        <div className="flex flex-col gap-3 pt-6">
          <Button
            size="icon"
            type="button"
            variant="outline"
            disabled={!earseMode}
            onClick={handlePenClick}
          >
            <Pen size={16} />
          </Button>
          <Button
            size="icon"
            type="button"
            variant="outline"
            disabled={earseMode}
            onClick={handleEraserClick}
          >
            <Eraser size={16} />
          </Button>
        </div>
        <div className="flex flex-col gap-3 pt-6">
          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={handleUndoClick}
          >
            <Undo2 size={16} />
          </Button>
          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={handleRedoClick}
          >
            <Redo2 size={16} />
          </Button>
          <Button
            size="icon"
            type="button"
            variant="outline"
            onClick={handleClearClick}
          >
            <RotateCcw size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
