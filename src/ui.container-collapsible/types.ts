import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Controls the opened state of the collapsible.
   */
  open?: boolean;

  /**
   * The position of collapsible content on the y-axis.
   */
  yPosition?: "top" | "bottom";

  /**
   * The position of collapsible content on the x-axis.
   */
  xPosition?: "left" | "right";

  /**
   * Position the content absolutely.
   */
  absolute?: boolean;

  /**
   * Close collapsible when clicking outside.
   */
  closeOnOutside?: boolean;

  /**
   * Close collapsible when clicking on content.
   */
  closeOnContent?: boolean;

  /**
   * Disable the collapsible.
   */
  disabled?: boolean;

  /**
   * Unique element id.
   */
  id?: string;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
