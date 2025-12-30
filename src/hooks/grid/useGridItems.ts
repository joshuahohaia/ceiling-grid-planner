import { useState, useCallback, useEffect } from 'react';
import { GridItem, ComponentType } from '@/types/grid';

export const useGridItems = (rows: number, cols: number) => {
  const [items, setItems] = useState<GridItem[]>([]);

  useEffect(() => {
    setItems(prev => prev.filter(item => item.x < cols && item.y < rows));
  }, [rows, cols]);

  const isCellOccupied = useCallback((x: number, y: number, excludeId?: string) => {
    return items.some(item => item.x === x && item.y === y && item.id !== excludeId);
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

  const updateItem = useCallback((id: string, updates: Partial<GridItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, []);

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    isCellOccupied
  };
};
