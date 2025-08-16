declare module "*.svg?url" {
  const src: string;
  export default src;
}

declare module "*.svg?raw" {
  const content: string;
  export default content;
}

declare module "*.svg?component" {
  import type { DefineComponent, SVGAttributes } from "vue";
  const component: DefineComponent<SVGAttributes> | undefined;
  export default component;
}

declare module "*.svg?skipsvgo" {
  import type { DefineComponent, SVGAttributes } from "vue";
  const component: DefineComponent<SVGAttributes> | undefined;
  export default component;
}

declare module "virtual:vueless/icons" {
  import type { UnknownArray } from "./types.ts";
  export const cachedIcons: UnknownArray;
}

declare module "vueless/constants" {
  /* Custom Vueless colors */
  export const PRIMARY_COLOR: string;
  export const NEUTRAL_COLOR: string;
  export const SECONDARY_COLOR: string;
  export const GRAYSCALE_COLOR: string;
  export const INHERIT_COLOR: string;
  export const TEXT_COLOR: string; // the default design system text color

  /* Vueless keys */
  export const TEXT: string;
  export const OUTLINE: string;
  export const ROUNDING: string;
  export const DISABLED_OPACITY: string;

  /* Vueless color mode keys */
  export const COLOR_MODE_KEY: string;
  export const AUTO_MODE_KEY: string;
  export const DARK_MODE_CLASS: string;
  export const LIGHT_MODE_CLASS: string;

  /* Vueless defaults */
  export const DEFAULT_PRIMARY_COLOR: string;
  export const DEFAULT_NEUTRAL_COLOR: string;
  export const DEFAULT_TEXT: number; /* pixels */
  export const TEXT_DECREMENT: number; /* pixels */
  export const TEXT_INCREMENT: number; /* pixels */
  export const DEFAULT_OUTLINE: number; /* pixels */
  export const OUTLINE_DECREMENT: number; /* pixels */
  export const OUTLINE_INCREMENT: number; /* pixels */
  export const DEFAULT_ROUNDING: number; /* pixels */
  export const ROUNDING_DECREMENT: number; /* pixels */
  export const ROUNDING_INCREMENT: number; /* pixels */
  export const DEFAULT_DISABLED_OPACITY: number; /* presents */

  /* Vueless supported color shades */
  export const PRIMARY_COLORS: readonly string[];
  export const STATE_COLORS: readonly string[];
  export const NEUTRAL_COLORS: readonly string[];
  export const COLOR_SHADES: readonly number[];

  export const DEFAULT_LIGHT_THEME: Record<string, string>;

  export const DEFAULT_DARK_THEME: Record<string, string>;

  /* CVA (Class Variance Authority) default config keys */
  export const CVA_CONFIG_KEY: Record<string, string>;

  /* Vueless default config keys */
  export const SYSTEM_CONFIG_KEY: Record<string, string>;

  /* UIcon non-props defaults */
  export const ICON_NON_PROPS_DEFAULTS: readonly string[];

  /* Component to folder mapping. */
  export const COMPONENTS: Record<string, string>;

  /**
   * Extending Tailwind Merge by vueless custom tailwind classes.
   * All lists of rules available here:
   * https://github.com/dcastil/tailwind-merge/blob/main/src/lib/default-config.ts
   */
  export const TAILWIND_MERGE_EXTENSION: Record<string, unknown>;

  /* SVGO config for preparing SVG icons. */
  export const DEFAULT_SVGO_CONFIG: Record<string, unknown>;

  /* Vueless general */
  export const INTERNAL_ENV: string;
  export const STORYBOOK_ENV: string;
  export const NUXT_MODULE_ENV: string;

  export const VUELESS_LIBRARY: string;
  export const INTERNAL_ICONS_LIBRARY: string;
  export const STORYBOOK_ICONS_LIBRARY: string;

  export const CACHE_DIR: string;
  export const NODE_MODULES_DIR: string;
  export const VUELESS_PACKAGE_DIR: string;
  export const VUELESS_CACHE_DIR: string;
  export const VUELESS_LOCAL_DIR: string;
  export const ICONS_DIR: string;
  export const ICONS_VUELESS_DIR: string;
  export const ICONS_CACHED_DIR: string;

  export const ICONS_VIRTUAL_MODULE_ID: string;
  export const RESOLVED_ICONS_VIRTUAL_MODULE_ID: string;

  export const VUELESS_TAILWIND_SAFELIST: string;
  export const VUELESS_CONFIGS_CACHED_DIR: string;
  export const VUELESS_MERGED_CONFIGS_CACHED_DIR: string;
  export const VUELESS_CONFIG_FILE_NAME: string;
  export const CONFIG_INDEX_FILE_NAME: string;

  /* System error codes */
  export const DEFAULT_EXIT_CODE: number;
  export const FAILURE_CODE: number;

  /* Other */
  export const PX_IN_REM: number;
  export const NESTED_COMPONENT_PATTERN_REG_EXP: RegExp;
  export const EXTENDS_PATTERN_REG_EXP: RegExp;
  export const DYNAMIC_COLOR_PATTERN: string;
  export const JAVASCRIPT_EXT: string;
  export const TYPESCRIPT_EXT: string;
  export const VUE_EXT: string;
}
