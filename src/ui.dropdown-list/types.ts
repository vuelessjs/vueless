import defaultConfig from "./config.ts";

export interface UDropdownListProps {
  /**
   * List of options.
   */
  options?: Array<object>;

  /**
   * Label key in the item object of options.
   */
  labelKey?: string;

  /**
   * Value key in the item object of options.
   */
  valueKey?: string;

  /**
   * Show add option button.
   */
  addOption?: boolean;

  /**
   * Disable the list.
   */
  disabled?: boolean;

  /**
   * List size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Number of options to show without a scroll.
   */
  visibleOptions?: number;

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;
}
