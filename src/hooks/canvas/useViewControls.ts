import { useCallback, useState } from 'react';

export const useViewControls = () => {
  const [fitToViewFn, setFitToViewFn] = useState<(() => void) | null>(null);

  const handleFitToViewReady = useCallback((fn: () => void) => {
    setFitToViewFn(() => fn);
  }, []);

  const fitToView = useCallback(() => {
    if (fitToViewFn) {
      fitToViewFn();
    }
  }, [fitToViewFn]);

  return {
    fitToView,
    onFitToViewReady: handleFitToViewReady,
  };
};
