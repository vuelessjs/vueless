import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { ComponentConfig, UnknownObject } from "../types.ts";

export type Config = typeof defaultConfig;

type RowKeys = number | string | boolean | undefined | Date | Row | Row[] | ((row: Row) => string);

export interface CellObject {
  contentClasses?: string | ((value: unknown | string, row: Row) => string);
  class?: string | ((value: unknown | string, row: Row) => string);
  [key: string]: unknown | string;
}

export type RowId = string | number;
export type Cell = CellObject | string;

export interface RowData {
  [key: string]: Cell;
}

export interface DateDivider {
  date: Date | string;
  label?: string;
}

export interface Row {
  id: RowId;
  isChecked?: boolean;
  isShown?: boolean;
  rowDate?: string | Date;
  row?: Row | Row[];
  nestedData?: Row;
  class?: string | ((row: Row) => string);
  [key: string]: Cell | RowKeys;
}

export interface ColumnObject {
  key: string;
  label?: string;
  isShown?: boolean;
  class?: string | ((value: unknown | string, row: Row) => string);
  tdClass?: string;
  thClass?: string;
}

export type Column = ColumnObject | string;

export interface RowScopedProps {
  value: unknown | string | number;
  row: Row;
}

export interface RowScopedExpandProps {
  isExpanded: boolean;
  row: Row;
}

export interface UTableProps {
  /**
   * Table columns (headers).
   */
  columns: Column[];

  /**
   * Table rows data.
   */
  rows: Row[];

  /**
   * Label to display for empty cell values.
   */
  emptyCellLabel?: string;

  /**
   * Show date divider line between dates.
   */
  dateDivider?: boolean | DateDivider[];

  /**
   * Allow rows selecting.
   */
  selectable?: boolean;

  /**
   * Makes the table compact (fewer spacings).
   */
  compact?: boolean;

  /**
   * Set header sticky.
   */
  stickyHeader?: boolean;

  /**
   * Set footer sticky.
   */
  stickyFooter?: boolean;

  /**
   * Set table loader state.
   */
  loading?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}

export interface UTableRowAttrs {
  bodyCellContentAttrs: Ref<UnknownObject>;
  bodyCellCheckboxAttrs: Ref<UnknownObject>;
  bodyCheckboxAttrs: Ref<UnknownObject>;
  bodyCellNestedAttrs: Ref<UnknownObject>;
  bodyCellNestedExpandIconAttrs: Ref<UnknownObject>;
  bodyCellNestedCollapseIconAttrs: Ref<UnknownObject>;
  bodyCellBaseAttrs: Ref<UnknownObject>;
  bodyCellNestedExpandIconWrapperAttrs: Ref<UnknownObject>;
  bodyRowCheckedAttrs: Ref<UnknownObject>;
  bodyRowAttrs: Ref<UnknownObject>;
}

export interface UTableRowProps {
  row: Row;
  columns: ColumnObject[];
  emptyCellLabel?: string;
  selectable: boolean;
  nestedLevel: number;
  dataTest: string;
  attrs: UTableRowAttrs;
  config: Config;
}
