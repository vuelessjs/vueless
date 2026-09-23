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

export interface BaseDateDivider {
  date: Date | string;
  label?: string;
  config?: ComponentConfig<UDividerConfig>;
}

/* Any object shape is a valid divider, only reserved divider keys are type checked. */
export type DateDivider = BaseDateDivider & (object | UnknownObject);

export interface BaseRow {
  id: RowId;
  rowDate?: string | Date;
  row?: TableRow | TableRow[];
  class?: string | ((row: Row) => string);
}

export interface Row extends BaseRow {
  row?: Row | Row[];
  [key: string]: unknown;
}

/* Any object shape is a valid row, only reserved row keys are type checked. */
export type TableRow = BaseRow & (object | UnknownObject);

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

/* Any object shape is a valid column, only reserved column keys are type checked. */
export type TableColumn = ColumnObject & (object | UnknownObject);

export type Column = TableColumn | string;

/* A column entry that keeps its key literal, so slot keys can be narrowed at the call site. */
export type KeyedColumn<TCol extends string> = TCol | (TableColumn & { key: TCol });

export interface Props<TRow extends TableRow = TableRow, TCol extends string = string> {
  /**
   * Table columns (headers).
   * `readonly` so `as const` column lists keep their literal keys and narrow the cell slot names.
   */
  columns: readonly KeyedColumn<TCol>[];

  /**
   * Table rows data.
   */
  rows: TRow[];

  /**
   * Selected rows.
   */
  selectedRows?: TRow[];

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
   * Show skeleton body for the first table load instead of the regular loader.
   */
  skeletonLoading?: boolean;

  /**
   * Number of skeleton rows shown during initial loading.
   */
  skeletonRows?: number;

  /**
   * Skeleton cell width classes used to vary the loading placeholder layout.
   */
  skeletonWidths?: string[];

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

/* Drops `Row`'s `[key: string]: unknown` so slot rows only expose statically known keys. */
type KnownKeys<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

/**
 * Row shape exposed to slots: the caller's row plus the flattening metadata.
 *
 * `TRow`'s own keys are optional. Rows are flattened through `getFlatRows`, which recurses into
 * `row.row` — and `BaseRow.row` is `TableRow | TableRow[]`, not `TRow`, so a nested child need not
 * carry the parent's members. Every row slot (`cell-*`, `expand`, `nested-row`) receives those
 * children verbatim; `nested-row` receives nothing else. `BaseRow`/`FlatRow` metadata
 * (`id`, `nestedLevel`, …) is always set by the flattener, so it stays guaranteed.
 */
export type SlotRow<TRow extends TableRow = TableRow> = Partial<KnownKeys<TRow>> &
  KnownKeys<FlatRow>;

/* Selected rows carry the same guarantee: select-all flattens nested children into the selection. */
export type SelectedSlotRow<TRow extends TableRow = TableRow> = SlotRow<TRow>;

export interface UTableStaticSlots<TRow extends TableRow = TableRow> {
  "header-counter"?: (props: { total: number }) => unknown;
  "header-actions"?: (props: { selectedRows: SelectedSlotRow<TRow>[] }) => unknown;
  "before-header"?: (props: { colsCount: number; classes?: string }) => unknown;
  "after-last-row"?: (props: { colsCount: number; classes?: string }) => unknown;
  "before-first-row"?: () => unknown;
  "empty-state"?: () => unknown;
  footer?: (props: { colsCount: number }) => unknown;
  expand?: (props: { index: number; row: SlotRow<TRow>; expanded: boolean }) => unknown;
  "nested-row"?: (props: { index: number; row: SlotRow<TRow>; nestedLevel: number }) => unknown;
}

/**
 * Slot key suffix. Narrows to the literal column keys only when they are statically known —
 * `columns` from a `ref`, an API, or a plain `string[]` widens `TCol` back to `string`, and an
 * empty `columns` array infers `TCol` as `never`. Both mean "not statically known", so every
 * `cell-*` / `header-*` slot must keep compiling.
 *
 * The `[TCol]` tuple wrapper is required: a naked `never` distributes to `never`, which would
 * silently collapse the whole mapped type and reject every slot.
 */
type SlotKeySuffix<TCol extends string> = [TCol] extends [never]
  ? string
  : string extends TCol
    ? string
    : TCol;

export type UTableDynamicSlots<TRow extends TableRow = TableRow, TCol extends string = string> = {
  [K in `cell-${SlotKeySuffix<TCol>}`]?: (props: {
    value: Cell;
    row: SlotRow<TRow>;
    index: number;
    cellIndex: number;
  }) => unknown;
} & {
  [K in `header-${SlotKeySuffix<TCol>}`]?: (props: {
    column: ColumnObject;
    index: number;
  }) => unknown;
};

export type UTableSlots<
  TRow extends TableRow = TableRow,
  TCol extends string = string,
> = UTableStaticSlots<TRow> & UTableDynamicSlots<TRow, TCol>;

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
  isVisible: boolean;
  columnPositions: Map<string, number>;
  search?: string;
  searchMatchColumns?: Set<string>;
  activeSearchMatchColumn?: string;
  textEllipsis?: boolean;
  onToggleExpand?: (row: Row) => void;
  onToggleCheckbox?: (row: Row) => void;
}
