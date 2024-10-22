import { hasSlotContent } from "./composablesTs/useUI";

import UTextDefaultConfig from "./ui.text-block/config";
import UButtonDefaultConfig from "./ui.button/config";

export interface VuelessConfig {
  /**
   * Components brand (primary) color.
   */
  brand?: BrandColors;

  /**
   * Components gray (secondary) color.
   */
  gray?: GrayColors;

  /**
   * Default components ring width.
   */
  ring?: number;

  /**
   * Default components ring offset width.
   */
  ringOffset?: number;

  /**
   * Default components rounding (border-radius).
   */
  rounding?: number;

  /**
   * Default dark mode state.
   */
  darkMode?: boolean;

  /**
   * Component classes merge behavior.
   * – merge (default) – smartly merge provided custom classes with default config classes.
   * – replace – replace default config keys by provided custom keys (override only provided keys, the rest classes will be taken from the default config).
   * – override – override default config by provided custom config (keeps only custom config, removes all default classes).
   */
  strategy?: Strategies;

  /**
   * Component configs.
   */
  component?: Partial<VuelessComponents>;

  /**
   * Tailwind-merge config extension for custom classes.
   * All lists of rules available here:
   * https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts.
   */
  tailwindMerge?: object;
}

export type VuelessComponentNames = keyof VuelessComponents | undefined; // keys union
export type Strategies = "merge" | "replace" | "override";
export type GrayColors = "slate" | "cool" | "zinc" | "neutral" | "stone";
export type BrandColors =
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
  | "rose";

export interface VuelessComponents {
  UText?: Partial<typeof UTextDefaultConfig>;
  UButton?: Partial<typeof UButtonDefaultConfig>;
}

export interface VuelessCommonComponent {
  i18n?: object;
  defaults?: object;
  strategy?: Strategies;
  safelist?: object;
  component?: string;
  transition?: object;
  safelistColors?: BrandColors;
  [key: string]: object | string | undefined;
}

export interface VuelessCVA {
  base?: string;
  variants?: Record<string, string | object>;
  compoundVariants?: VuelessCVACompoundVariants[];
  defaultVariants?: Record<string, string | number | boolean | object>;
}

export interface VuelessCVACompoundVariants {
  class: string;
  [key: string]: string;
}

export interface VueAttrs {
  id?: string;
  class?: string;
}

export type VuelessAttrs = {
  hasSlotContent: typeof hasSlotContent;
  [key: string]: object;
};
