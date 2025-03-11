import { getRandomId } from "../utils/helper.ts";

import type { Column, ColumnObject, FlatRow, Row, RowData, RowId } from "./types.ts";

export function normalizeColumns(columns: Column[]): ColumnObject[] {
  return columns.map((column) =>
    typeof column === "string" ? { label: column, key: column } : column,
  );
}

export function mapRowColumns(row: Row, columns: ColumnObject[]): RowData {
  const filteredRow = Object.entries(row).filter((item) => {
    return columns.some((column) => column.key === item[0] && column.isShown !== false);
  });

  return Object.fromEntries(filteredRow) as RowData;
}

export function syncRowCheck(row: Row, selectedRows: RowId[]) {
  row.isChecked = selectedRows.map((rowId) => String(rowId)).includes(String(row.id));

  if (row.row && !Array.isArray(row.row)) {
    row.row = syncRowCheck(row.row, selectedRows);
  }

  if (row.row && Array.isArray(row.row)) {
    row.row = row.row.map((nestedRow) => syncRowCheck(nestedRow, selectedRows));
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

export function toggleRowVisibility(row: Row, targetRowId: string | number): Row {
  if (row.id === targetRowId) {
    if (row.hasOwnProperty("isShown")) {
      row.isShown = !row.isShown;

      if (!row.isShown) {
        setNestedRowsHidden(row);
      }
    }

    return row;
  }

  if (row.row && Array.isArray(row.row)) {
    row.row.forEach((nestedRow) => toggleRowVisibility(nestedRow, targetRowId));
  } else if (row.row && !Array.isArray(row.row)) {
    toggleRowVisibility(row.row, targetRowId);
  }

  if (row.nestedData) {
    toggleRowVisibility(row.nestedData, targetRowId);
  }

  return row;
}

function setNestedRowsHidden(row: Row) {
  if (row.hasOwnProperty("isShown")) {
    row.isShown = false;
  }

  if (row.row) {
    if (Array.isArray(row.row)) {
      row.row.forEach(setNestedRowsHidden);
    } else {
      setNestedRowsHidden(row.row);
    }
  }

  if (row.nestedData) {
    setNestedRowsHidden(row.nestedData);
  }
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
  const rows: FlatRow[] = [];

  function addRow(row: Row, nestedLevel: number, parentRowId?: string | number) {
    if (parentRowId) {
      row.parentRowId = parentRowId;
    }

    row.nestedLevel = nestedLevel;

    rows.push(row as FlatRow);

    if (row.row && !Array.isArray(row.row)) {
      addRow(row.row, nestedLevel + 1, row.id);
    }

    if (row.row && Array.isArray(row.row)) {
      row.row.forEach((nestedRow) => addRow(nestedRow, nestedLevel + 1, row.id));
    }
  }

  tableRows.forEach((row) => addRow(row, 0));

  return rows;
}
