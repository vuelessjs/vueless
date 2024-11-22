import defaultConfig from "./config.ts";

import type { UnknownObject, UnknownArray } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UCheckboxProps {
  /**
   * Checkbox value.
   */
  modelValue?: boolean | string | number | UnknownArray | UnknownObject;

  /**
   * Native value attribute.
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
  error?: string;

  /**
   * Label placement.
   */
  labelAlign?: "left" | "right";

  /**
   * Checkbox color.
   */
  color?:
    | "brand"
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
    | "rose";

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
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
