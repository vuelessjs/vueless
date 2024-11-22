import defaultConfig from "./config.ts";

import type { Color } from "../types.ts";

export type Config = Partial<typeof defaultConfig>;

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
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Progress color.
   */
  color?: `${Color}`;

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
  config?: Config;

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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
