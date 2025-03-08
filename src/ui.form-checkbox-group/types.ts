import defaultConfig from "./config.ts";

import type { UnknownObject, ComponentConfig } from "../types.ts";
import type { UCheckboxOption } from "../ui.form-checkbox/types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Checkbox group value.
   */
  modelValue?: UnknownObject[];

  /**
   * Checkbox group options.
   */
  options?: UCheckboxOption[];

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
  color?: "primary" | "grayscale" | "success" | "warning" | "error" | "info" | "neutral";

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
  dataTest?: string | null;
}
