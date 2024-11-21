import { getRandomId } from "../utils/ui.ts";

import type { Column, ColumnObject, Row, RowData, RowId } from "./types.ts";

export function normalizeColumns(columns: Column[]): ColumnObject[] {
  return columns.map((column) =>
    typeof column === "string" ? { label: column, key: column } : column,
  );
}

export function mapRowColumns(row: Row, columns: ColumnObject[]): RowData {
  const filteredRow = Object.entries(row).filter((item) => {
    return columns.some((column) => column.key === item[0] && !column.isHidden);
  });

  return Object.fromEntries(filteredRow) as RowData;
}

export function syncRowCheck(row: Row, selectedRows: RowId[]) {
  row.isChecked = selectedRows.map((rowId) => String(rowId)).includes(String(row.id));

  if (row.row && !Array.isArray(row.row)) {
    row.row = syncRowCheck(row.row, selectedRows);
  }

  return row;
}

export function addRowId(row: Row) {
  const hasRowId = typeof row.id !== "undefined" && row.id !== null && row.id !== "";

  row.id = hasRowId ? row.id : getRandomId();

  if (row.row && !Array.isArray(row.row)) {
    row.row = addRowId(row.row);
  }

  if (row.row && Array.isArray(row.row)) {
    row.row = row.row.map((nestedRow) => addRowId(nestedRow));
  }

  return row;
}

export function toggleRowVisibility(row: Row, targetRowId: string | number) {
  if (row.id === targetRowId) {
    if (row.hasOwnProperty("isHidden")) {
      row.isHidden = !row.isHidden;
    } else if (row.nestedData && row.nestedData.hasOwnProperty("isHidden")) {
      row.nestedData.isHidden = !row.nestedData.isHidden;
    }

    return row;
  }

  if (row.row && !Array.isArray(row.row)) {
    toggleRowVisibility(row.row, targetRowId);
  }

  if (row.row && Array.isArray(row.row)) {
    row.row.forEach((nestedRow) => toggleRowVisibility(nestedRow, targetRowId));
  }

  if (row.nestedData) {
    toggleRowVisibility(row.nestedData, targetRowId);
  }

  return row;
}

export function switchRowCheck(row: Row, isChecked: boolean) {
  row.isChecked = isChecked;

  if (row.row && !Array.isArray(row.row)) {
    switchRowCheck(row.row, isChecked);
  }

  if (row.row && Array.isArray(row.row)) {
    row.row.map((currentRow) => switchRowCheck(currentRow, isChecked));
  }

  return row;
}

export function getFlatRows(tableRows: Row[]) {
  const rows: Row[] = [];

  function addRow(row: Row) {
    rows.push(row);

    if (row.row && !Array.isArray(row.row)) {
      addRow(row.row);
    }

    if (row.row && Array.isArray(row.row)) {
      row.row.forEach(addRow);
    }
  }

  tableRows.forEach((row) => addRow(row));

  return rows;
}
