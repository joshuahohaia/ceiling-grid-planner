import { useCallback, useEffect, useRef } from 'react';
import { ViewControlHandlers } from './useViewControls';

interface UseViewControlHandlersProps {
  context: CanvasRenderingContext2D | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cols: number;
  rows: number;
  zoom: number;
  fitToView: (containerWidth: number, containerHeight: number, cols: number, rows: number) => void;
  zoomInAtCenter: (containerWidth: number, containerHeight: number) => void;
  zoomOutAtCenter: (containerWidth: number, containerHeight: number) => void;
  onViewControlsReady?: (handlers: ViewControlHandlers) => void;
  onZoomChange?: (zoom: number) => void;
}

export const useViewControlHandlers = ({
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
}: UseViewControlHandlersProps) => {
  const initializedRef = useRef(false);

  const handleFitToView = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    fitToView(width, height, cols, rows);
  }, [containerRef, fitToView, cols, rows]);

  const handleZoomIn = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    zoomInAtCenter(width, height);
  }, [containerRef, zoomInAtCenter]);

  const handleZoomOut = useCallback(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    zoomOutAtCenter(width, height);
  }, [containerRef, zoomOutAtCenter]);

  useEffect(() => {
    if (context && containerRef.current && !initializedRef.current) {
      handleFitToView();
      initializedRef.current = true;
    }
  }, [context, containerRef, handleFitToView]);

  useEffect(() => {
    if (onViewControlsReady) {
      onViewControlsReady({
        fitToView: handleFitToView,
        zoomIn: handleZoomIn,
        zoomOut: handleZoomOut,
      });
    }
  }, [onViewControlsReady, handleFitToView, handleZoomIn, handleZoomOut]);

  useEffect(() => {
    if (onZoomChange) {
      onZoomChange(zoom);
    }
  }, [zoom, onZoomChange]);
};
