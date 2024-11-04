import { getRandomId } from "../utils/ui.ts";

export function normalizeColumns(columns) {
  return columns.map((column) => (typeof column === "string" ? { label: column } : column));
}

export function getFilteredRow(row, columns) {
  const filteredRow = Object.entries(row).filter((item) => {
    const isShownColumn = columns.some((column) => column.key === item[0] && !column.isHidden);

    if (isShownColumn) return item;
  });

  return Object.fromEntries(filteredRow);
}

export function syncRowCheck(row, selectedRows) {
  row.isChecked = selectedRows.includes(row.id);

  if (row.row && !Array.isArray(row.row)) {
    row.row = syncRowCheck(row.row, selectedRows);
  }

  return row;
}

export function addRowId(row) {
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

export function toggleRowVisibility(row, targetRowId) {
  if (row.id === targetRowId) {
    if (Object.hasOwn(row, "isHidden")) {
      row.isHidden = !row.isHidden;
    } else if (row.nestedData && Object.hasOwn(row.nestedData, "isHidden")) {
      row.nestedData.isHidden = !row.nestedData.isHidden;
    }

    return;
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
}

export function switchRowCheck(row, isChecked) {
  row.isChecked = isChecked;

  if (row.row) {
    switchRowCheck(row.row, isChecked);
  }
}

export function getFlatRows(tableRows) {
  const rows = [];

  function addRow(row) {
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
