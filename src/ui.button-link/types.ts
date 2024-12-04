import defaultConfig from "./config.ts";
import type { ComponentConfig } from "../types.ts";

import type { RouteLocationRaw } from "vue-router";

export type Config = ComponentConfig<typeof defaultConfig>;

export interface ULinkProps {
  /**
   * Button label.
   */
  label?: string;

  /**
   * Link href url.
   */
  href?: string;

  /**
   * Vue-router route object.
   */
  to?: () => RouteLocationRaw;

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
   * Link open type behaviour.
   */
  type?: "phone" | "email" | "link";

  /**
   * Open link in the new tab.
   */
  targetBlank?: boolean;

  /**
   * Pass value to the attribute aria-current when the link is exact active.
   */
  ariaCurrentValue?: string;

  /**
   * Whether RouterLink should not wrap its content in an a tag.
   */
  custom?: boolean;

  /**
   * Whether RouterLink should not wrap its content in an a tag.
   */
  replace?: boolean;

  /**
   * Apply classes to the link when its route is active or when it matches any parent route.
   */
  activeClass?: string;

  /**
   * Apply classes to the link when its route is active.
   */
  exactActiveClass?: string;

  /**
   * Apply classes to the wrapper div when link route is active or when it matches any parent route.
   */
  wrapperActiveClass?: string;

  /**
   * Apply classes to the wrapper div when link route is active.
   */
  wrapperExactActiveClass?: string;

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
   * Remove outline ring on focus.
   */
  noRing?: boolean;

  /**
   * Component config object.
   */
  config?: Config;

  /**
   * Data-test attribute for automated testing.
   */
  dataTest?: string;
}
