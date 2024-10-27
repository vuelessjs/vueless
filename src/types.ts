import { hasSlotContent } from "./composablesTs/useUI";

// TODO: Import all components here
import UTextDefaultConfig from "./ui.text-block/config";
import UButtonDefaultConfig from "./ui.button/config";

import type { ComputedRef } from "vue";

export interface ThemeConfig {
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
}

export interface Config extends ThemeConfig {
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
  component?: Partial<Components>;

  /**
   * Tailwind-merge config extension for custom classes.
   * All lists of rules available here:
   * https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts.
   */
  tailwindMerge?: UnknownObject;
}

export type UnknownObject = Record<string, unknown>;
export type ComponentNames = keyof Components; // keys union
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

export interface Components {
  UText?: Partial<typeof UTextDefaultConfig>;
  UButton?: Partial<typeof UButtonDefaultConfig>;
}

export interface Component {
  i18n?: UnknownObject;
  defaults?: UnknownObject;
  safelist?: () => TailwindSafelist[];
  strategy?: Strategies;
  transition?: Transition;
  safelistColors?: BrandColors;
  [key: string]: (CVA & NestedComponent) | object | string | undefined;
}

export interface NestedComponent {
  component: string;
  [key: string]: Record<string, string | object> | string;
}

export interface Transition {
  enterFromClass?: string;
  enterActiveClass?: string;
  enterToClass?: string;
  leaveFromClass?: string;
  leaveActiveClass?: string;
  leaveToClass?: string;
}

export interface CVA {
  base?: string;
  variants?: UnknownObject;
  compoundVariants?: CVACompoundVariants[] & never[];
  defaultVariants?: UnknownObject;
}

export interface CVACompoundVariants {
  class: string;
  [key: string]: string | number | undefined | null;
}

export interface VueAttrs {
  id?: string;
  class?: string;
  value?: string;
}

export interface UseAttrs {
  hasSlotContent?: typeof hasSlotContent;
  [key: string]: object | undefined;
}

export interface KeyAttrs extends VueAttrs {
  "vl-component"?: string | null;
  "vl-key"?: string | null;
  "vl-child-component"?: string | null;
  "vl-child-key"?: string | null;
  config?: UnknownObject;
  [key: string]: string | UnknownObject | undefined | null;
}

export interface KeysToExtend {
  base?: ComputedRef;
  extend?: ComputedRef;
}

export interface CreateVuelessOptions {
  i18n?: Record<string, string | object>;
}

export interface TailwindSafelist {
  pattern: string;
  variants?: string[];
}

export interface TailwindColorShades {
  DEFAULT: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface VuelessCssVariables {
  "--vl-ring": string;
  "--vl-ring-offset": string;
  "--vl-rounding": string;
  /* Gray CSS variables */
  "--vl-color-gray-50": string;
  "--vl-color-gray-100": string;
  "--vl-color-gray-200": string;
  "--vl-color-gray-300": string;
  "--vl-color-gray-400": string;
  "--vl-color-gray-500": string;
  "--vl-color-gray-600": string;
  "--vl-color-gray-700": string;
  "--vl-color-gray-800": string;
  "--vl-color-gray-900": string;
  "--vl-color-gray-950": string;
  "--vl-color-gray-default": string;
  /* Brand CSS variables */
  "--vl-color-brand-50": string;
  "--vl-color-brand-100": string;
  "--vl-color-brand-200": string;
  "--vl-color-brand-300": string;
  "--vl-color-brand-400": string;
  "--vl-color-brand-500": string;
  "--vl-color-brand-600": string;
  "--vl-color-brand-700": string;
  "--vl-color-brand-800": string;
  "--vl-color-brand-900": string;
  "--vl-color-brand-950": string;
  "--vl-color-brand-default": string;
}
