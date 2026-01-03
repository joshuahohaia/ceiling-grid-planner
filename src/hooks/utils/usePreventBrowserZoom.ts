import { useEffect } from 'react';

export const usePreventBrowserZoom = () => {
  useEffect(() => {
    const preventDefault = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    // Passive: false is required to preventDefault zoom on wheel events
    document.body.addEventListener('wheel', preventDefault, { passive: false });

    return () => {
      document.body.removeEventListener('wheel', preventDefault);
    };
  }, []);
};
