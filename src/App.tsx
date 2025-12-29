import React from 'react';
import CanvasGrid from '@/components/CanvasGrid';
import Toolbar from '@/components/Toolbar';
import { usePreventBrowserZoom } from '@/hooks/usePreventBrowserZoom';
import './App.css';

const App: React.FC = () => {
  usePreventBrowserZoom();

  return (
    <div className="app-container">
      <CanvasGrid rows={10} cols={10} />
      <Toolbar />
    </div>
  );
};

export default App;
