import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UProgressProps {
  /**
   * Progress value (current step).
   */
  value: number;

  /**
   * Progress max amount of steps.
   */
  max?: number | number[] | string[];

  /**
   * Progress size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Progress color.
   */
  color?:
    | "brand"
    | "grayscale"
    | "gray"
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
    | "white";

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
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}

export interface StepperProgressProps {
  progressPercent: string;

  value: number;

  color: string;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
