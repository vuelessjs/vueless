import defaultConfig from "./config.ts";
import type { Component } from "../types.ts";

export type Config = Partial<typeof defaultConfig> & Component;

export interface UFilesProps {
  /**
   * List of file objects.
   */
  fileList: () => File[];

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
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
