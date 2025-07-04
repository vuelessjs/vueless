import defaultConfig from "./config.ts";

import type { UnknownObject, UnknownArray, ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface URadioGroupOption {
  value: string | number | boolean | UnknownArray | UnknownObject;
  label: string;
  description?: string;
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
  options?: URadioGroupOption[];

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
