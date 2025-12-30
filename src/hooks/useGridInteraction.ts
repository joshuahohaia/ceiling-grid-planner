import { useCallback } from 'react';
import { useGridItems } from './useGridItems';
import { useToolState } from './useToolState';

export const useGridInteraction = () => {
  const { items, addItem, removeItem, isCellOccupied } = useGridItems();
  const { activeTool, setActiveTool, isComponentTool } = useToolState();

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

  return {
    items,
    activeTool,
    setActiveTool,
    handleGridClick
  };
};
