import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Drawer state (shown / hidden).
   */
  modelValue?: boolean;

  /**
   * Drawer title.
   */
  title?: string;

  /**
   * Drawer description.
   */
  description?: string;

  /**
   * Drawer position.
   */
  position?: "top" | "bottom" | "left" | "right";

  /**
   * Drawer variant.
   */
  variant?: "solid" | "outlined" | "subtle" | "soft";

  /**
   * Control whether the Drawer has a handle or not.
   */
  handle?: boolean;

  /**
   * Inset the drawer from the edges.
   */
  inset?: boolean;

  /**
   * Allow closing drawer by clicking on overlay.
   */
  closeOnOverlay?: boolean;

  /**
   * Allow closing drawer by pressing escape (esc) on the keyboard.
   */
  closeOnEsc?: boolean;

  /**
   * Show divider between content and footer.
   */
  divided?: boolean;

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
