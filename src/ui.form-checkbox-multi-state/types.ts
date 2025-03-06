import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";
import type { UCheckboxOption } from "../ui.form-checkbox/types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Checkbox value.
   */
  modelValue?: boolean | string | number;

  /**
   * Checkbox state options.
   */
  options?: UCheckboxOption[];

  /**
   * Checkbox name.
   */
  name?: string;

  /**
   * Checkbox size.
   */
  size?: "sm" | "md" | "lg";

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
    | "primary";

  /**
   * Label placement.
   */
  labelAlign?: "left" | "right";

  /**
   * Make checkbox disabled.
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
