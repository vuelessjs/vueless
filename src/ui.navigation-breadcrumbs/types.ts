import defaultConfig from "./config";
import type { ComponentConfig } from "../types";
import type { Props as ULinkProps } from "../ui.button-link/types";

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
   * Breadcrumbs size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Breadcrumbs color.
   */
  color?:
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
