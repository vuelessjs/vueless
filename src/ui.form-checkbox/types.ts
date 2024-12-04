import defaultConfig from "./config.ts";

import type { Component, UnknownObject, UnknownArray } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

export type IconSize = "2xs" | "xs" | "sm";

export interface UCheckboxOption {
  value?: unknown;
  label?: string;
  icon?: string;
  description?: string;
}

export interface UCheckboxProps {
  /**
   * Checkbox value.
   */
  modelValue?: boolean | string | number | (() => UnknownArray) | (() => UnknownObject);

  /**
   * Native value attribute.
   */
  value?: boolean | string | number | (() => UnknownArray) | (() => UnknownObject);

  /**
   * Own value for checkbox checked state.
   */
  trueValue?: boolean | string | number | (() => UnknownArray) | (() => UnknownObject);

  /**
   * Own value for checkbox unchecked state.
   */
  falseValue?: boolean | string | number | (() => UnknownArray) | (() => UnknownObject);

  /**
   * Checkbox name.
   */
  name?: string;

  /**
   * Checkbox label.
   */
  label?: string;

  /**
   * Checkbox label description.
   */
  description?: string;

  /**
   * Error message.
   */
  error?: string;

  /**
   * Label placement.
   */
  labelAlign?: "left" | "right";

  /**
   * Checkbox color.
   */
  color?:
    | "grayscale"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "gray"
    | "brand";

  /**
   * Checkbox size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Make checkbox disabled.
   */
  disabled?: boolean;

  /**
   * Make checkbox partially checked (change the checked tick to a minus).
   */
  partial?: boolean;

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
