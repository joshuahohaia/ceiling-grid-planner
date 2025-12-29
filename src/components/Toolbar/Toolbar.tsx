import React from 'react';
import { ToolType } from '@/types/grid';
import { TOOLS } from '@/constants/tools';
import ToolbarIcon from './ToolbarIcon';
import './Toolbar.css';

interface ToolbarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ activeTool, onToolChange }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => onToolChange(tool.id)}
            title={tool.label}
          >
            <ToolbarIcon type={tool.id} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
