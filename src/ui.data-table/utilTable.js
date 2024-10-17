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

  if (row.row) {
    row.row = syncRowCheck(row.row, selectedRows);
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

export function rowsHasId(rows) {
  const ids = new Set();
  let totalRows = 0;

  function addId(row) {
    totalRows++;

    if (typeof row.id !== "undefined") {
      ids.add(row.id);
    }

    if (row.row && !Array.isArray(row.row)) {
      addId(row.row);
    }

    if (row.row && Array.isArray(row.row)) {
      row.row.forEach(addId);
    }
  }

  rows.forEach((row) => addId(row));

  return ids.size === totalRows;
}
