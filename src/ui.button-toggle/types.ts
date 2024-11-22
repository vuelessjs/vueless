import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UToggleProps {
  /**
   * Selected value.
   */
  modelValue?: string | number | Array<string | number>;

  /**
   * Toggle item options.
   */
  options?: Array<string | number>;

  /**
   * Toggle variant.
   */
  variant?: "primary" | "secondary" | "thirdary";

  /**
   * Toggle size.
   */
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Label placement.
   */
  labelAlign?: "top" | "topWithDesc" | "left" | "right";

  /**
   * Toggle label.
   */
  label?: string;

  /**
   * Toggle description.
   */
  description?: string;

  /**
   * Toggle name.
   */
  name: string;

  /**
   * Allow selecting a few options and return them as an array.
   */
  multiple?: boolean;

  /**
   * Separate toggle items.
   */
  separated?: boolean;

  /**
   * Make toggle disabled.
   */
  disabled?: boolean;

  /**
   * Make the toggle fill the width with its container.
   */
  block?: boolean;

  /**
   * Set button corners rounded.
   */
  round?: boolean;

  /**
   * Set the same paddings for the button.
   */
  square?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
