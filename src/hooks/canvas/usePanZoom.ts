import { useState, useCallback } from 'react';
import { DIMENSIONS } from '@/constants/design';

const FIT_PADDING = 0.9;
const ZOOM_STEP = 1.25;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

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
    const clampedZoom = Math.min(Math.max(MIN_ZOOM, newZoom), MAX_ZOOM);

    const scaledGridWidth = gridWidth * clampedZoom;
    const scaledGridHeight = gridHeight * clampedZoom;
    const newPanX = (containerWidth - scaledGridWidth) / 2;
    const newPanY = (containerHeight - scaledGridHeight) / 2;

    setZoom(clampedZoom);
    setPan({ x: newPanX, y: newPanY });
  }, []);

  const zoomTo = useCallback((newZoom: number, centerX: number, centerY: number) => {
    const clampedZoom = Math.min(Math.max(MIN_ZOOM, newZoom), MAX_ZOOM);
    const scaleRatio = clampedZoom / zoom;
    const newPanX = centerX - (centerX - pan.x) * scaleRatio;
    const newPanY = centerY - (centerY - pan.y) * scaleRatio;

    setZoom(clampedZoom);
    setPan({ x: newPanX, y: newPanY });
  }, [zoom, pan]);

  const zoomInAtCenter = useCallback((containerWidth: number, containerHeight: number) => {
    zoomTo(zoom * ZOOM_STEP, containerWidth / 2, containerHeight / 2);
  }, [zoom, zoomTo]);

  const zoomOutAtCenter = useCallback((containerWidth: number, containerHeight: number) => {
    zoomTo(zoom / ZOOM_STEP, containerWidth / 2, containerHeight / 2);
  }, [zoom, zoomTo]);

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
    const newZoom = Math.min(Math.max(MIN_ZOOM, zoom * (1 + delta)), MAX_ZOOM); 

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
    zoomInAtCenter,
    zoomOutAtCenter,
    bind: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onWheel,
    }
  };
};
