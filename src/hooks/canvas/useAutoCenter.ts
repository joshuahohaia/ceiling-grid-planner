import { useEffect, useRef } from 'react';
import { DIMENSIONS } from '@/constants/design';

interface AutoCenterProps {
  context: CanvasRenderingContext2D | null;
  containerRef: React.RefObject<HTMLDivElement>;
  cols: number;
  rows: number;
  zoom: number;
  setPan: (pan: { x: number; y: number }) => void;
}

export const useAutoCenter = ({
  context,
  containerRef,
  cols,
  rows,
  zoom,
  setPan,
}: AutoCenterProps) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (context && containerRef.current && !initializedRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      const gridPixelWidth = cols * DIMENSIONS.cellSize * zoom;
      const gridPixelHeight = rows * DIMENSIONS.cellSize * zoom;

      const initialPanX = (width - gridPixelWidth) / 2;
      const initialPanY = (height - gridPixelHeight) / 2;

      setPan({ x: initialPanX, y: initialPanY });
      initializedRef.current = true;
    }
  }, [context, cols, rows, zoom, setPan, containerRef]);
};
