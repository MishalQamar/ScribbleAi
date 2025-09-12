import { create } from 'zustand';
import { ReactSketchCanvasRef } from 'react-sketch-canvas';

interface AppStore {
  // State
  canvasRef: React.RefObject<ReactSketchCanvasRef | null> | null;

  // Actions
  setCanvasRef: (
    ref: React.RefObject<ReactSketchCanvasRef | null>
  ) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Initial state
  canvasRef: null,

  // Actions
  setCanvasRef: (ref) => set({ canvasRef: ref }),
}));
