import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

import type { RouteLocationRaw } from "vue-router";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Modal state (shown / hidden).
   */
  modelValue?: boolean;

  /**
   * Modal title.
   */
  title?: string;

  /**
   * Modal description.
   */
  description?: string;

  /**
   * Modal variant.
   */
  variant?: "solid" | "outlined" | "subtle" | "soft";

  /**
   * Modal size (width).
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

  /**
   * Back link vue-router route object.
   */
  backTo?: RouteLocationRaw;

  /**
   * Back link label.
   */
  backLabel?: string;

  /**
   * Allow closing modal by clicking on close cross.
   */
  closeOnCross?: boolean;

  /**
   * Allow closing modal by clicking on overlay.
   */
  closeOnOverlay?: boolean;

  /**
   * Allow closing modal by pressing escape (esc) on the keyboard.
   */
  closeOnEsc?: boolean;

  /**
   * Add extra top margin for modal inside another modal.
   */
  inner?: boolean;

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
