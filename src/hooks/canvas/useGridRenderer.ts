import { useLayoutEffect } from 'react';
import { renderGrid } from '@/utils/renderGrid';
import { GridItem } from '@/types/grid';

interface UseGridRendererProps {
  context: CanvasRenderingContext2D | null;
  contextVersion: number;
  rows: number;
  cols: number;
  zoom: number;
  pan: { x: number; y: number };
  items: GridItem[];
}

export const useGridRenderer = ({
  context,
  contextVersion,
  rows,
  cols,
  zoom,
  pan,
  items,
}: UseGridRendererProps) => {
  useLayoutEffect(() => {
    if (context) {
      renderGrid({
        ctx: context,
        rows,
        cols,
        zoom,
        pan,
        items,
      });
    }
  }, [context, contextVersion, rows, cols, zoom, pan, items]);
};
