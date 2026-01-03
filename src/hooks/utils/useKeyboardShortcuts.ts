import { useEffect } from 'react';
import { ToolType } from '@/types/grid';
import { TOOLS } from '@/constants/tools';

const KEY_TO_INDEX: Record<string, number> = {
  '1': 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
};

export const useKeyboardShortcuts = (onToolChange: (tool: ToolType) => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const index = KEY_TO_INDEX[e.key];
      if (index !== undefined && index < TOOLS.length) {
        onToolChange(TOOLS[index].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToolChange]);
};
