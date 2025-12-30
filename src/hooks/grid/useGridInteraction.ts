import { useState, useCallback } from 'react';
import { useGridItems } from './useGridItems';
import { useToolState } from './useToolState';

export const useGridInteraction = ({ rows, cols }: { rows: number; cols: number }) => {
  const { items, addItem, removeItem, updateItem, isCellOccupied } = useGridItems();
  const { activeTool, setActiveTool, isComponentTool } = useToolState();
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const handleGridClick = useCallback((x: number, y: number) => {
    if (activeTool === 'cursor') return;

    if (activeTool === 'eraser') {
      removeItem(x, y);
      return;
    }

    if (isComponentTool(activeTool)) {
      if (isCellOccupied(x, y)) {
        console.log('Cell occupied!');
        return;
      }
      addItem(x, y, activeTool);
    }
  }, [activeTool, addItem, removeItem, isCellOccupied, isComponentTool]);

  const handleGridMouseDown = useCallback((x: number, y: number) => {
    if (activeTool === 'cursor') {
      const item = items.find(i => i.x === x && i.y === y);
      if (item) {
        setDraggedItemId(item.id);
        return true;
      }
    }
    return false;
  }, [activeTool, items]);

  const handleGridMouseMove = useCallback((x: number, y: number) => {
    if (draggedItemId) {
      // Boundary check
      if (x < 0 || x >= cols || y < 0 || y >= rows) {
        return;
      }

      // Collision check
      if (isCellOccupied(x, y, draggedItemId)) {
        return;
      }

      updateItem(draggedItemId, { x, y });
    }
  }, [draggedItemId, updateItem, rows, cols, isCellOccupied]);

  const handleGridMouseUp = useCallback(() => {
    setDraggedItemId(null);
  }, []);

  return {
    items,
    activeTool,
    setActiveTool,
    handleGridClick,
    handleGridMouseDown,
    handleGridMouseMove,
    handleGridMouseUp,
    draggedItemId
  };
};
