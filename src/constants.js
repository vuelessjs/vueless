/**
 * The file has `.js` extension to support both node and browser scripts without a file transpilation.
 * Please do not change the extension if you do not fully understand the consequences.
 */

/* Custom Vueless colors */
export const PRIMARY_COLOR = "primary";
export const NEUTRAL_COLOR = "neutral";
export const SECONDARY_COLOR = "secondary";
export const GRAYSCALE_COLOR = "grayscale";
export const INHERIT_COLOR = "inherit";

/* Vueless keys */
export const TEXT = "text";
export const OUTLINE = "outline";
export const ROUNDING = "rounding";
export const DISABLED_OPACITY = "disabled-opacity";

/* Vueless color mode keys */
export const COLOR_MODE_KEY = "vl-color-mode";
export const AUTO_MODE_KEY = "vl-auto-mode";
export const DARK_MODE_CLASS = "vl-dark";
export const LIGHT_MODE_CLASS = "vl-light";

/* Vueless defaults */
export const DEFAULT_PRIMARY_COLOR = GRAYSCALE_COLOR;
export const DEFAULT_NEUTRAL_COLOR = "gray";
export const DEFAULT_TEXT = 14; /* pixels */
export const TEXT_DECREMENT = 2; /* pixels */
export const TEXT_INCREMENT = 2; /* pixels */
export const DEFAULT_OUTLINE = 2; /* pixels */
export const OUTLINE_DECREMENT = 1; /* pixels */
export const OUTLINE_INCREMENT = 1; /* pixels */
export const DEFAULT_ROUNDING = 8; /* pixels */
export const ROUNDING_DECREMENT = 4; /* pixels */
export const ROUNDING_INCREMENT = 6; /* pixels */
export const DEFAULT_DISABLED_OPACITY = 50; /* presents */

/* Vueless supported color shades */
export const PRIMARY_COLORS = [
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
export const STATE_COLORS = [
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  "success",
  "info",
  "notice",
  "warning",
  "error",
  NEUTRAL_COLOR,
  GRAYSCALE_COLOR,
];
export const NEUTRAL_COLORS = ["slate", "gray", "zinc", "neutral", "stone"];
export const COLOR_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export const DEFAULT_LIGHT_THEME = {
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
};

export const DEFAULT_DARK_THEME = {
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
  unstyled: "unstyled",
  transition: "transition",
  colors: "colors",
  ...CVA_CONFIG_KEY,
};

/* UIcon non-props defaults */
export const ICON_NON_PROPS_DEFAULTS = ["library", "path", "style", "weight"];

/* Component to folder mapping. */
export const COMPONENTS = {
  /* Buttons & Links */
  UButton: "ui.button",
  ULink: "ui.button-link",
  UToggle: "ui.button-toggle",

  /* Dropdowns */
  UDropdownButton: "ui.dropdown-button",
  UDropdownBadge: "ui.dropdown-badge",
  UDropdownLink: "ui.dropdown-link",

  /* Form Inputs & Controls */
  UInput: "ui.form-input",
  UInputFile: "ui.form-input-file",
  UInputNumber: "ui.form-input-number",
  UInputSearch: "ui.form-input-search",
  UInputCounter: "ui.form-input-counter",
  UInputPassword: "ui.form-input-password",
  UInputRating: "ui.form-input-rating",
  UTextarea: "ui.form-textarea",
  USelect: "ui.form-select",
  UListbox: "ui.form-listbox",
  UCheckbox: "ui.form-checkbox",
  UCheckboxGroup: "ui.form-checkbox-group",
  UCheckboxMultiState: "ui.form-checkbox-multi-state",
  USwitch: "ui.form-switch",
  URadio: "ui.form-radio",
  URadioGroup: "ui.form-radio-group",
  UCalendar: "ui.form-calendar",
  UDatePicker: "ui.form-date-picker",
  UDatePickerRange: "ui.form-date-picker-range",
  UColorPicker: "ui.form-color-picker",
  ULabel: "ui.form-label",

  /* Text & Content */
  UHeader: "ui.text-header",
  UText: "ui.text-block",
  UAlert: "ui.text-alert",
  UNotify: "ui.text-notify",
  UNumber: "ui.text-number",
  UFile: "ui.text-file",
  UFiles: "ui.text-files",
  UEmpty: "ui.text-empty",
  UBadge: "ui.text-badge",

  /* Containers */
  UDivider: "ui.container-divider",
  UCol: "ui.container-col",
  URow: "ui.container-row",
  UGroup: "ui.container-group",
  UGroups: "ui.container-groups",
  UAccordion: "ui.container-accordion",
  UCard: "ui.container-card",
  UModal: "ui.container-modal",
  UModalConfirm: "ui.container-modal-confirm",
  UPage: "ui.container-page",

  /* Images and Icons */
  UIcon: "ui.image-icon",
  UAvatar: "ui.image-avatar",

  /* Data */
  UTable: "ui.data-table",
  UDataList: "ui.data-list",

  /* Navigation */
  UTab: "ui.navigation-tab",
  UTabs: "ui.navigation-tabs",
  UProgress: "ui.navigation-progress",
  UPagination: "ui.navigation-pagination",
  UBreadcrumbs: "ui.navigation-breadcrumbs",

  /* Loaders and Skeletons */
  ULoader: "ui.loader",
  ULoaderProgress: "ui.loader-progress",
  ULoaderOverlay: "ui.loader-overlay",
  USkeleton: "ui.skeleton",
  UInputSkeleton: "ui.input-skeleton",
  UInputOptionSkeleton: "ui.input-option-skeleton",

  /* Other */
  UDot: "ui.other-dot",
  UChip: "ui.other-chip",
  UThemeColorToggle: "ui.other-theme-color-toggle",
};

/**
 * Extending Tailwind Merge by vueless custom tailwind classes.
 * All lists of rules available here:
 * https://github.com/dcastil/tailwind-merge/blob/main/src/lib/default-config.ts
 */
export const TAILWIND_MERGE_EXTENSION = {
  extend: {
    theme: {
      colors: ["brand", "brand-"],
      spacing: ["safe-top", "safe-bottom", "safe-left", "safe-right"],
    },
    classGroups: {
      "outline-w": [{ outline: ["small", "medium", "large"] }],
      "font-size": [{ text: ["tiny", "small", "medium", "large"] }],
      "bg-color": [{ bg: ["default", "muted", "lifted", "accented", "inverted"] }],
      "text-color": [{ text: ["default", "muted", "lifted", "accented", "inverted"] }],
      "border-color": [{ border: ["default", "muted", "lifted", "accented"] }],
      "border-color-x": [{ "border-x": ["default", "muted", "lifted", "accented"] }],
      "border-color-y": [{ "border-y": ["default", "muted", "lifted", "accented"] }],
      "border-color-t": [{ "border-t": ["default", "muted", "lifted", "accented"] }],
      "border-color-r": [{ "border-r": ["default", "muted", "lifted", "accented"] }],
      "border-color-b": [{ "border-b": ["default", "muted", "lifted", "accented"] }],
      "border-color-l": [{ "border-l": ["default", "muted", "lifted", "accented"] }],
      rounded: [{ rounded: ["small", "medium", "large", "inherit"] }],
      "rounded-s": [{ "rounded-s": ["small", "medium", "large", "inherit"] }],
      "rounded-e": [{ "rounded-e": ["small", "medium", "large", "inherit"] }],
      "rounded-t": [{ "rounded-t": ["small", "medium", "large", "inherit"] }],
      "rounded-r": [{ "rounded-r": ["small", "medium", "large", "inherit"] }],
      "rounded-b": [{ "rounded-b": ["small", "medium", "large", "inherit"] }],
      "rounded-l": [{ "rounded-l": ["small", "medium", "large", "inherit"] }],
      "rounded-ss": [{ "rounded-ss": ["small", "medium", "large", "inherit"] }],
      "rounded-se": [{ "rounded-se": ["small", "medium", "large", "inherit"] }],
      "rounded-ee": [{ "rounded-ee": ["small", "medium", "large", "inherit"] }],
      "rounded-es": [{ "rounded-es": ["small", "medium", "large", "inherit"] }],
      "rounded-tl": [{ "rounded-tl": ["small", "medium", "large", "inherit"] }],
      "rounded-tr": [{ "rounded-tr": ["small", "medium", "large", "inherit"] }],
      "rounded-br": [{ "rounded-br": ["small", "medium", "large", "inherit"] }],
      "rounded-bl": [{ "rounded-bl": ["small", "medium", "large", "inherit"] }],
    },
  },
};

/* SVGO config for preparing SVG icons. */
export const DEFAULT_SVGO_CONFIG = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          convertColors: {
            currentColor: true,
          },
        },
      },
    },
  ],
};

