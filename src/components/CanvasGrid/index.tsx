import { useEffect } from 'react';
import './CanvasGrid.css';
import { GridDimensions } from '@/types/grid';
import { useCanvas } from '@/hooks/useCanvas';
import { usePanZoom } from '@/hooks/usePanZoom';
import { renderGrid } from '@/utils/renderGrid';

const CanvasGrid = ({ rows = 10, cols = 10 }: GridDimensions) => {
  const { canvasRef, containerRef, context } = useCanvas();
  const { zoom, pan, bind } = usePanZoom();

  useEffect(() => {
    if (context) {
      requestAnimationFrame(() => {
        renderGrid({
          ctx: context,
          rows,
          cols,
          zoom,
          pan,
        });
      });
    }
  }, [context, rows, cols, zoom, pan]);

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      {...bind}
    >
      <canvas ref={canvasRef} className="canvas-element" />
    </div>
  );
};

export default CanvasGrid;
