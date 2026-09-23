import defaultConfig from "./config";

import type { ComponentConfig, UnknownObject } from "../types";

export type Config = typeof defaultConfig;

export interface BaseToggleOption {
  value: string | number | boolean;
  label?: string;
  disabled?: boolean;
  icon?: string;
  leftIcon?: string;
  rightIcon?: string;
  onClick?: (option: Omit<BaseToggleOption, "onClick">) => void;
}

/* Any object shape is a valid option, only reserved option keys are type checked. */
export type UToggleOption = BaseToggleOption & (object | UnknownObject);

/**
 * Slots receive each option verbatim — `UToggle` iterates `props.options` without
 * filtering, flattening or synthesising entries, so the caller's shape is guaranteed.
 */
export interface UToggleSlots<TItem extends UToggleOption = UToggleOption> {
  left?: (props: { option: TItem; index: number; iconName?: string }) => unknown;
  option?: (props: { option: TItem; index: number; label: string; iconName?: string }) => unknown;
  right?: (props: { option: TItem; index: number; iconName?: string }) => unknown;
}

export interface Props<TItem extends UToggleOption = UToggleOption> {
  /**
   * Selected value.
   */
  modelValue?: string | number | boolean | (string | number | boolean)[];

  /**
   * Toggle item options.
   */
  options?: TItem[];

  /**
   * Toggle size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Toggle name.
   */
  name: string;

  /**
   * Allow selecting a few options and return them as an array.
   */
  multiple?: boolean;

  /**
   * Show items without a grouping border.
   */
  split?: boolean;

  /**
   * Make toggle disabled.
   */
  disabled?: boolean;

  /**
   * Make the Toggle expand to fill the entire width of its container.
   */
  block?: boolean;

  /**
   * Set button corners rounded.
   */
  round?: boolean;

  /**
   * Set the same paddings for the button.
   */
  square?: boolean;

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
