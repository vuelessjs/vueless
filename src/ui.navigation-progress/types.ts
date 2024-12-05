import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export type HeaderSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface UProgressProps {
  /**
   * Progress value (current step).
   */
  value: number;

  /**
   * Progress max amount of steps.
   */
  max?: number | (() => (string | number)[]);

  /**
   * Progress size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Progress color.
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
    | "white"
    | "brand";

  /**
   * Progress variant.
   */
  variant?: "stepper" | "progress";

  /**
   * Progress indicator visibility.
   */
  indicator?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}

export interface StepperProgressProps {
  /**
   * Stepper progress percent value.
   */
  progressPercent: string;

  /**
   * Stepper progress value (current step).
   */
  value: number;

  /**
   * Stepper progress color.
   */
  color: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
