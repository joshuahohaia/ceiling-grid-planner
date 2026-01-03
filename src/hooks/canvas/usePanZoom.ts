import { useState, useCallback } from 'react';
import { DIMENSIONS } from '@/constants/design';

const FIT_PADDING = 0.9;

export interface PanZoomState {
  zoom: number;
  pan: { x: number; y: number };
}

export const usePanZoom = (initialZoom = 1) => {
  const [zoom, setZoom] = useState(initialZoom);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const fitToView = useCallback((containerWidth: number, containerHeight: number, cols: number, rows: number) => {
    const gridWidth = cols * DIMENSIONS.cellSize;
    const gridHeight = rows * DIMENSIONS.cellSize;

    const scaleX = containerWidth / gridWidth;
    const scaleY = containerHeight / gridHeight;
    const newZoom = Math.min(scaleX, scaleY) * FIT_PADDING;
    const clampedZoom = Math.min(Math.max(0.1, newZoom), 5);

    const scaledGridWidth = gridWidth * clampedZoom;
    const scaledGridHeight = gridHeight * clampedZoom;
    const newPanX = (containerWidth - scaledGridWidth) / 2;
    const newPanY = (containerHeight - scaledGridHeight) / 2;

    setZoom(clampedZoom);
    setPan({ x: newPanX, y: newPanY });
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - lastMousePos.x;
    const dy = e.clientY - lastMousePos.y;

    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePos]);

  const onMouseUp = useCallback(() => setIsDragging(false), []);
  const onMouseLeave = useCallback(() => setIsDragging(false), []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    // e.preventDefault(); potentially need this here if not using global prevent
    
    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;
    const newZoom = Math.min(Math.max(0.1, zoom * (1 + delta)), 5); 

    // Calculate mouse position relative to the container
    const container = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - container.left;
    const mouseY = e.clientY - container.top;

    // Zoom towards cursor
    const scaleRatio = newZoom / zoom;
    const newPanX = mouseX - (mouseX - pan.x) * scaleRatio;
    const newPanY = mouseY - (mouseY - pan.y) * scaleRatio;

    setPan({ x: newPanX, y: newPanY });
    setZoom(newZoom);
  }, [zoom, pan]);

  return {
    zoom,
    setZoom,
    pan,
    setPan,
    fitToView,
    bind: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onWheel,
    }
  };
};
