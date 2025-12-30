import { useRef, useCallback } from 'react';
import { DIMENSIONS } from '@/constants/design';

interface UseCanvasInteractionProps {
  onGridClick: (x: number, y: number) => void;
  pan: { x: number; y: number };
  zoom: number;
  cols: number;
  rows: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useCanvasInteraction = ({
  onGridClick,
  pan,
  zoom,
  cols,
  rows,
  containerRef,
}: UseCanvasInteractionProps) => {
  const mouseStartRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    mouseStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - mouseStartRef.current.x);
    const dy = Math.abs(e.clientY - mouseStartRef.current.y);

    // If moved more than 5px, treat as drag/pan, not click
    if (dx > 5 || dy > 5) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Grid coordinates
    const gridX = Math.floor((x - pan.x) / zoom / DIMENSIONS.cellSize);
    const gridY = Math.floor((y - pan.y) / zoom / DIMENSIONS.cellSize);

    // Bounds check
    if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
      onGridClick(gridX, gridY);
    }
  }, [pan, zoom, cols, rows, onGridClick, containerRef]);

  return {
    handleMouseDown,
    handleClick,
  };
};
