import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * The distance between nested elements.
   */
  gap?: "none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Items vertical align (align-items).
   */
  align?: "start" | "end" | "center" | "stretch" | "baseline";

  /**
   * Items vertical align for multi-row flex containers (align-content).
   */
  content?:
    | "start"
    | "end"
    | "center"
    | "around"
    | "evenly"
    | "between"
    | "normal"
    | "stretch"
    | "baseline";

  /**
   * Items horizontal align (justify-content).
   */
  justify?: "start" | "end" | "center" | "around" | "evenly" | "between";

  /**
   * Reverse nested items order.
   */
  reverse?: boolean;

  /**
   * Allow items to wrap (flex flex-wrap).
   */
  wrap?: boolean;

  /**
   * Disables mobile adaptivity.
   */
  noMobile?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
