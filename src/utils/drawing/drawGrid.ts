import { COLOURS } from '@/constants/design';

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  rows: number,
  cols: number,
  cellSize: number,
  zoom: number
) => {
  const gridWidth = cols * cellSize;
  const gridHeight = rows * cellSize;

  ctx.fillStyle = COLOURS.activeGrid.background;
  ctx.fillRect(0, 0, gridWidth, gridHeight);

  ctx.beginPath();
  ctx.strokeStyle = COLOURS.activeGrid.lines;
  ctx.lineWidth = 1 / zoom; 

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
};
