import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

import type { RouteLocationRaw } from "vue-router";

export type Config = typeof defaultConfig;

export interface ULinkSlotProps {
  isActive: boolean;
  isExactActive: boolean;
}

export interface Props {
  /**
   * Button label.
   */
  label?: string;

  /**
   * Vue-router route object.
   */
  to?: RouteLocationRaw;

  /**
   * Link href url.
   */
  href?: string;

  /**
   * Link size.
   */
  size?: "sm" | "md" | "lg";

  /**
   * Link color.
   */
  color?:
    | "grayscale"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "gray"
    | "white"
    | "brand";

  /**
   * Link open type behavior.
   */
  type?: "phone" | "email" | "link";

  /**
   * Apply classes to the link when its route is active or when it matches any parent route.
   */
  activeClass?: string;

  /**
   * Apply classes to the link when its route is active.
   */
  exactActiveClass?: string;

  /**
   * Pass value to the attribute aria-current when the link is exact active.
   */
  ariaCurrentValue?: "time" | "location" | "page" | "step" | "date" | "true" | "false";

  /**
   * Specifies where to open the linked page.
   */
  target?: "_blank" | "_self" | "_parent" | "_top";

  /**
   * A rel attribute value to apply on the external link.
   */
  rel?: string;

  /**
   * Show underline.
   */
  underlined?: boolean;

  /**
   * Set link underline style as dashed.
   */
  dashed?: boolean;

  /**
   * Disable the link.
   */
  disabled?: boolean;

  /**
   * Make the Button fill the width with its container.
   */
  block?: boolean;

  /**
   * Whether RouterLink should not wrap its content in a tag.
   */
  custom?: boolean;

  /**
   * Calls `router.replace` instead of `router.push`.
   */
  replace?: boolean;

  /**
   * Pass the returned promise of `router.push()` to `document.startViewTransition()` if supported.
   */
  viewTransition?: boolean;

  /**
   * Component config object.
   */
  config?: ComponentConfig<Config>;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string | null;
}
