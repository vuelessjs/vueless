import defaultConfig from "./config.ts";

import type { UnknownObject } from "../types.ts";
import type { UCheckboxProps } from "../ui.form-checkbox/types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UCheckboxGroupProps {
  /**
   * Checkbox group value.
   */
  modelValue?: UnknownObject[];

  /**
   * Checkbox group options.
   */
  options?: UCheckboxProps[];

  /**
   * Checkbox group label.
   */
  label?: string;

  /**
   * Checkbox group description.
   */
  description?: string;

  /**
   * Checkbox group error message.
   */
  error?: string;

  /**
   * Checkbox group size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Checkbox group color.
   */
  color?:
    | "brand"
    | "grayscale"
    | "gray"
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
    | "rose";

  /**
   * Name for each checkbox.
   */
  name?: string;

  /**
   * Make checkbox disabled.
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
