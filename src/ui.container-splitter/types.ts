import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Panel sizes (percentage or px).
   */
  modelValue?: number[];

  /**
   * Splitter orientation.
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Minimum sizes per panel (percentage or px). Can be a single value for all panels or an array of values per panel.
   */
  minSizes?: number | string | (number | string)[];

  /**
   * Maximum sizes per panel (percentage or px). Can be a single value for all panels or an array of values per panel.
   */
  maxSizes?: number | string | (number | string)[];

  /**
   * Gutter (divider) size in pixels.
   */
  gutterSize?: number;

  /**
   * Gutter color.
   */
  gutterColor?:
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
   * Disable resizing.
   */
  disabled?: boolean;

  /**
   * Storage identifier of a stateful Splitter.
   */
  stateKey?: string | null;

  /**
   * Defines where a stateful splitter keeps its state, valid values are 'session' for sessionStorage and 'local' for localStorage.
   */
  stateStorage?: "session" | "local";

  /**
   * Step factor to increment/decrement the size of the panels while pressing the arrow keys.
   */
  step?: number;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
