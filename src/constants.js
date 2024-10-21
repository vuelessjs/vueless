/* Custom Vueless colors */
export const BRAND_COLOR = "brand";
export const GRAY_COLOR = "gray";
export const COOL_COLOR = "cool";
export const GRAYSCALE_COLOR = "grayscale";

/* Vueless dark mode */
export const DARK_MODE_SELECTOR = "vl-dark";
export const LIGHT_MODE_SELECTOR = "vl-light";

/* Vueless defaults */
export const DEFAULT_BRAND_COLOR = GRAYSCALE_COLOR;
export const DEFAULT_GRAY_COLOR = COOL_COLOR;
export const DEFAULT_RING = 4; /* pixels */
export const DEFAULT_RING_OFFSET = 0; /* pixels */
export const DEFAULT_ROUNDING = 8; /* pixels */

/* Vueless supported colors and shades */
export const COLOR_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const GRAY_COLORS = ["slate", COOL_COLOR, "zinc", "neutral", "stone"];
export const BRAND_COLORS = [
  GRAYSCALE_COLOR,
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

/* Vueless merge class strategy types */
export const STRATEGY_TYPE = {
  merge: "merge",
  replace: "replace",
  overwrite: "overwrite",
};

/* CVA (Class Variance Authority) default config keys */
export const CVA_CONFIG_KEY = {
  base: "base",
  variants: "variants",
  compoundVariants: "compoundVariants",
  defaultVariants: "defaultVariants",
};

/* Vueless default config keys */
export const SYSTEM_CONFIG_KEY = {
  i18n: "i18n",
  defaults: "defaults",
  strategy: "strategy",
  safelist: "safelist",
  component: "component",
  transition: "transition",
  safelistColors: "safelistColors",
  ...CVA_CONFIG_KEY,
};

/* Other */
export const PX_IN_REM = 16;
export const NESTED_COMPONENT_REG_EXP = /\{U[^}]*}/g;
