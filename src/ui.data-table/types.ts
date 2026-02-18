import defaultConfig from "./config";

import type { Ref } from "vue";
import type { ComponentConfig, UnknownObject } from "../types";
import type { Config as UDividerConfig } from "../ui.container-divider/types";

export type Config = typeof defaultConfig;

export interface CellObject {
  contentClass?: string | ((value: unknown | string, row: Row) => string);
  class?: string | ((value: unknown | string, row: Row) => string);
  [key: string]: unknown;
}

export type RowId = string | number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Cell = CellObject & any;

export interface SearchMatch {
  rowId: RowId;
  columnKey: string;
  indices: number[];
}

export interface RowData {
  [key: string]: Cell;
}

export interface DateDivider {
  date: Date | string;
  label?: string;
  config?: ComponentConfig<UDividerConfig>;
}

export interface Row {
  id: RowId;
  rowDate?: string | Date;
  row?: Row | Row[];
  class?: string | ((row: Row) => string);
  [key: string]: unknown;
}

export interface FlatRow extends Row {
  parentRowId?: RowId;
  nestedLevel: number;
}
export enum StickySide {
  Left = "left",
  Right = "right",
}

export interface ColumnObject {
  key: string;
  label?: string;
  isShown?: boolean;
  sticky?: "left" | "right";
  class?: string | ((value: unknown | string, row: Row) => string);
  tdClass?: string;
  thClass?: string;
}

export type Column = ColumnObject | string;

export interface Props {
  /**
   * Table columns (headers).
   */
  columns: Column[];

  /**
   * Table rows data.
   */
  rows: Row[];

  /**
   * Selected rows.
   */
  selectedRows?: Row[];

  /**
   * Selected rows id.
   */
  expandedRows?: RowId[];

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
   * Enable virtual scrolling for large datasets.
   */
  virtualScroll?: boolean;

  /**
   * Fixed row height in pixels (used for virtual scroll calculations).
   */
  rowHeight?: number;

  /**
   * Height of the scroll container (CSS value).
   */
  scrollHeight?: string;

  /**
   * Number of extra rows to render above/below viewport.
   */
  bufferSize?: number;

  /**
   * Search string to highlight in table cells.
   */
  search?: string;

  /**
   * Index of the current search match to highlight (0-based).
   */
  searchMatch?: number;

  /**
   * Enable text ellipsis for table cells (renders div wrapper for overflow handling).
   */
  textEllipsis?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}

export interface UTableRowAttrs {
  bodyCellContentAttrs: Ref<UnknownObject>;
  bodyCellCheckboxAttrs: Ref<UnknownObject>;
  bodyCheckboxAttrs: Ref<UnknownObject>;
  bodyCellNestedAttrs: Ref<UnknownObject>;
  bodyCellNestedExpandIconAttrs: Ref<UnknownObject>;
  bodyCellNestedCollapseIconAttrs: Ref<UnknownObject>;
  bodyCellBaseAttrs: Ref<UnknownObject>;
  bodyCellNestedIconWrapperAttrs: Ref<UnknownObject>;
  bodyRowCheckedAttrs: Ref<UnknownObject>;
  bodyRowAttrs: Ref<UnknownObject>;
  bodyCellStickyLeftAttrs: Ref<UnknownObject>;
  bodyCellStickyRightAttrs: Ref<UnknownObject>;
  bodyCellSearchMatchAttrs: Ref<UnknownObject>;
  bodyCellSearchMatchTextAttrs: Ref<UnknownObject>;
  bodyCellSearchMatchActiveAttrs: Ref<UnknownObject>;
  bodyCellSearchMatchTextActiveAttrs: Ref<UnknownObject>;
}

export interface UTableRowProps {
  row: FlatRow;
  columns: ColumnObject[];
  /**
   * Row index in the parent table (used for slot params).
   * Optional to keep UTableRow mountable standalone in tests/internal usage.
   */
  rowIndex?: number;
  emptyCellLabel?: string;
  selectable: boolean;
  nestedLevel: number;
  dataTest: string | null;
  attrs: UTableRowAttrs;
  colsCount: number;
  config: Config;
  isChecked: boolean;
  isExpanded: boolean;
  columnPositions: Map<string, number>;
  search?: string;
  searchMatchColumns?: Set<string>;
  activeSearchMatchColumn?: string;
  textEllipsis?: boolean;
  onToggleExpand?: (row: Row) => void;
  onToggleCheckbox?: (row: Row) => void;
}
