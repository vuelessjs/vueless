import defaultConfig from "./config.ts";

import DraggableContext from "vuedraggable";

import type { ComponentConfig, UnknownType } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export type IconSize = "xs" | "sm" | "md";

export interface DragMoveEvent extends DragEvent {
  draggedContext: typeof DraggableContext;
  relatedContext: typeof DraggableContext | null;
}

export interface DataListItem {
  isActive?: boolean;
  isHiddenActions?: boolean;
  isHiddenCustomActions?: boolean;
  isHiddenDelete?: boolean;
  isHiddenEdit?: boolean;
  isDisabledNesting?: boolean;
  children?: DataListItem[];
  [key: string]: UnknownType | DataListItem[];
}

export interface UDataListProps {
  /**
   * Data item options.
   */
  list?: () => DataListItem[];

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
   * Empty state title.
   */
  emptyTitle?: string;

  /**
   * Empty state description.
   */
  emptyDescription?: string;

  /**
   * Drag animation duration.
   */
  animationDuration?: number;

  /**
   * Enable nesting.
   */
  nesting?: boolean;

  /**
   * Disable empty state for nested elements if empty (internal props).
   * @ignore
   */
  hideEmptyStateForNesting?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
