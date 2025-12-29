import { COLOURS, DIMENSIONS } from '@/constants/design';

interface RenderGridParams {
  ctx: CanvasRenderingContext2D;
  rows: number;
  cols: number;
  zoom: number;
  pan: { x: number; y: number };
}

export const renderGrid = ({
  ctx,
  rows,
  cols,
  zoom,
  pan,
}: RenderGridParams) => {
  const dpr = window.devicePixelRatio || 1;
  ctx.clearRect(0, 0, ctx.canvas.width / dpr, ctx.canvas.height / dpr);

  ctx.save();
  
  ctx.translate(pan.x, pan.y);
  ctx.scale(zoom, zoom);

  const cellSize = DIMENSIONS.cellSize;
  const gridWidth = cols * cellSize;
  const gridHeight = rows * cellSize;

  ctx.fillStyle = COLOURS.activeGrid.background;
  ctx.fillRect(0, 0, gridWidth, gridHeight);

  ctx.beginPath();
  ctx.strokeStyle = COLOURS.activeGrid.lines;
  ctx.lineWidth = 1;

  // Vertical Lines
  for (let x = 0; x <= gridWidth; x += cellSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, gridHeight);
  }

  // Horizontal Lines
  for (let y = 0; y <= gridHeight; y += cellSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(gridWidth, y);
  }

  ctx.stroke();
  ctx.restore();
};