/* Vueless general */
export const INTERNAL_ENV = "internal";
export const STORYBOOK_ENV = "storybook";
export const NUXT_MODULE_ENV = "nuxt-module";

export const VUELESS_LIBRARY = "vueless";
export const INTERNAL_ICONS_LIBRARY = "internal";
export const STORYBOOK_ICONS_LIBRARY = "storybook";

export const NODE_MODULES_DIR = "node_modules";
export const VUELESS_PACKAGE_DIR = `${NODE_MODULES_DIR}/vueless`;
export const VUELESS_CACHE_DIR = `${NODE_MODULES_DIR}/.cache/vueless`;
export const VUELESS_LOCAL_DIR = "src";
export const ICONS_DIR = "icons";
export const ICONS_VUELESS_DIR = `${VUELESS_PACKAGE_DIR}/${ICONS_DIR}`;
export const ICONS_CACHED_DIR = `${VUELESS_CACHE_DIR}/${ICONS_DIR}`;

export const ICONS_VIRTUAL_MODULE_ID = "virtual:vueless-icons";
export const RESOLVED_ICONS_VIRTUAL_MODULE_ID = `\0${ICONS_VIRTUAL_MODULE_ID}`;

export const VUELESS_TAILWIND_SAFELIST = `${VUELESS_CACHE_DIR}/safelist.txt`;
export const VUELESS_CONFIGS_CACHED_DIR = `${VUELESS_CACHE_DIR}/configs`;
export const VUELESS_MERGED_CONFIGS_CACHED_DIR = `${VUELESS_CACHE_DIR}/mergedConfigs`;
export const VUELESS_CONFIG_FILE_NAME = "vueless.config";

/* System error codes */
export const DEFAULT_EXIT_CODE = 0;
export const FAILURE_CODE = 1;

/* Other */
export const PX_IN_REM = 16;
export const NESTED_COMPONENT_PATTERN_REG_EXP = /\{(U[^}]*)}/;
export const EXTENDS_PATTERN_REG_EXP = /\{>[^}]*}/g;
export const DYNAMIC_COLOR_PATTERN = "{color}";
export const JAVASCRIPT_EXT = ".js";
export const TYPESCRIPT_EXT = ".ts";
export const VUE_EXT = ".vue";
