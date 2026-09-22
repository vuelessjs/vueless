import defaultConfig from "./config";
import type { ComponentConfig, UnknownObject } from "../types";
import type { Props as ULinkProps } from "../ui.button-link/types";

export type Config = typeof defaultConfig;

export interface BaseBreadcrumb extends ULinkProps {
  icon?: string;
}

/* Any object shape is a valid breadcrumb, only reserved breadcrumb keys are type checked. */
export type UBreadcrumb = BaseBreadcrumb & (object | UnknownObject);

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
