import './CanvasGrid.css';
import { useCanvas } from '@/hooks/useCanvas';
import { usePanZoom } from '@/hooks/usePanZoom';
import { useAutoCenter } from '@/hooks/useAutoCenter';
import { useGridRenderer } from '@/hooks/useGridRenderer';
import { useCanvasInteraction } from '@/hooks/useCanvasInteraction';
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
