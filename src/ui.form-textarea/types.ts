import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export interface UTextareaProps {
  /**
   * Set input size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Set component value.
   */
  modelValue?: string;

  /**
   * Set component placeholder.
   */
  placeholder?: string;

  /**
   * Set input label.
   */
  label?: string;

  /**
   * Label placement.
   */
  labelAlign?: "top" | "topInside" | "topWithDesc" | "left" | "right";

  /**
   * Set description for component.
   */
  description?: string;

  /**
   * Allow resizing of the textarea.
   */
  resizable?: boolean;

  /**
   * Make textarea read only.
   */
  readonly?: boolean;

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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}