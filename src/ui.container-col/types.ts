import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * The distance between nested elements.
   */
  gap?: "none" | "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

  /**
   * Items horizontal align (align-items).
   */
  align?: "start" | "end" | "center" | "stretch" | "baseline";

  /**
   * Items horizontal align for multi-row flex containers (align-content).
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
   * Items vertical align (justify-content).
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
   * Make the Col expand to fill the entire width of its container.
   */
  block?: boolean;

  /**
   * Allow flex item to grow to fill available space (flex-grow).
   */
  grow?: boolean;

  /**
   * Allow flex item to shrink if necessary (flex-shrink).
   */
  shrink?: boolean;

  /**
   * Allows changing HTML tag.
   */
  tag?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
