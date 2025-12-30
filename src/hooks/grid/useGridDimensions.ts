import { useState, useCallback } from 'react';

export const useGridDimensions = (initialRows = 10, initialCols = 10) => {
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);

  const updateRows = useCallback((newRows: number) => {
    setRows(Math.max(1, newRows));
  }, []);

  const updateCols = useCallback((newCols: number) => {
    setCols(Math.max(1, newCols));
  }, []);

  return { 
    rows, 
    cols, 
    setRows: updateRows, 
    setCols: updateCols 
  };
};
