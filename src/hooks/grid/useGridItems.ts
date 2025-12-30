import { useState, useCallback } from 'react';
import { GridItem, ComponentType } from '@/types/grid';

export const useGridItems = () => {
  const [items, setItems] = useState<GridItem[]>([]);

  const isCellOccupied = useCallback((x: number, y: number) => {
    return items.some(item => item.x === x && item.y === y);
  }, [items]);

  const addItem = useCallback((x: number, y: number, type: ComponentType) => {
    if (isCellOccupied(x, y)) {
      console.warn(`Cell at ${x},${y} is already occupied.`);
      return;
    }

    const newItem: GridItem = {
      id: crypto.randomUUID(),
      x,
      y,
      type,
    };
    setItems(prev => [...prev, newItem]);
  }, [isCellOccupied]);

  const removeItem = useCallback((x: number, y: number) => {
    setItems(prev => prev.filter(item => item.x !== x || item.y !== y));
  }, []);

  return {
    items,
    addItem,
    removeItem,
    isCellOccupied
  };
};
