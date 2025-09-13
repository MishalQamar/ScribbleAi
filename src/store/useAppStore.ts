import { create } from 'zustand';
import Konva from 'konva';

interface AppStore {
  // State
  canvasRef: React.RefObject<Konva.Stage | null> | null;
  outputImage: string | null;
  isLoading: boolean;

  // Actions
  setCanvasRef: (ref: React.RefObject<Konva.Stage | null>) => void;
  setOutputImage: (image: string) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  // Initial state
  canvasRef: null,
  outputImage: null,
  isLoading: false,

  // Actions
  setCanvasRef: (ref) => set({ canvasRef: ref }),
  setOutputImage: (image) => set({ outputImage: image }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
