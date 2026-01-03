import './CanvasGrid.css';
import { useCanvas } from '@/hooks/canvas/useCanvas';
import { usePanZoom } from '@/hooks/canvas/usePanZoom';
import { useGridRenderer } from '@/hooks/canvas/useGridRenderer';
import { useCanvasInteraction } from '@/hooks/canvas/useCanvasInteraction';
import { useViewControlHandlers } from '@/hooks/canvas/useViewControlHandlers';
import { ViewControlHandlers } from '@/hooks/canvas/useViewControls';
import { GridDimensions, GridItem } from '@/types/grid';

interface CanvasGridProps extends GridDimensions {
  items: GridItem[];
  onGridClick: (x: number, y: number) => void;
  onGridMouseDown: (x: number, y: number) => boolean;
  onGridMouseMove: (x: number, y: number) => void;
  onGridMouseUp: () => void;
  onViewControlsReady?: (handlers: ViewControlHandlers) => void;
  onZoomChange?: (zoom: number) => void;
}

const CanvasGrid = ({
  rows = 10,
  cols = 10,
  items,
  onGridClick,
  onGridMouseDown,
  onGridMouseMove,
  onGridMouseUp,
  onViewControlsReady,
  onZoomChange
}: CanvasGridProps) => {
  const { canvasRef, containerRef, context } = useCanvas();
  const { zoom, pan, fitToView, zoomInAtCenter, zoomOutAtCenter, bind: panZoomBind } = usePanZoom();

  useViewControlHandlers({
    context,
    containerRef,
    cols,
    rows,
    zoom,
    fitToView,
    zoomInAtCenter,
    zoomOutAtCenter,
    onViewControlsReady,
    onZoomChange,
  });

  useGridRenderer({
    context,
    rows,
    cols,
    zoom,
    pan,
    items,
  });

  const { handleMouseDown: handleInteractionMouseDown, handleMouseMove, handleMouseUp } = useCanvasInteraction({
    onGridClick,
    onGridMouseDown,
    onGridMouseMove,
    onGridMouseUp,
    pan,
    zoom,
    cols,
    rows,
    containerRef,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    const captured = handleInteractionMouseDown(e);

    if (!captured) {
      panZoomBind.onMouseDown(e);
    }
  };

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    handleMouseMove(e);
    panZoomBind.onMouseMove(e);
  };

  const handleContainerMouseUp = (e: React.MouseEvent) => {
    handleMouseUp(e);
    panZoomBind.onMouseUp();
  };

  const handleContainerMouseLeave = () => {
    panZoomBind.onMouseLeave();
  };

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleContainerMouseMove}
      onMouseUp={handleContainerMouseUp}
      onMouseLeave={handleContainerMouseLeave}
      onWheel={panZoomBind.onWheel}
    >
      <canvas ref={canvasRef} className="canvas-element" />
    </div>
  );
};

export default CanvasGrid;
