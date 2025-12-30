import CanvasGrid from '@/components/CanvasGrid/CanvasGrid';
import Toolbar from '@/components/Toolbar/Toolbar';
import { usePreventBrowserZoom } from '@/hooks/utils/usePreventBrowserZoom';
import { useGridInteraction } from '@/hooks/grid/useGridInteraction';
import './App.css';

const ROWS = 10;
const COLS = 10;

const App = () => {
  usePreventBrowserZoom();
  const { 
    items, 
    activeTool, 
    setActiveTool, 
    handleGridClick,
    handleGridMouseDown,
    handleGridMouseMove,
    handleGridMouseUp 
  } = useGridInteraction({ rows: ROWS, cols: COLS });

  return (
    <div className="app-container">
      <CanvasGrid
        rows={ROWS}
        cols={COLS}
        items={items}
        onGridClick={handleGridClick}
        onGridMouseDown={handleGridMouseDown}
        onGridMouseMove={handleGridMouseMove}
        onGridMouseUp={handleGridMouseUp}
      />
      <Toolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
      />
    </div>
  );
};

export default App;
