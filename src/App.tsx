import { useState } from 'react';
import CanvasGrid from '@/components/CanvasGrid/CanvasGrid';
import Toolbar from '@/components/Toolbar/Toolbar';
import { usePreventBrowserZoom } from '@/hooks/usePreventBrowserZoom';
import { GridItem, ToolType } from '@/types/grid';
import './App.css';

const App = () => {
  usePreventBrowserZoom();
  const [items, setItems] = useState<GridItem[]>([]);
  const [activeTool, setActiveTool] = useState<ToolType>('cursor');

  const handleGridClick = (x: number, y: number) => {
    if (activeTool === 'cursor') return;

    const existingItemIndex = items.findIndex(item => item.x === x && item.y === y);

    if (activeTool === 'eraser') {
      if (existingItemIndex !== -1) {
        const newItems = [...items];
        newItems.splice(existingItemIndex, 1);
        setItems(newItems);
      }
      return;
    }

    if (existingItemIndex !== -1) {
      console.log('Cell occupied!');
      return;
    }

    const newItem: GridItem = {
      id: crypto.randomUUID(),
      x,
      y,
      type: activeTool,
    };

    setItems([...items, newItem]);
  };

  return (
    <div className="app-container">
      <CanvasGrid
        rows={10}
        cols={10}
        items={items}
        onGridClick={handleGridClick}
      />
      <Toolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
      />
    </div>
  );
};

export default App;
