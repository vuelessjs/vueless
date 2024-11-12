import defaultConfig from "./config.ts";

export interface UAlertProps {
  /**
   * Alert title.
   */
  title?: string;

  /**
   * Alert description.
   */
  description?: string;

  /**
   * Alert variant.
   * @values primary, secondary, thirdary
   */
  variant?: "primary" | "secondary" | "thirdary";

  /**
   * Add border to the `thirdary` variant.
   */
  bordered?: boolean;

  /**
   * Alert size.
   */
  size?: "xs" | "sm" | "md" | "lg";

  /**
   * Alert color.
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
   * Alert timeout.
   */
  timeout?: number;

  /**
   * Show close button.
   */
  closable?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
