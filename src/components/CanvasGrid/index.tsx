import { useEffect } from 'react';
import './CanvasGrid.css';
import { GridSettings } from '@/types/grid';
import { useCanvas } from '@/hooks/useCanvas';
import { renderGrid } from '@/utils/renderGrid';

const CanvasGrid = ({ numRows = 10, numColumns = 10 }: GridSettings) => {
  const { canvasRef, containerRef, context } = useCanvas();

  useEffect(() => {
    if (context) {
      renderGrid({
        ctx: context,
        rows: numRows,
        cols: numColumns,
      });
    }
  }, [context, numRows, numColumns]);
  return (
    <div ref={containerRef} className="canvas-container">
      <canvas ref={canvasRef} className="canvas-element" />
    </div>
  );
};

export default CanvasGrid;
