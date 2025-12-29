import { COLOURS } from '@/constants/design';
import { GridItem } from '@/types/grid';

export const drawComponent = (ctx: CanvasRenderingContext2D, item: GridItem, cellSize: number) => {
  const x = item.x * cellSize;
  const y = item.y * cellSize;
  const padding = cellSize * 0.15;
  const innerSize = cellSize - (padding * 2);

  ctx.save();
  ctx.translate(x, y);

  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';

  switch (item.type) {
    case 'light':
      ctx.fillStyle = COLOURS.components.light;
      ctx.beginPath();
      ctx.arc(cellSize / 2, cellSize / 2, innerSize / 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.stroke();
      break;

    case 'airSupply':
      ctx.fillStyle = COLOURS.components.airSupply;
      ctx.fillRect(padding, padding, innerSize, innerSize);
      
      // Border
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.strokeRect(padding, padding, innerSize, innerSize);

      // Inner X
      ctx.beginPath();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding + innerSize, padding + innerSize);
      ctx.moveTo(padding + innerSize, padding);
      ctx.lineTo(padding, padding + innerSize);
      ctx.stroke();
      break;

    case 'airReturn':
      ctx.fillStyle = COLOURS.components.airReturn;
      ctx.fillRect(padding, padding, innerSize, innerSize);
      
      // Border
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.strokeRect(padding, padding, innerSize, innerSize);

      // Single Diagonal
      ctx.beginPath();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.moveTo(padding, padding + innerSize);
      ctx.lineTo(padding + innerSize, padding);
      ctx.stroke();
      break;

    case 'smokeDetector':
      const r = innerSize * 0.2;
      
      // Inner Dot
      ctx.fillStyle = COLOURS.components.smokeDetector;
      ctx.beginPath();
      ctx.arc(cellSize / 2, cellSize / 2, r, 0, Math.PI * 2);
      ctx.fill();
      
      // Outer Ring
      ctx.strokeStyle = COLOURS.components.smokeDetector;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cellSize / 2, cellSize / 2, r + 4, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 'invalid':
      ctx.fillStyle = 'rgba(210, 209, 197, 0.4)';
      ctx.fillRect(0, 0, cellSize, cellSize);
      
      ctx.beginPath();
      ctx.strokeStyle = COLOURS.components.invalid;
      ctx.lineWidth = 1;
      
      // Draw standard diagonal hatch
      const spacing = 8;
      for (let i = -cellSize; i < cellSize * 2; i += spacing) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i + cellSize, cellSize);
      }
      
      ctx.rect(0, 0, cellSize, cellSize);
      ctx.clip();
      ctx.stroke();
      
      // Outline the cell
      ctx.strokeStyle = COLOURS.components.invalid;
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, cellSize, cellSize);
      break;
  }

  ctx.restore();
};