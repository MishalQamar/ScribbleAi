'use client';

import { useRef, useState } from 'react';
import {
  ReactSketchCanvas,
  ReactSketchCanvasRef,
} from 'react-sketch-canvas';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Eraser, Pen, Redo2, RotateCcw, Undo2 } from 'lucide-react';

export const Canvas = () => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [earseMode, setEraseMode] = useState(false);
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
    <div className="mt-6 flex max-w-2xl gap-4">
      <ReactSketchCanvas
        width="100%"
        height="430px"
        ref={canvasRef}
        strokeColor={strokeColor}
        canvasColor="transparent"
        className="!rounded-2xl border border-blue-300"
        style={{ cursor: 'crosshair' }}
      />

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
