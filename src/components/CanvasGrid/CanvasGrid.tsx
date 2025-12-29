import { useEffect, useRef } from 'react';
import './CanvasGrid.css';
import { useCanvas } from '@/hooks/useCanvas';
import { usePanZoom } from '@/hooks/usePanZoom';
import { useAutoCenter } from '@/hooks/useAutoCenter';
import { renderGrid } from '@/utils/renderGrid';
import { GridDimensions, GridItem } from '@/types/grid';
import { DIMENSIONS } from '@/constants/design';

interface CanvasGridProps extends GridDimensions {
  items: GridItem[];
  onGridClick: (x: number, y: number) => void;
}

const CanvasGrid = ({ rows = 10, cols = 10, items, onGridClick }: CanvasGridProps) => {
  const { canvasRef, containerRef, context } = useCanvas();
  const { zoom, pan, setPan, bind } = usePanZoom();
  const mouseStartRef = useRef({ x: 0, y: 0 });

  useAutoCenter({
    context,
    containerRef,
    cols,
    rows,
    zoom,
    setPan,
  });

  useEffect(() => {
    if (context) {
      requestAnimationFrame(() => {
        renderGrid({
          ctx: context,
          rows,
          cols,
          zoom,
          pan,
          items,
        });
      });
    }
  }, [context, rows, cols, zoom, pan, items]);

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartRef.current = { x: e.clientX, y: e.clientY };
    bind.onMouseDown(e);
  };

  const handleClick = (e: React.MouseEvent) => {
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
  };

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      {...bind}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="canvas-element" />
    </div>
  );
};

export default CanvasGrid;
