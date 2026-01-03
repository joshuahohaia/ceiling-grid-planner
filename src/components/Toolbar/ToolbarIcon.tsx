import { useEffect, useRef } from 'react';
import { ComponentType } from '@/types/grid';
import { drawComponent } from '@/utils/drawing/drawComponent';

type IconType = ComponentType | 'cursor' | 'eraser' | 'fitToView';

interface ToolbarIconProps {
  type: IconType;
}

const ToolbarIcon = ({ type }: ToolbarIconProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 32;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    if (type === 'cursor') {
      // Draw Cursor
      ctx.translate(6, 4);
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 18);
      ctx.lineTo(4.5, 13.5);
      ctx.lineTo(9, 22);
      ctx.lineTo(12, 20.5);
      ctx.lineTo(7.5, 12);
      ctx.lineTo(13, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (type === 'eraser') {
      // Draw Eraser
      ctx.translate(5, 5);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.lineJoin = 'miter';
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(10, 0);
      ctx.lineTo(22, 12);
      ctx.lineTo(12, 22);
      ctx.closePath();
      ctx.stroke();

      // Sleeve
      ctx.beginPath();
      ctx.moveTo(5, 5);
      ctx.lineTo(17, 17);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Shading
      ctx.fillStyle = 'rgba(51, 51, 51, 0.1)';
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(3, 7);
      ctx.lineTo(15, 19);
      ctx.lineTo(12, 22);
      ctx.fill();
    } else if (type === 'fitToView') {
      ctx.translate(4, 4);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const s = 24;
      const corner = 6;
      const arrow = 3;

      ctx.beginPath();
      ctx.moveTo(corner, 0);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, corner);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(arrow, arrow);
      ctx.lineTo(0, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(s - corner, 0);
      ctx.lineTo(s, 0);
      ctx.lineTo(s, corner);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(s - arrow, arrow);
      ctx.lineTo(s, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, s - corner);
      ctx.lineTo(0, s);
      ctx.lineTo(corner, s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(arrow, s - arrow);
      ctx.lineTo(0, s);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(s, s - corner);
      ctx.lineTo(s, s);
      ctx.lineTo(s - corner, s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(s - arrow, s - arrow);
      ctx.lineTo(s, s);
      ctx.stroke();

      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1;
      const inset = 8;
      ctx.strokeRect(inset, inset, s - inset * 2, s - inset * 2);
    } else {
      drawComponent(
        ctx,
        { id: 'icon', x: 0, y: 0, type: type as ComponentType },
        size
      );
    }

  }, [type]);

  return <canvas ref={canvasRef} />;
};

export default ToolbarIcon;
