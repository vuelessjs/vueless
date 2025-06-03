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

export function getRowChildrenIds(row: Row): RowId[] {
  if (!row || !row.row) return [];

  const ids: RowId[] = [];

  function addId(row: Row) {
    if (row.hasOwnProperty("row") && Array.isArray(row.row)) {
      row.row.forEach((nestedRow) => {
        ids.push(nestedRow.id);

        addId(nestedRow);
      });
    }

    if (row.hasOwnProperty("row") && !Array.isArray(row.row)) {
      ids.push(row.row!.id);

      addId(row.row as Row);
    }
  }

  addId(row);

  return ids;
}
