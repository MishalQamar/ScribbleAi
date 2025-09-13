'use client';

import React, {
  type ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Konva from 'konva';
import { Eraser, Pen, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';

export const Canvas = () => {
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [strokeColor, setStrokeColor] = useState('#6497eb');
  const [lines, setLines] = useState<
    { tool: 'pen' | 'eraser'; color: string; points: number[] }[]
  >([]);
  const [canvasSize, setCanvasSize] = useState({
    width: 280,
    height: 200,
  });
  const [resetKey, setResetKey] = useState(0);
  const isDrawing = useRef(false);

  const stageRef = useRef<Konva.Stage>(null);
  const { setCanvasRef } = useAppStore();

  const getCanvasDimensions = () => {
    if (typeof window === 'undefined')
      return { width: 280, height: 200 };

    const width = window.innerWidth;
    if (width >= 1280) return { width: 700, height: 400 };
    if (width >= 1024) return { width: 700, height: 400 };
    if (width >= 768) return { width: 600, height: 350 };
    if (width >= 640) return { width: 500, height: 300 };
    return { width: 280, height: 200 };
  };

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize(getCanvasDimensions());
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () =>
      window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    setCanvasRef(stageRef);
  }, [setCanvasRef]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;
    setLines((prev) => [
      ...prev,
      { tool, color: strokeColor, points: [pos.x, pos.y] },
    ]);
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;
    setLines((prev) => {
      const lastLine = prev[prev.length - 1];
      const updatedLine = {
        ...lastLine,
        points: lastLine.points.concat([point.x, point.y]),
      };
      return [...prev.slice(0, -1), updatedLine];
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleResetClick = () => {
    setLines([]);
    isDrawing.current = false;
    setResetKey((prev) => prev + 1);
  };

  const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(event.target.value);
  };

  const handlePencilClick = () => setTool('pen');
  const handleEraserClick = () => setTool('eraser');

  return (
    <div className="mt-6 flex gap-4 mx-auto">
      <div className="w-[280px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[700px]">
        <Stage
          key={resetKey}
          ref={stageRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          style={{
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
          }}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.tool === 'eraser' ? '#fff' : line.color}
                strokeWidth={line.tool === 'eraser' ? 20 : 3}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === 'eraser'
                    ? 'destination-out'
                    : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <div className="flex flex-col w-10 gap-2">
        <div className="w-auto h-9 rounded-full overflow-hidden">
          <input
            title="Color"
            className="w-[200%] h-[200%] bg-transparent border-none cursor-pointer appearance-none transform-cpu -translate-x-1/4 -translate-y-1/4"
            type="color"
            value={strokeColor}
            onChange={onColorChange}
          />
        </div>

        <hr className="border-slate-200 border rounded-full" />

        <Button
          title="Pen"
          variant={tool === 'pen' ? 'default' : 'outline'}
          size="icon"
          aria-label="pencil"
          onClick={handlePencilClick}
          className={
            tool === 'pen'
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : ''
          }
        >
          <Pen size={18} />
        </Button>

        <Button
          title="Eraser"
          variant={tool === 'eraser' ? 'default' : 'outline'}
          size="icon"
          aria-label="eraser"
          onClick={handleEraserClick}
          className={
            tool === 'eraser'
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : ''
          }
        >
          <Eraser size={18} />
        </Button>

        <hr className="border-slate-200 border rounded-full" />

        <Button
          title="Clear Canvas"
          variant="outline"
          size="icon"
          aria-label="clear"
          onClick={handleResetClick}
        >
          <RotateCcw size={18} />
        </Button>
      </div>
    </div>
  );
};
