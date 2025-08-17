import defaultConfig from "./config";
import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
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
  variant?: "solid" | "outlined" | "subtle" | "soft" | "ghost";

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
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
