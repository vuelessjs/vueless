import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UModalProps {
  /**
   * Set modal state (hidden / shown).
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
   * Modal size (width).
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

  /**
   * Back link vue-router route object.
   */
  backTo?: {
    path?: string;
    params?: Record<string, object>;
  };

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
   * Hide divider between content end footer.
   */
  noDivider?: boolean;

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
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
