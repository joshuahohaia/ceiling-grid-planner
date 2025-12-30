import './CanvasGrid.css';
import { useCanvas } from '@/hooks/canvas/useCanvas';
import { usePanZoom } from '@/hooks/canvas/usePanZoom';
import { useAutoCenter } from '@/hooks/canvas/useAutoCenter';
import { useGridRenderer } from '@/hooks/canvas/useGridRenderer';
import { useCanvasInteraction } from '@/hooks/canvas/useCanvasInteraction';
import { GridDimensions, GridItem } from '@/types/grid';

interface CanvasGridProps extends GridDimensions {
  items: GridItem[];
  onGridClick: (x: number, y: number) => void;
}

const CanvasGrid = ({ rows = 10, cols = 10, items, onGridClick }: CanvasGridProps) => {
  const { canvasRef, containerRef, context } = useCanvas();
  const { zoom, pan, setPan, bind } = usePanZoom();

  useAutoCenter({
    context,
    containerRef,
    cols,
    rows,
    zoom,
    setPan,
  });

  useGridRenderer({
    context,
    rows,
    cols,
    zoom,
    pan,
    items,
  });

  const { handleMouseDown: handleInteractionMouseDown, handleClick } = useCanvasInteraction({
    onGridClick,
    pan,
    zoom,
    cols,
    rows,
    containerRef,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    handleInteractionMouseDown(e);
    bind.onMouseDown(e);
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
