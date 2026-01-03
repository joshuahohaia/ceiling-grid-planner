import { useEffect, useRef } from 'react';

interface InitialFitToViewProps {
  context: CanvasRenderingContext2D | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cols: number;
  rows: number;
  fitToView: (containerWidth: number, containerHeight: number, cols: number, rows: number) => void;
}

export const useInitialFitToView = ({
  context,
  containerRef,
  cols,
  rows,
  fitToView,
}: InitialFitToViewProps) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (context && containerRef.current && !initializedRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      fitToView(width, height, cols, rows);
      initializedRef.current = true;
    }
  }, [context, containerRef, cols, rows, fitToView]);
};
