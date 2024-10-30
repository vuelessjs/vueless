/**
 * Config for the components autoload and color safelisting.
 * – folder: component folder (*required).
 */
export const COMPONENTS = {
  /* Buttons & Links */
  UButton: { folder: "ui.button" },
  ULink: { folder: "ui.button-link" },
  UToggle: { folder: "ui.button-toggle" },
  UToggleItem: { folder: "ui.button-toggle-item" },

  /* Dropdowns */
  UDropdownButton: { folder: "ui.dropdown-button" },
  UDropdownBadge: { folder: "ui.dropdown-badge" },
  UDropdownLink: { folder: "ui.dropdown-link" },
  UDropdownList: { folder: "ui.dropdown-list" },

  /* Form Inputs & Controls */
  UInput: { folder: "ui.form-input" },
  UInputFile: { folder: "ui.form-input-file" },
  UInputMoney: { folder: "ui.form-input-money" },
  UInputSearch: { folder: "ui.form-input-search" },
  UInputNumber: { folder: "ui.form-input-number" },
  UInputRating: { folder: "ui.form-input-rating" },
  UTextarea: { folder: "ui.form-textarea" },
  USelect: { folder: "ui.form-select" },
  UCheckbox: { folder: "ui.form-checkbox" },
  UCheckboxGroup: { folder: "ui.form-checkbox-group" },
  UCheckboxMultiState: { folder: "ui.form-checkbox-multi-state" },
  USwitch: { folder: "ui.form-switch" },
  URadio: { folder: "ui.form-radio" },
  URadioGroup: { folder: "ui.form-radio-group" },
  UCalendar: { folder: "ui.form-calendar" },
  UDatePicker: { folder: "ui.form-date-picker" },
  UDatePickerRange: { folder: "ui.form-date-picker-range" },
  ULabel: { folder: "ui.form-label" },
  UColorPicker: { folder: "ui.form-color-picker" },

  /* Text & Content */
  UHeader: { folder: "ui.text-header" },
  UText: { folder: "ui.text-block" },
  UAlert: { folder: "ui.text-alert" },
  UNotify: { folder: "ui.text-notify" },
  UMoney: { folder: "ui.text-money" },
  UFile: { folder: "ui.text-file" },
  UFiles: { folder: "ui.text-files" },
  UEmpty: { folder: "ui.text-empty" },
  UBadge: { folder: "ui.text-badge" },

  /* Containers */
  UDivider: { folder: "ui.container-divider" },
  UCol: { folder: "ui.container-col" },
  URow: { folder: "ui.container-row" },
  UGroup: { folder: "ui.container-group" },
  UAccordion: { folder: "ui.container-accordion" },
  UCard: { folder: "ui.container-card" },
  UModal: { folder: "ui.container-modal" },
  UModalConfirm: { folder: "ui.container-modal-confirm" },
  UPage: { folder: "ui.container-page" },

  /* Images and Icons */
  UIcon: { folder: "ui.image-icon" },
  UAvatar: { folder: "ui.image-avatar" },

  /* Data */
  UTable: { folder: "ui.data-table" },
  UDataList: { folder: "ui.data-list" },

  /* Navigation */
  UTab: { folder: "ui.navigation-tab" },
  UTabs: { folder: "ui.navigation-tabs" },
  UProgress: { folder: "ui.navigation-progress" },
  UPagination: { folder: "ui.navigation-pagination" },

  /* Loaders and Skeletons */
  ULoader: { folder: "ui.loader" },
  ULoaderProgress: { folder: "ui.loader-progress" },
  ULoaderOverlay: { folder: "ui.loader-overlay" },

  /* Other */
  UDot: { folder: "ui.other-dot" },
};

/**
 * List of supported colors.
 */
export const BRAND_COLORS = [
  // grayscale - may be needed when `grayscale` variant contains `{color}` variable.
  "brand",
  "gray",
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

export const tailwindClassDelimiter = ":";
export const dynamicClassPattern = "{color}";
