import type { App } from "vue";
import type { CreateVuelessOptions } from "./types";

/* eslint-disable prettier/prettier */
/* utils */
export {
  isSSR,
  isCSR,
  setTitle,
  getStored,
  getRandomId,
  getCookie,
  setCookie,
  deleteCookie,
  createDebounce,
  hasSlotContent,
} from "./utils/helper";
export { isMac, isPWA, isIOS, isAndroid, isMobileApp, isWindows } from "./utils/platform";
export { cx, cva, compose, getDefaults, setVuelessConfig, setColor, vuelessConfig } from "./utils/ui";
export { getTheme, setTheme, resetTheme, normalizeThemeConfig, cssVar } from "./utils/theme";
export { getArgs, getArgTypes, getSlotNames, getSlotsFragment, getSource, getDocsDescription } from "./utils/storybook";
/* adapters */
export { default as defaultEnLocale } from "./adapter.locale/locales/en";
export { createVuelessAdapter } from "./adapter.locale/vueless";
export { createVueI18nAdapter } from "./adapter.locale/vue-i18n";
/* composables */
export { useLocale } from "./composables/useLocale";
export { default as useUI } from "./composables/useUI";
export { useDarkMode } from "./composables/useDarkMode";
export { useLoaderProgress } from "./ui.loader-progress/useLoaderProgress";
export { useMutationObserver } from "./composables/useMutationObserver";
export { Direction, useAutoPosition } from "./composables/useAutoPosition";
export { useComponentLocaleMessages } from "./composables/useComponentLocaleMassages";
/* loaders */
export { loaderProgressOn, loaderProgressOff } from "./ui.loader-progress/utilLoaderProgress";
export { useLoaderOverlay } from "./ui.loader-overlay/useLoaderOverlay";
export { loaderOverlayOn, loaderOverlayOff } from "./ui.loader-overlay/utilLoaderOverlay";
/* notifications */
export {
  notify,
  notifySuccess,
  notifyWarning,
  notifyError,
  clearNotifications,
  setDelayedNotify,
  getDelayedNotify,
} from "./ui.text-notify/utilNotify";
export { NotificationType, NotificationPosition, NotificationDuration } from "./ui.text-notify/constants";
/* directives */
export { default as vTooltip }  from "./v.tooltip/vTooltip";
export { default as vClickOutside }  from "./v.click-outside/vClickOutside";
/* components */
/* Buttons & Links */
export { default as UButton } from "./ui.button/UButton.vue";
export { default as ULink } from "./ui.button-link/ULink.vue";
export { default as UToggle } from "./ui.button-toggle/UToggle.vue";
/* Dropdowns */
export { default as UDropdownButton } from "./ui.dropdown-button/UDropdownButton.vue";
export { default as UDropdownBadge } from "./ui.dropdown-badge/UDropdownBadge.vue";
export { default as UDropdownLink } from "./ui.dropdown-link/UDropdownLink.vue";
/* Form Inputs & Controls */
export { default as UInput } from "./ui.form-input/UInput.vue";
export { default as UInputFile } from "./ui.form-input-file/UInputFile.vue";
export { default as UInputNumber } from "./ui.form-input-number/UInputNumber.vue";
export { default as UInputCounter } from "./ui.form-input-counter/UInputCounter.vue";
export { default as UInputPassword } from "./ui.form-input-password/UInputPassword.vue";
export { default as UInputRating } from "./ui.form-input-rating/UInputRating.vue";
export { default as UInputSearch } from "./ui.form-input-search/UInputSearch.vue";
export { default as UTextarea } from "./ui.form-textarea/UTextarea.vue";
export { default as USelect } from "./ui.form-select/USelect.vue";
export { default as UListbox } from "./ui.form-listbox/UListbox.vue";
export { default as UCheckbox } from "./ui.form-checkbox/UCheckbox.vue";
export { default as UCheckboxGroup } from "./ui.form-checkbox-group/UCheckboxGroup.vue";
export { default as UCheckboxMultiState } from "./ui.form-checkbox-multi-state/UCheckboxMultiState.vue";
export { default as USwitch } from "./ui.form-switch/USwitch.vue";
export { default as URadio } from "./ui.form-radio/URadio.vue";
export { default as URadioGroup } from "./ui.form-radio-group/URadioGroup.vue";
export { default as UCalendar } from "./ui.form-calendar/UCalendar.vue";
export { default as UDatePicker } from "./ui.form-date-picker/UDatePicker.vue";
export { default as UDatePickerRange } from "./ui.form-date-picker-range/UDatePickerRange.vue";
export { default as UColorPicker } from "./ui.form-color-picker/UColorPicker.vue";
export { default as ULabel } from "./ui.form-label/ULabel.vue";
/* Text & Content */
export { default as UHeader } from "./ui.text-header/UHeader.vue";
export { default as UText } from "./ui.text-block/UText.vue";
export { default as UAlert } from "./ui.text-alert/UAlert.vue";
export { default as UNotify } from "./ui.text-notify/UNotify.vue";
export { default as UNumber } from "./ui.text-number/UNumber.vue";
export { default as UFile } from "./ui.text-file/UFile.vue";
export { default as UFiles } from "./ui.text-files/UFiles.vue";
export { default as UEmpty } from "./ui.text-empty/UEmpty.vue";
export { default as UBadge } from "./ui.text-badge/UBadge.vue";
/* Containers */
export { default as UDivider } from "./ui.container-divider/UDivider.vue";
export { default as UCol } from "./ui.container-col/UCol.vue";
export { default as URow } from "./ui.container-row/URow.vue";
export { default as UGroup } from "./ui.container-group/UGroup.vue";
export { default as UGroups } from "./ui.container-groups/UGroups.vue";
export { default as UAccordion } from "./ui.container-accordion/UAccordion.vue";
export { default as UAccordionItem } from "./ui.container-accordion-item/UAccordionItem.vue";
export { default as UCard } from "./ui.container-card/UCard.vue";
export { default as UModal } from "./ui.container-modal/UModal.vue";
export { default as UModalConfirm } from "./ui.container-modal-confirm/UModalConfirm.vue";
export { default as UPage } from "./ui.container-page/UPage.vue";
/* Images and Icons */
export { default as UIcon } from "./ui.image-icon/UIcon.vue";
export { default as UAvatar } from "./ui.image-avatar/UAvatar.vue";
/* Data */
export { default as UTable } from "./ui.data-table/UTable.vue";
export { default as UDataList } from "./ui.data-list/UDataList.vue";
/* Navigation */
export { default as UTab } from "./ui.navigation-tab/UTab.vue";
export { default as UTabs } from "./ui.navigation-tabs/UTabs.vue";
export { default as UProgress } from "./ui.navigation-progress/UProgress.vue";
export { default as UPagination } from "./ui.navigation-pagination/UPagination.vue";
export { default as UBreadcrumbs } from "./ui.navigation-breadcrumbs/UBreadcrumbs.vue";
/* Loaders and Skeletons */
export { default as ULoader } from "./ui.loader/ULoader.vue";
export { default as ULoaderProgress } from "./ui.loader-progress/ULoaderProgress.vue";
export { default as ULoaderOverlay } from "./ui.loader-overlay/ULoaderOverlay.vue";
export { default as USkeleton } from "./ui.skeleton/USkeleton.vue";
export { default as USkeletonText } from "./ui.skeleton-text/USkeletonText.vue";
export { default as USkeletonInput } from "./ui.skeleton-input/USkeletonInput.vue";
export { default as USkeletonChoice } from "./ui.skeleton-choice/USkeletonChoice.vue";
/* Other */
export { default as UDot } from "./ui.other-dot/UDot.vue";
export { default as UChip } from "./ui.other-chip/UChip.vue";
export { default as UThemeColorToggle } from "./ui.other-theme-color-toggle/UThemeColorToggle.vue";
/* eslint-enable prettier/prettier */

/* types */
export type {
  /* Core configuration types */
  Config,
  ThemeConfig,
  ThemeConfigText,
  ThemeConfigRounding,
  ThemeConfigOutline,
  MergedThemeConfig,
  NestedComponent,
  ComponentConfig,
  ComponentDefaults,
  CreateVuelessOptions,
  /* Color and theme types */
  StateColors,
  PrimaryColors,
  NeutralColors,
  VuelessCssVariables,
  /* Component and Directive types */
  Directives,
  Components,
  ComponentNames,
  /* Utility types */
  UnknownType,
  UnknownArray,
  UnknownObject,
  CVACompoundVariants,
  CVA,
  /* Vue component utility types */
  ComponentType,
  ComponentProps,
  ComponentSlots,
  ComponentEmit,
  ComponentExposed,
  /* Locale types */
  LocaleOptions,
  LocaleInstance,
  LocaleMessages,
} from "./types";
/* Export enums directly (not as types) */
export { ColorMode } from "./types";

export declare function createVueless(options?: CreateVuelessOptions): {
  install: (app: App) => void;
};
