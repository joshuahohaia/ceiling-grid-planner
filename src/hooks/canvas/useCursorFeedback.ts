import { useMemo } from 'react';
import { ToolType, GridItem } from '@/types/grid';

type CursorStyle = 'default' | 'grab' | 'grabbing' | 'crosshair';

interface UseCursorFeedbackProps {
  activeTool: ToolType;
  isPanning: boolean;
  isDraggingItem: boolean;
  hoverPosition: { x: number; y: number } | null;
  items: GridItem[];
  cols: number;
  rows: number;
}

const isPositionOccupied = (x: number, y: number, items: GridItem[]): boolean => {
  return items.some(item => item.x === x && item.y === y);
};

const isPositionValid = (x: number, y: number, cols: number, rows: number): boolean => {
  return x >= 0 && x < cols && y >= 0 && y < rows;
};

export const useCursorFeedback = ({
  activeTool,
  isPanning,
  isDraggingItem,
  hoverPosition,
  items,
  cols,
  rows,
}: UseCursorFeedbackProps): CursorStyle => {
  return useMemo(() => {
    if (isDraggingItem || isPanning) {
      return 'grabbing';
    }

    if (activeTool === 'cursor') {
      if (hoverPosition && isPositionValid(hoverPosition.x, hoverPosition.y, cols, rows)) {
        const hasItem = isPositionOccupied(hoverPosition.x, hoverPosition.y, items);
        if (hasItem) {
          return 'grab';
        }
      }
      return 'crosshair';
    }

    return 'crosshair';
  }, [activeTool, isPanning, isDraggingItem, hoverPosition, items, cols, rows]);
};
