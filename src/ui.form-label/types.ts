import defaultConfig from "./config";

import type { ComponentConfig } from "../types";

export type Config = typeof defaultConfig;

export interface Props {
  /**
   * Label text.
   */
  label?: string;

  /**
   * Set input id for label `for` attribute.
   */
  for?: string;

  /**
   * Component id (used for ARIA attributes).
   */
  id?: string;

  /**
   * Label description.
   */
  description?: string;

  /**
   * Label error message.
   */
  error?: string;

  /**
   * Label align.
   */
  align?: "top" | "topInside" | "topWithDesc" | "left" | "right";

  /**
   * Label size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Make label disabled.
   */
  disabled?: boolean;

  /**
   * Centre label horizontally.
   */
  centred?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
