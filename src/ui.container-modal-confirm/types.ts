import defaultConfig from "./config.ts";

import type { ComponentConfig } from "../types.ts";

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
   * Confirm button label.
   */
  confirmLabel?: string;

  /**
   * Confirm button color.
   */
  confirmColor?:
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
   * Set the disabled accept-button.
   */
  confirmDisabled?: boolean;

  /**
   * Hide cancel button.
   */
  cancelHidden?: boolean;

  /**
   * Modal size (width).
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

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
  divider?: boolean;

  /**
   * Attach small modal to the bottom of the screen (mobile version only).
   */
  mobileStickBottom?: boolean;

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
