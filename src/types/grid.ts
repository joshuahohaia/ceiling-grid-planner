export type ComponentType = 
  | "light" 
  | "airSupply" 
  | "airReturn" 
  | "smokeDetector" 
  | "invalid";

export type ToolType = ComponentType | 'cursor' | 'eraser';

export interface GridItem {
  id: string;
  x: number;
  y: number;
  type: ComponentType;
}

export interface GridDimensions {
  rows: number;
  cols: number;
}
