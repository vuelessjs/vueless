import defaultConfig from "./config";

import type { UnknownObject, UnknownArray, ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export type LocalValueType = string | number | boolean | UnknownObject | UnknownArray | null;

export interface Props {
  /**
   * Radio value.
   */
  modelValue?: boolean | string | number | UnknownArray | UnknownObject;

  /**
   * Native value attribute.
   */
  value?: boolean | string | number | UnknownArray | UnknownObject;

  /**
   * Radio label.
   */
  label?: string;

  /**
   * Label placement.
   */
  labelAlign?: "left" | "right";

  /**
   * Radio description.
   */
  description?: string;

  /**
   * Error message.
   */
  error?: string;

  /**
   * Radio name.
   */
  name?: string;

  /**
   * Radio size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Radio color.
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
   * Set radio disabled.
   */
  disabled?: boolean;

  /**
   * Set radio checked.
   */
  checked?: boolean;

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
