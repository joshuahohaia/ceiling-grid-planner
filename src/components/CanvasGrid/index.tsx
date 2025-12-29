import { useEffect, useRef } from 'react';
import './CanvasGrid.css';
import { GridSettings } from '@/types/grid';
import { COLOURS, DIMENSIONS } from '@/constants/design';

const CanvasGrid = ({ numRows = 10, numColumns = 10 }: GridSettings) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cellSize = DIMENSIONS.cellSize;
      const gridWidth = numColumns * cellSize;
      const gridHeight = numRows * cellSize;

      ctx.fillStyle = COLOURS.activeGrid.background;
      ctx.fillRect(0, 0, gridWidth, gridHeight);
    };

    window.addEventListener('resize', draw);
    draw();

    return () => window.removeEventListener('resize', draw);
  }, [numRows, numColumns]);

  return (
    <div ref={containerRef} className="canvas-container">
      <canvas ref={canvasRef} className="canvas-element" />
    </div>
  );
};

export default CanvasGrid;
