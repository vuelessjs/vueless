import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Set component value.
   */
  modelValue?: string;

  /**
   * Set input label.
   */
  label?: string;

  /**
   * Set input size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Set component placeholder.
   */
  placeholder?: string;

  /**
   * Label placement.
   */
  labelAlign?: "topInside" | "top" | "topWithDesc" | "left" | "right";

  /**
   * Set description for component.
   */
  description?: string;

  /**
   * Allow resizing of the textarea.
   */
  resizable?: boolean;

  /**
   * Enable auto-resize functionality based on content.
   */
  autoResize?: boolean;

  /**
   * Make textarea read only.
   */
  readonly?: boolean;

  /**
   * Maximum character length.
   */
  maxLength?: string | number;

  /**
   * Make input disabled.
   */
  disabled?: boolean;

  /**
   * Set proper keyboard on mobile devices.
   */
  inputmode?: "text" | "decimal" | "numeric" | "tel" | "email" | "url" | "search" | "none";

  /**
   * Disable browsers autocomplete.
   */
  noAutocomplete?: boolean;

  /**
   * Set error message.
   */
  error?: string;

  /**
   * Set number of visible rows.
   */
  rows?: string | number;

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
