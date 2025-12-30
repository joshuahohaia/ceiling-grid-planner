export const COLOURS = {
  ui: {
    text: '#444',
    outline: '#333',
  },
  activeGrid: {
    background: '#E7E8DB',
    lines: '#D2D1C5',
  },
  contextGrid: {
    background: '#EEEFE6',
    lines: '#D2D1C5',
  },
  components: {
    light: '#E8B684',
    airSupply: '#58D4C9',
    airReturn: '#CD9FEE',
    smokeDetector: '#D86964',
    invalid: '#D2D1C5',
  }
} as const;

export const DIMENSIONS = {
  cellSize: 40,
  realSize: 0.6,
} as const;
