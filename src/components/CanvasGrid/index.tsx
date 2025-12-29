import { useEffect, useState } from 'react';
import './CanvasGrid.css';
import { GridDimensions } from '@/types/grid';
import { useCanvas } from '@/hooks/useCanvas';
import { renderGrid } from '@/utils/renderGrid';

const CanvasGrid = ({ rows = 10, cols = 10 }: GridDimensions) => {
  const { canvasRef, containerRef, context } = useCanvas();
  
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (context) {
      renderGrid({
        ctx: context,
        rows,
        cols,
        zoom,
        pan,
      });
    }
  }, [context, rows, cols, zoom, pan]);

  return (
    <div ref={containerRef} className="canvas-container">
      <canvas ref={canvasRef} className="canvas-element" />
    </div>
  );
};

export default CanvasGrid;
