import { useEffect } from 'react';
import './CanvasGrid.css';
import { GridDimensions } from '@/types/grid';
import { useCanvas } from '@/hooks/useCanvas';
import { renderGrid } from '@/utils/renderGrid';

const CanvasGrid = ({ rows = 10, cols = 10 }: GridDimensions) => {
  const { canvasRef, containerRef, context } = useCanvas();

  useEffect(() => {
    if (context) {
      renderGrid({
        ctx: context,
        rows,
        cols,
      });
    }
  }, [context, rows, cols]);
  return (
    <div ref={containerRef} className="canvas-container">
      <canvas ref={canvasRef} className="canvas-element" />
    </div>
  );
};

export default CanvasGrid;
