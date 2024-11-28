import defaultConfig from "./config.ts";

import type { UnknownObject, UnknownArray } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface URadioGroupOption {
  value: string | number;
  label: string;
  description: string;
}

export type SetRadioGroupSelectedItem =
  | ((value: string | number | boolean | UnknownArray | UnknownObject) => void)
  | null;

export interface URadioGroupProps {
  /**
   * Radio group selected value.
   */
  modelValue?: boolean | string | number | UnknownArray | UnknownObject;

  /**
   * Radio group options.
   */
  options?: Array<URadioGroupOption>;

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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
