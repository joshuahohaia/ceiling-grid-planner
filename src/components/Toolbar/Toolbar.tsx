import { ToolType } from '@/types/grid';
import { TOOLS } from '@/constants/tools';
import ToolbarIcon from './ToolbarIcon';
import './Toolbar.css';

interface ToolbarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  rows: number;
  cols: number;
  onRowsChange: (rows: number) => void;
  onColsChange: (cols: number) => void;
  onFitToView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  zoom: number;
}

const Toolbar = ({ activeTool, onToolChange, rows, cols, onRowsChange, onColsChange, onFitToView, onZoomIn, onZoomOut, zoom }: ToolbarProps) => {
  const zoomPercent = Math.round(zoom * 100);
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => onToolChange(tool.id)}
            title={`${tool.label} (${tool.shortcut})`}
          >
            <ToolbarIcon type={tool.id} />
          </button>
        ))}
      </div>
      
      <div className="toolbar-divider" />

      <div className="toolbar-group view-controls">
        <button
          className="tool-btn"
          onClick={onZoomOut}
          title="Zoom Out"
        >
          <ToolbarIcon type="zoomOut" />
        </button>
        <span className="zoom-indicator">{zoomPercent}%</span>
        <button
          className="tool-btn"
          onClick={onZoomIn}
          title="Zoom In"
        >
          <ToolbarIcon type="zoomIn" />
        </button>
        <button
          className="tool-btn"
          onClick={onFitToView}
          title="Fit to View"
        >
          <ToolbarIcon type="fitToView" />
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group grid-controls">
        <div className="input-group">
          <label>W:</label>
          <input 
            type="number" 
            value={cols} 
            onChange={(e) => onColsChange(parseInt(e.target.value) || 1)}
            min="1"
          />
        </div>
        <div className="input-group">
          <label>H:</label>
          <input 
            type="number" 
            value={rows} 
            onChange={(e) => onRowsChange(parseInt(e.target.value) || 1)}
            min="1"
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
