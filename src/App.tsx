import CanvasGrid from '@/components/CanvasGrid/CanvasGrid';
import Toolbar from '@/components/Toolbar/Toolbar';
import { usePreventBrowserZoom } from '@/hooks/utils/usePreventBrowserZoom';
import { useKeyboardShortcuts } from '@/hooks/utils/useKeyboardShortcuts';
import { useGridInteraction } from '@/hooks/grid/useGridInteraction';
import { useGridDimensions } from '@/hooks/grid/useGridDimensions';
import { useViewControls } from '@/hooks/canvas/useViewControls';
import './App.css';

const App = () => {
  usePreventBrowserZoom();
  const { rows, cols, setRows, setCols } = useGridDimensions(10, 10);
  const { fitToView, onFitToViewReady } = useViewControls();

  const { items,
    activeTool,
    setActiveTool,
    handleGridClick,
    handleGridMouseDown,
    handleGridMouseMove,
    handleGridMouseUp
  } = useGridInteraction({ rows, cols });

  useKeyboardShortcuts(setActiveTool);

  return (
    <div className="app-container">
      <CanvasGrid
        rows={rows}
        cols={cols}
        items={items}
        onGridClick={handleGridClick}
        onGridMouseDown={handleGridMouseDown}
        onGridMouseMove={handleGridMouseMove}
        onGridMouseUp={handleGridMouseUp}
        onFitToViewReady={onFitToViewReady}
      />
      <Toolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        rows={rows}
        cols={cols}
        onRowsChange={setRows}
        onColsChange={setCols}
        onFitToView={fitToView}
      />
    </div>
  );
};

export default App;
