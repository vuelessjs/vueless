import defaultConfig from "./config.ts";

import type { UnknownObject, ComponentConfig } from "../types.ts";

export type Config = ComponentConfig<typeof defaultConfig>;

export interface UCheckboxMultiStateProps {
  /**
   * Checkbox value.
   */
  modelValue?: boolean | string | number;

  /**
   * Checkbox state options.
   */
  options?: () => UnknownObject[];

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
    | "brand";

  /**
   * Label placement.
   */
  placement?: "left" | "right";

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
