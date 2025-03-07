import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";
import type { Props as ULinkProps } from "../ui.button-link/types.ts";

export type Config = typeof defaultConfig;

export interface UBreadcrumb extends ULinkProps {
  icon?: string;
}

export interface Props {
  /**
   * Array of links.
   */
  links?: UBreadcrumb[];

  /**
   * Breadcrumbs' size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Breadcrumbs' color.
   */
  color?: "primary" | "neutral" | "success" | "warning" | "error" | "info" | "grayscale";

  /**
   * Specifies where to open the linked page.
   */
  target?: "_blank" | "_self" | "_parent" | "_top";

  /**
   * Show underline.
   */
  underlined?: boolean;

  /**
   * Set links underline style as dashed.
   */
  dashed?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
