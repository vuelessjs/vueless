import defaultConfig from "./config.ts";

import type { UnknownObject, ComponentConfig } from "../types.ts";
import type { Props } from "../ui.form-checkbox/types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Checkbox group value.
   */
  modelValue?: UnknownObject[];

  /**
   * Checkbox group options.
   */
  options?: Props[];

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
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
