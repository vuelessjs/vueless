export function normalizeColumns(columns) {
  return columns.map((column) => (typeof column === "string" ? { label: column } : column));
}

export function getFilteredRow(row, columns) {
  const filteredRow = Object.entries(row).filter((item) => {
    const isShownColumn = columns.some((column) => column.key === item[0]);

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
  if (row.id === targetRowId) row.isHidden = !row.isHidden;

  if (row.row) {
    toggleRowVisibility(row.row, targetRowId);
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

    if (row.row) {
      addRow(row.row);
    }
  }

  tableRows.forEach((row) => addRow(row));

  return rows;
}
