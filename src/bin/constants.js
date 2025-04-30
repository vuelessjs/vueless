export const SRC_COMPONENTS_PATH = "/src/components";
export const COMPONENTS_PATH = "/components";
export const DEFAULT_VUELESS_CONFIG_CONTENT = `
export default {
  /**
   * Global settings.
   */
  primary: "grayscale",
  neutral: "gray",
  text: 14,
  outline: 2,
  rounding: 8,
  unstyled: false,
  colorMode: "auto",
  disabledOpacity: 50,

  /**
   * Light theme CSS variable settings.
   */
  lightTheme: {
    /* Primary colors */
    "--vl-primary": "--vl-primary-600",
    "--vl-primary-lifted": "--vl-primary-700",
    "--vl-primary-accented": "--vl-primary-800",

    /* Secondary colors */
    "--vl-secondary": "--vl-neutral-500",
    "--vl-secondary-lifted": "--vl-neutral-600",
    "--vl-secondary-accented": "--vl-neutral-700",

    /* Success colors */
    "--vl-success": "--color-green-600",
    "--vl-success-lifted": "--color-green-700",
    "--vl-success-accented": "--color-green-800",

    /* Info colors */
    "--vl-info": "--color-blue-600",
    "--vl-info-lifted": "--color-blue-700",
    "--vl-info-accented": "--color-blue-800",

    /* Notice colors */
    "--vl-notice": "--color-violet-600",
    "--vl-notice-lifted": "--color-violet-700",
    "--vl-notice-accented": "--color-violet-800",

    /* Warning colors */
    "--vl-warning": "--color-orange-600",
    "--vl-warning-lifted": "--color-orange-700",
    "--vl-warning-accented": "--color-orange-800",

    /* Error colors */
    "--vl-error": "--color-red-600",
    "--vl-error-lifted": "--color-red-700",
    "--vl-error-accented": "--color-red-800",

    /* Grayscale colors */
    "--vl-grayscale": "--vl-neutral-900",
    "--vl-grayscale-lifted": "--vl-neutral-800",
    "--vl-grayscale-accented": "--vl-neutral-700",

    /* Neutral colors */
    "--vl-neutral": "--vl-neutral-500",
    "--vl-neutral-lifted": "--vl-neutral-600",
    "--vl-neutral-accented": "--vl-neutral-700",

    /* Text neutral colors */
    "--vl-text-inverted": "--color-white",
    "--vl-text-muted": "--vl-neutral-400",
    "--vl-text-lifted": "--vl-neutral-500",
    "--vl-text-accented": "--vl-neutral-600",
    "--vl-text": "--vl-neutral-900",

    /* Border neutral colors */
    "--vl-border-muted": "--vl-neutral-200",
    "--vl-border": "--vl-neutral-300",
    "--vl-border-lifted": "--vl-neutral-400",
    "--vl-border-accented": "--vl-neutral-600",

    /* Background neutral colors */
    "--vl-bg": "--color-white",
    "--vl-bg-muted": "--vl-neutral-50",
    "--vl-bg-lifted": "--vl-neutral-100",
    "--vl-bg-accented": "--vl-neutral-200",
    "--vl-bg-inverted": "--vl-neutral-900",
  },

  /**
   * Dark theme CSS variable settings.
   */
  darkTheme: {
    /* Primary colors */
    "--vl-primary": "--vl-primary-400",
    "--vl-primary-lifted": "--vl-primary-500",
    "--vl-primary-accented": "--vl-primary-600",

    /* Secondary colors */
    "--vl-secondary": "--vl-neutral-300",
    "--vl-secondary-lifted": "--vl-neutral-400",
    "--vl-secondary-accented": "--vl-neutral-500",

    /* Success colors */
    "--vl-success": "--color-green-400",
    "--vl-success-lifted": "--color-green-500",
    "--vl-success-accented": "--color-green-600",

    /* Info colors */
    "--vl-info": "--color-blue-400",
    "--vl-info-lifted": "--color-blue-500",
    "--vl-info-accented": "--color-blue-600",

    /* Notice colors */
    "--vl-notice": "--color-violet-400",
    "--vl-notice-lifted": "--color-violet-500",
    "--vl-notice-accented": "--color-violet-600",

    /* Warning colors */
    "--vl-warning": "--color-orange-400",
    "--vl-warning-lifted": "--color-orange-500",
    "--vl-warning-accented": "--color-orange-600",

    /* Error colors */
    "--vl-error": "--color-red-400",
    "--vl-error-lifted": "--color-red-500",
    "--vl-error-accented": "--color-red-600",

    /* Grayscale colors */
    "--vl-grayscale": "--vl-neutral-100",
    "--vl-grayscale-lifted": "--vl-neutral-200",
    "--vl-grayscale-accented": "--vl-neutral-300",

    /* Neutral colors */
    "--vl-neutral": "--vl-neutral-300",
    "--vl-neutral-lifted": "--vl-neutral-400",
    "--vl-neutral-accented": "--vl-neutral-500",

    /* Text neutral colors */
    "--vl-text-inverted": "--vl-neutral-900",
    "--vl-text-muted": "--vl-neutral-600",
    "--vl-text-lifted": "--vl-neutral-400",
    "--vl-text-accented": "--vl-neutral-300",
    "--vl-text": "--vl-neutral-100",

    /* Border neutral colors */
    "--vl-border-muted": "--vl-neutral-800",
    "--vl-border": "--vl-neutral-700",
    "--vl-border-lifted": "--vl-neutral-600",
    "--vl-border-accented": "--vl-neutral-400",

    /* Background neutral colors */
    "--vl-bg": "--vl-neutral-900",
    "--vl-bg-muted": "--vl-neutral-800",
    "--vl-bg-lifted": "--vl-neutral-800",
    "--vl-bg-accented": "--vl-neutral-700",
    "--vl-bg-inverted": "--vl-neutral-100",
  },

  /**
   * Directive settings.
   */
  directives: {},

  /**
   * Component settings.
   */
  components: /*tw*/ {},

  /**
   * TailwindMerge settings for custom Tailwind CSS classes.
   * All lists of rules available here:
   * https://github.com/dcastil/tailwind-merge/blob/main/src/lib/default-config.ts
   */
  tailwindMerge: {},
};
`;
