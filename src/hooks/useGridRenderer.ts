import { useEffect } from 'react';
import { renderGrid } from '@/utils/renderGrid';
import { GridItem } from '@/types/grid';

interface UseGridRendererProps {
  context: CanvasRenderingContext2D | null;
  rows: number;
  cols: number;
  zoom: number;
  pan: { x: number; y: number };
  items: GridItem[];
}

export const useGridRenderer = ({
  context,
  rows,
  cols,
  zoom,
  pan,
  items,
}: UseGridRendererProps) => {
  useEffect(() => {
    if (context) {
      let animationFrameId: number;
      
      const render = () => {
        renderGrid({
          ctx: context,
          rows,
          cols,
          zoom,
          pan,
          items,
        });
      };

      animationFrameId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [context, rows, cols, zoom, pan, items]);
};
