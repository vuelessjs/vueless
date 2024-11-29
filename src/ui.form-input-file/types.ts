import defaultConfig from "./config.ts";

export type Config = Partial<typeof defaultConfig>;

export type ButtonSize = "xs" | "sm" | "md";

export interface UInputFileProps {
  /**
   * Input value.
   */
  modelValue?: File[] | File;

  /**
   * Input label.
   */
  label?: string;

  /**
   * Input description.
   */
  description?: string;

  /**
   * Error message.
   */
  error?: string;

  /**
   * Label placement.
   */
  labelAlign?: "top" | "topInside" | "topWithDesc";

  /**
   * Input size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Max file size in megabytes.
   */
  maxFileSize?: number;

  /**
   * Allowed file types.
   */
  allowedFileTypes?: string[];

  /**
   * Allow selecting multiple files.
   */
  multiple?: boolean;

  /**
   * Disable the input.
   */
  disabled?: boolean;

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
