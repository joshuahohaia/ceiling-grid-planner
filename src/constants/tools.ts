import { ToolType } from '@/types/grid';

export interface ToolDefinition {
  id: ToolType;
  label: string;
}

export const TOOLS: ToolDefinition[] = [
  { id: 'cursor', label: 'Select / Pan' },
  { id: 'eraser', label: 'Remove' },
  { id: 'light', label: 'Light' },
  { id: 'airSupply', label: 'Air Supply' },
  { id: 'airReturn', label: 'Air Return' },
  { id: 'smokeDetector', label: 'Smoke Detector' },
  { id: 'invalid', label: 'Invalid Area' },
];
