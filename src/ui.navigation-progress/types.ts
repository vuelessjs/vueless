import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

export type Config = typeof defaultConfig;

export interface UProgressProps {
  /**
   * Progress value (current step).
   */
  value: number;

  /**
   * Progress max amount of steps.
   */
  max?: number | (string | number)[];

  /**
   * Progress size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Progress color.
   */
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "grayscale"
    | "neutral";

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
  dataTest?: string | null;
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
  dataTest?: string | null;
}
