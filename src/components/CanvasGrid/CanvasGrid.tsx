import { useState, useCallback } from 'react';
import './CanvasGrid.css';
import { useCanvas } from '@/hooks/canvas/useCanvas';
import { usePanZoom } from '@/hooks/canvas/usePanZoom';
import { useGridRenderer } from '@/hooks/canvas/useGridRenderer';
import { useCanvasInteraction } from '@/hooks/canvas/useCanvasInteraction';
import { useViewControlHandlers } from '@/hooks/canvas/useViewControlHandlers';
import { useCursorFeedback } from '@/hooks/canvas/useCursorFeedback';
import { ViewControlHandlers } from '@/hooks/canvas/useViewControls';
import { GridDimensions, GridItem, ToolType } from '@/types/grid';

interface CanvasGridProps extends GridDimensions {
  items: GridItem[];
  activeTool: ToolType;
  isDraggingItem: boolean;
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
  activeTool,
  isDraggingItem,
  onGridClick,
  onGridMouseDown,
  onGridMouseMove,
  onGridMouseUp,
  onViewControlsReady,
  onZoomChange
}: CanvasGridProps) => {
  const { canvasRef, containerRef, context } = useCanvas();
  const { zoom, pan, isPanning, fitToView, zoomInAtCenter, zoomOutAtCenter, bind: panZoomBind } = usePanZoom();
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  const cursor = useCursorFeedback({
    activeTool,
    isPanning,
    isDraggingItem,
    hoverPosition,
    items,
    cols,
    rows,
  });

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

  const handleHoverPositionChange = useCallback((position: { x: number; y: number } | null) => {
    setHoverPosition(position);
  }, []);

  const { handleMouseDown: handleInteractionMouseDown, handleMouseMove, handleMouseUp } = useCanvasInteraction({
    onGridClick,
    onGridMouseDown,
    onGridMouseMove,
    onGridMouseUp,
    onHoverPositionChange: handleHoverPositionChange,
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
    setHoverPosition(null);
  };

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      style={{ cursor }}
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
