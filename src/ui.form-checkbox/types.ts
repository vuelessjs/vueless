import defaultConfig from "./config";

import type { ComponentConfig, UnknownObject, UnknownArray } from "../types";

export type Config = typeof defaultConfig;

export interface BaseCheckboxOption {
  value?: string | number | boolean | UnknownObject | UnknownArray;
  falseValue?: string | number | boolean | UnknownObject | UnknownArray;
  trueValue?: string | number | boolean | UnknownObject | UnknownArray;
  label?: string;
  icon?: string;
  description?: string;
}

/* Any object shape is a valid option, only reserved option keys are type checked. */
export type UCheckboxOption = BaseCheckboxOption & (object | UnknownObject);

export interface Props {
  /**
   * Checkbox value.
   */
  modelValue?: boolean | string | number | UnknownArray | UnknownObject;

  /**
   * Value of the checkbox.
   */
  value?: boolean | string | number | UnknownArray | UnknownObject;

  /**
   * Own value for checkbox checked state.
   */
  trueValue?: boolean | string | number | UnknownArray | UnknownObject;

  /**
   * Own value for checkbox unchecked state.
   */
  falseValue?: boolean | string | number | UnknownArray | UnknownObject;

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
  error?: string | boolean;

  /**
   * Label placement.
   */
  labelAlign?: "left" | "right";

  /**
   * Checkbox color.
   */
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "notice"
    | "neutral"
    | "grayscale";

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
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
