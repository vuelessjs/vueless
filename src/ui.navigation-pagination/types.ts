import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UPaginationProps {
  /**
   * Current page number.
   */
  modelValue?: number;

  /**
   * Number of items per page.
   */
  perPage?: number;

  /**
   * Total number of items.
   */
  total?: number;

  /**
   * Limit of visible pages.
   */
  limit?: number;

  /**
   * Pagination variant.
   */
  variant?: "primary" | "secondary" | "thirdary";

  /**
   * Pagination size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * First button label.
   */
  firstLabel?: string;

  /**
   * Prev button label.
   */
  prevLabel?: string;

  /**
   * Next button label.
   */
  nextLabel?: string;

  /**
   * Last button label.
   */
  lastLabel?: string;

  /**
   * Disable navigation buttons.
   */
  disabled?: boolean;

  /**
   * Show ellipsis.
   */
  ellipsis?: boolean;

  /**
   * Show the first control.
   */
  showFirst?: boolean;

  /**
   * Show the last control.
   */
  showLast?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
