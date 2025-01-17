/**
 * The file has `.js` extension to support both node and browser scripts without a file transpilation.
 * Please do not change the extension if you do not fully understand the consequences.
 */

/* Custom Vueless colors */
export const BRAND_COLOR = "brand";
export const GRAY_COLOR = "gray";
export const COOL_COLOR = "cool";
export const GRAYSCALE_COLOR = "grayscale";

/* Vueless dark mode */
export const DARK_MODE_SELECTOR = "vl-dark";
export const LIGHT_MODE_SELECTOR = "vl-light";
export const COLOR_MODE_KEY = "vl-color-mode";

/* Vueless defaults */
export const DEFAULT_BRAND_COLOR = GRAYSCALE_COLOR;
export const DEFAULT_GRAY_COLOR = COOL_COLOR;
export const DEFAULT_RING = 4; /* pixels */
export const DEFAULT_RING_OFFSET = 0; /* pixels */
export const DEFAULT_RING_OFFSET_COLOR_LIGHT = "#ffffff"; // white
export const DEFAULT_RING_OFFSET_COLOR_DARK = "#111827"; // gray-900
export const DEFAULT_ROUNDING = 8; /* pixels */

/* Vueless supported colors and shades */
export const COLOR_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const GRAY_COLORS = ["slate", COOL_COLOR, "zinc", "neutral", "stone"];
export const BRAND_COLORS = [
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
  transition: "transition",
  safelistColors: "safelistColors",
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
  UToggleItem: "ui.button-toggle-item",

  /* Dropdowns */
  UDropdownButton: "ui.dropdown-button",
  UDropdownBadge: "ui.dropdown-badge",
  UDropdownLink: "ui.dropdown-link",
  UDropdownList: "ui.dropdown-list",

  /* Form Inputs & Controls */
  UInput: "ui.form-input",
  UInputFile: "ui.form-input-file",
  UInputMoney: "ui.form-input-money",
  UInputSearch: "ui.form-input-search",
  UInputNumber: "ui.form-input-number",
  UInputRating: "ui.form-input-rating",
  UTextarea: "ui.form-textarea",
  USelect: "ui.form-select",
  UCheckbox: "ui.form-checkbox",
  UCheckboxGroup: "ui.form-checkbox-group",
  UCheckboxMultiState: "ui.form-checkbox-multi-state",
  USwitch: "ui.form-switch",
  URadio: "ui.form-radio",
  URadioGroup: "ui.form-radio-group",
  UCalendar: "ui.form-calendar",
  UDatePicker: "ui.form-date-picker",
  UDatePickerRange: "ui.form-date-picker-range",
  ULabel: "ui.form-label",

  /* Text & Content */
  UHeader: "ui.text-header",
  UText: "ui.text-block",
  UAlert: "ui.text-alert",
  UNotify: "ui.text-notify",
  UMoney: "ui.text-money",
  UFile: "ui.text-file",
  UFiles: "ui.text-files",
  UEmpty: "ui.text-empty",
  UBadge: "ui.text-badge",
  UNumber: "ui.text-number",

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

  /* Loaders and Skeletons */
  ULoader: "ui.loader",
  ULoaderProgress: "ui.loader-progress",
  ULoaderOverlay: "ui.loader-overlay",

  /* Other */
  UDot: "ui.other-dot",
  UThemeColorToggle: "ui.other-theme-color-toggle",
};

/**
 * Extending Tailwind Merge by vueless custom tailwind classes.
 * All lists of rules available here:
 * https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts
 */
export const TAILWIND_MERGE_EXTENSION = {
  extend: {
    theme: {
      spacing: ["safe-top", "safe-bottom", "safe-left", "safe-right"],
    },
    classGroups: {
      "ring-w": [{ ring: ["dynamic"] }],
      "ring-offset-w": [{ "ring-offset": ["dynamic"] }],
      "ring-offset-color": [{ "ring-offset": ["color-dynamic"] }],
      "font-size": [{ text: ["2xs"] }],
      rounded: [{ rounded: ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-s": [{ "rounded-s": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-e": [{ "rounded-e": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-t": [{ "rounded-t": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-r": [{ "rounded-r": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-b": [{ "rounded-b": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-l": [{ "rounded-l": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-ss": [{ "rounded-ss": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-se": [{ "rounded-se": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-ee": [{ "rounded-ee": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-es": [{ "rounded-es": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-tl": [{ "rounded-tl": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-tr": [{ "rounded-tr": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-br": [{ "rounded-br": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
      "rounded-bl": [{ "rounded-bl": ["dynamic", "dynamic-sm", "dynamic-lg", "inherit"] }],
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
export const ICONS_DIR = "assets/icons";
export const VUELESS_LIBRARY = "vueless";
export const STORYBOOK_DIR = "storybook";
export const VUELESS_CONFIG_FILE_NAME = "vueless.config";
export const VUELESS_CACHE_DIR = "node_modules/.cache/vueless";
export const VUELESS_DIR = `node_modules/${VUELESS_LIBRARY}`;
export const VUELESS_LOCAL_DIR = `src`;
export const VUELESS_ICONS_DIR = `${VUELESS_DIR}/${ICONS_DIR}`;
export const VUELESS_ICONS_LOCAL_DIR = `src/${ICONS_DIR}`;
export const VUELESS_ICONS_CACHED_DIR = `${VUELESS_CACHE_DIR}/${ICONS_DIR}`;
export const VUELESS_CONFIGS_CACHED_DIR = `${VUELESS_CACHE_DIR}/configs`;

/* System error codes */
export const DEFAULT_EXIT_CODE = 0;
export const FAILURE_CODE = 1;

/* Other */
export const PX_IN_REM = 16;
export const NESTED_COMPONENT_PATTERN_REG_EXP = /\{(U[^}]*)}/;
export const EXTENDS_PATTERN_REG_EXP = /\{>[^}]*}/g;
export const DYNAMIC_COLOR_PATTERN = "{color}";
export const TAILWIND_COLOR_OPACITY_DELIMITER = "/";
export const TAILWIND_VARIANT_DELIMITER = ":";
export const TAILWIND_VARIANT_DELIMITER_REG_EXP = /:(?![^[]*])/;
