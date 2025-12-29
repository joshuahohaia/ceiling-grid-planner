export type ComponentType = 
  | "light" 
  | "airSupply" 
  | "airReturn" 
  | "smokeDetector" 
  | "invalid";

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
