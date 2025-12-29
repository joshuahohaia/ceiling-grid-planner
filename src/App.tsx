import React from 'react';
import CanvasGrid from '@/components/CanvasGrid';
import Toolbar from '@/components/Toolbar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <CanvasGrid />
      <Toolbar />
    </div>
  );
};

export default App;
