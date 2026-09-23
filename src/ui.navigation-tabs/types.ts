import defaultConfig from "./config";

import type { ComponentConfig, UnknownObject, UnknownArray } from "../types";

export type Config = typeof defaultConfig;

export type SetUTabsSelectedItem = (
  value: string | number | boolean | UnknownArray | UnknownObject,
) => void;

export interface BaseTabOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

/* Any object shape is a valid option, only reserved option keys are type checked. */
export type UTabsOption = BaseTabOption & (object | UnknownObject);

/**
 * Slots receive each option verbatim — `UTabs` iterates `props.options` without
 * filtering, flattening or synthesising entries, so the caller's shape is guaranteed.
 */
export interface UTabsSlots<TItem extends UTabsOption = UTabsOption> {
  default?: () => unknown;
  prev?: (props: { iconName: string }) => unknown;
  next?: (props: { iconName: string }) => unknown;
  left?: (props: { item: TItem; index: number; active: boolean; iconName?: string }) => unknown;
  label?: (props: {
    item: TItem;
    index: number;
    label: string;
    active: boolean;
    iconName?: string;
  }) => unknown;
  right?: (props: { item: TItem; index: number; active: boolean; iconName?: string }) => unknown;
}

export interface Props<TItem extends UTabsOption = UTabsOption> {
  /**
   * Selected tab value.
   */
  modelValue?: string;

  /**
   * Tab options.
   */
  options?: TItem[];

  /**
   * Tabs size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Make the Tabs scrollable via arrow buttons, dragging, or horizontal wheel.
   */
  scrollable?: boolean;

  /**
   * Make the Tabs expand to fill the entire width of its container.
   */
  block?: boolean;

  /**
   * Set the same paddings for the tabs.
   */
  square?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
