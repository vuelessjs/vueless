import defaultConfig from "./config";

import type { UnknownObject, UnknownArray, ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface BaseOption {
  value?: string | number | boolean | UnknownArray | UnknownObject;
  label?: string;
  description?: string;
}

export interface Option extends BaseOption {
  [key: string]: string | number | boolean | UnknownArray | UnknownObject | undefined;
}

export type SetRadioGroupSelectedItem =
  | ((value: string | number | boolean | UnknownArray | UnknownObject) => void)
  | null;

export interface Props {
  /**
   * Radio group selected value.
   */
  modelValue?: boolean | string | number | UnknownArray | UnknownObject;

  /**
   * Radio group options.
   */
  options?: Option[];

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Value key in the item object of options.
   */
  valueKey?: string;

  /**
   * Radio group label.
   */
  label?: string;

  /**
   * Radio group description.
   */
  description?: string;

  /**
   * Radio group error message.
   */
  error?: string;

  /**
   * Radio size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Radio group color.
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
   * Unique radio group name (sets for each radio).
   */
  name: string;

  /**
   * Disable the input.
   */
  disabled?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
