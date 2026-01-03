import { useCallback, useState } from 'react';

export interface ViewControlHandlers {
  fitToView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const useViewControls = () => {
  const [handlers, setHandlers] = useState<ViewControlHandlers | null>(null);
  const [zoom, setZoom] = useState(1);

  const onViewControlsReady = useCallback((newHandlers: ViewControlHandlers) => {
    setHandlers(newHandlers);
  }, []);

  const onZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  const fitToView = useCallback(() => {
    handlers?.fitToView();
  }, [handlers]);

  const zoomIn = useCallback(() => {
    handlers?.zoomIn();
  }, [handlers]);

  const zoomOut = useCallback(() => {
    handlers?.zoomOut();
  }, [handlers]);

  return {
    zoom,
    fitToView,
    zoomIn,
    zoomOut,
    onViewControlsReady,
    onZoomChange,
  };
};
