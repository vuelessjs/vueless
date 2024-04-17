export default class TableService {
  static normalizeColumns(columns) {
    return columns.map((column) => (typeof column === "string" ? { label: column } : column));
  }

  static getFilteredRow(row, columns) {
    const filteredRow = Object.entries(row).filter((item) => {
      const isShownColumn = columns.some((column) => column.key === item[0]);

      if (isShownColumn) return item;
    });

    return Object.fromEntries(filteredRow);
  }
}
