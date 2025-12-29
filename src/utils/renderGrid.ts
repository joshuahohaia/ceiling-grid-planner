import { DIMENSIONS } from '@/constants/design';
import { GridItem } from '@/types/grid';
import { drawGrid } from './drawing/drawGrid';
import { drawComponent } from './drawing/drawComponent';

interface RenderGridParams {
  ctx: CanvasRenderingContext2D;
  rows: number;
  cols: number;
  zoom: number;
  pan: { x: number; y: number };
  items: GridItem[];
}

export const renderGrid = ({
  ctx,
  rows,
  cols,
  zoom,
  pan,
  items = [],
}: RenderGridParams) => {
  const dpr = window.devicePixelRatio || 1;
  ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

  ctx.save();
  
  ctx.translate(pan.x, pan.y);
  ctx.scale(zoom, zoom);

  const cellSize = DIMENSIONS.cellSize;

  drawGrid(ctx, rows, cols, cellSize, zoom);

  items.forEach(item => {
    drawComponent(ctx, item, cellSize);
  });

  ctx.restore();
};
