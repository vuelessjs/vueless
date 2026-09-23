import defaultConfig from "./config";

import DraggableContext from "vuedraggable";

import type { ComponentConfig, UnknownObject } from "../types";

export type Config = typeof defaultConfig;

export interface DragMoveEvent extends DragEvent {
  draggedContext: typeof DraggableContext;
  relatedContext: typeof DraggableContext | null;
}

export interface BaseDataListItem {
  crossed?: boolean;
  actions?: boolean;
  children?: DataListItem[];
}

/* Any object shape is a valid item, only reserved item keys are type checked. */
export type DataListItem = BaseDataListItem & (object | UnknownObject);

/* Drops `DataListItem`'s index signature so slot items only expose statically known keys. */
type KnownKeys<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

/**
 * Item shape exposed to slots: the caller's item plus the reserved item keys.
 *
 * `TItem`'s own keys are optional. The component renders itself for nested children
 * (`:list="element.children"`), and `BaseDataListItem.children` is `DataListItem[]`, not `TItem[]`
 * — so a child need not carry the parent's members. `nestedKey` can open a nested list from a
 * different source entirely. `BaseDataListItem`'s keys are optional already, so nothing is
 * promised that can be absent.
 */
export type SlotItem<TItem extends DataListItem = DataListItem> = Partial<KnownKeys<TItem>> &
  BaseDataListItem;

export interface UDataListSlots<TItem extends DataListItem = DataListItem> {
  empty?: (props: { emptyTitle: string; emptyDescription: string }) => unknown;
  drag?: (props: { item: SlotItem<TItem>; iconName: string }) => unknown;
  label?: (props: { item: SlotItem<TItem>; crossed: boolean }) => unknown;
  actions?: (props: { item: SlotItem<TItem> }) => unknown;
}

export interface Props<TItem extends DataListItem = DataListItem> {
  /**
   * Data item options.
   */
  list?: TItem[];

  /**
   * Group name.
   */
  group?: string;

  /**
   * Data list size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Value key in the item object of options.
   */
  valueKey?: string;

  /**
   * Drag animation duration.
   */
  animationDuration?: number;

  /**
   * Sortable JS fallback (instead of native HTML5 DnD).
   */
  forceFallback?: boolean;

  /**
   * Append the fallback drag clone to document.body.
   */
  fallbackOnBody?: boolean;

  /**
   * CSS class for the Sortable fallback drag clone (forceFallback mode).
   */
  fallbackClass?: string;

  /**
   * Disable empty state for nested elements if empty (internal props).
   * @ignore
   */
  hideEmptyStateForNesting?: boolean;

  /**
   * Item key whose truthy value renders an empty nested drop-zone,
   * so a deeper level can be created by drag even without children.
   */
  nestedKey?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
