import defaultConfig from "./config.ts";

export interface UFilesProps {
  /**
   * List of file objects.
   */
  fileList?: Array<object>;

  /**
   * File list label.
   */
  label?: string;

  /**
   * File list label placement.
   */
  labelAlign?: "top" | "topWithDesc";

  /**
   * File list description.
   */
  description?: string;

  /**
   * File list size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Show remove button for each file
   */
  removable?: boolean;

  /**
   * Component config object.
   */
  config?: Partial<typeof defaultConfig>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
