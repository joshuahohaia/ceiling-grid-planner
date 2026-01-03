import { ToolType } from '@/types/grid';

export interface ToolDefinition {
  id: ToolType;
  label: string;
  shortcut: string;
}

export const TOOLS: ToolDefinition[] = [
  { id: 'cursor', label: 'Select / Pan', shortcut: '1' },
  { id: 'eraser', label: 'Remove', shortcut: '2' },
  { id: 'light', label: 'Light', shortcut: '3' },
  { id: 'airSupply', label: 'Air Supply', shortcut: '4' },
  { id: 'airReturn', label: 'Air Return', shortcut: '5' },
  { id: 'smokeDetector', label: 'Smoke Detector', shortcut: '6' },
  { id: 'invalid', label: 'Invalid Area', shortcut: '7' },
];
