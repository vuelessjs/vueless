import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Icon name to display instead of the chip.
   */
  icon?: string;

  /**
   * Chip color.
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
   * Chip size.
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * The position of the chip on the x-axis.
   */
  xPosition?: "left" | "right";

  /**
   * The position of the chip on the y-axis.
   */
  yPosition?: "top" | "bottom";

  /**
   * Display the chip inside the component (useful with rounded components).
   */
  inset?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
