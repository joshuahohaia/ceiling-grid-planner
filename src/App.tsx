import CanvasGrid from '@/components/CanvasGrid/CanvasGrid';
import Toolbar from '@/components/Toolbar/Toolbar';
import { usePreventBrowserZoom } from '@/hooks/usePreventBrowserZoom';
import { useGridInteraction } from '@/hooks/useGridInteraction';
import './App.css';

const App = () => {
  usePreventBrowserZoom();
  const { items, activeTool, setActiveTool, handleGridClick } = useGridInteraction();

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
