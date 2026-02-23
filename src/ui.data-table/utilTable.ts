import type { Column, ColumnObject, FlatRow, Row, RowData, RowId } from "./types";

export function normalizeColumns(columns: Column[]): ColumnObject[] {
  return columns.map((column) =>
    typeof column === "string" ? { label: column, key: column } : column,
  );
}

export function mapRowColumns(row: Row, columns: ColumnObject[]): RowData {
  const visibleKeys = new Set(columns.filter((col) => col.isShown !== false).map((col) => col.key));

  const result: RowData = {};

  for (const key of Object.keys(row)) {
    if (visibleKeys.has(key)) {
      result[key] = row[key];
    }
  }

  return result;
}

export function getFlatRows(tableRows: Row[]) {
  const rows: FlatRow[] = [];

  function addRow(row: Row, nestedLevel: number, parentRowId?: string | number) {
    const flatRow: FlatRow = {
      ...row,
      nestedLevel,
      ...(parentRowId !== undefined ? { parentRowId } : {}),
    };

    rows.push(flatRow);

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
