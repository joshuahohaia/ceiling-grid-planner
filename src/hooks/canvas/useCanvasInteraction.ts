import { useRef, useCallback } from 'react';
import { DIMENSIONS } from '@/constants/design';

interface UseCanvasInteractionProps {
  onGridClick: (x: number, y: number) => void;
  onGridMouseDown: (x: number, y: number) => boolean;
  onGridMouseMove: (x: number, y: number) => void;
  onGridMouseUp: () => void;
  onHoverPositionChange?: (position: { x: number; y: number } | null) => void;
  pan: { x: number; y: number };
  zoom: number;
  cols: number;
  rows: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useCanvasInteraction = ({
  onGridClick,
  onGridMouseDown,
  onGridMouseMove,
  onGridMouseUp,
  onHoverPositionChange,
  pan,
  zoom,
  cols,
  rows,
  containerRef,
}: UseCanvasInteractionProps) => {
  const mouseStartRef = useRef({ x: 0, y: 0 });
  const isDraggingItemRef = useRef(false);

  const getGridCoords = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const gridX = Math.floor((x - pan.x) / zoom / DIMENSIONS.cellSize);
    const gridY = Math.floor((y - pan.y) / zoom / DIMENSIONS.cellSize);

    return { gridX, gridY };
  }, [pan, zoom, containerRef]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    mouseStartRef.current = { x: e.clientX, y: e.clientY };
    
    const coords = getGridCoords(e.clientX, e.clientY);
    if (!coords) return false;

    const { gridX, gridY } = coords;
    
    // Bounds check
    if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
      const captured = onGridMouseDown(gridX, gridY);
      if (captured) {
        isDraggingItemRef.current = true;
        return true;
      }
    }
    return false;
  }, [getGridCoords, cols, rows, onGridMouseDown]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const coords = getGridCoords(e.clientX, e.clientY);

    if (coords && onHoverPositionChange) {
      onHoverPositionChange({ x: coords.gridX, y: coords.gridY });
    }

    if (isDraggingItemRef.current && coords) {
      onGridMouseMove(coords.gridX, coords.gridY);
    }
  }, [getGridCoords, onGridMouseMove, onHoverPositionChange]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (isDraggingItemRef.current) {
      isDraggingItemRef.current = false;
      onGridMouseUp();
      return;
    }

    const dx = Math.abs(e.clientX - mouseStartRef.current.x);
    const dy = Math.abs(e.clientY - mouseStartRef.current.y);

    // If moved more than 5px, treat as pan, not click
    if (dx > 5 || dy > 5) return;

    const coords = getGridCoords(e.clientX, e.clientY);
    if (!coords) return;

    const { gridX, gridY } = coords;

    if (gridX >= 0 && gridX < cols && gridY >= 0 && gridY < rows) {
      onGridClick(gridX, gridY);
    }
  }, [getGridCoords, cols, rows, onGridClick, onGridMouseUp]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
