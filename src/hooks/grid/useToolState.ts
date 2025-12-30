import { useState, useCallback } from 'react';
import { ToolType, ComponentType } from '@/types/grid';

export const useToolState = (initialTool: ToolType = 'cursor') => {
  const [activeTool, setActiveTool] = useState<ToolType>(initialTool);

  const isComponentTool = useCallback((tool: ToolType): tool is ComponentType => {
    return tool !== 'cursor' && tool !== 'eraser';
  }, []);

  return {
    activeTool,
    setActiveTool,
    isComponentTool,
  };
};
