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
export {
  cx,
  cva,
  compose,
  setColor,
  getDefaults,
  vuelessConfig,
  setVuelessConfig,
  getMergedConfig as mergeConfigs,
} from "./utils/ui";
export { addToRequestQueue, removeFromRequestQueue } from "./utils/requestQueue";
export { isMac, isPWA, isIOS, isAndroid, isMobileApp, isWindows } from "./utils/platform";
export { getTheme, setTheme, resetTheme, normalizeThemeConfig, cssVar, setRootCSSVariables } from "./utils/theme";
export { getArgs, getArgTypes, getSlotNames, getSlotsFragment, getSource, getDocsDescription } from "./utils/storybook";
/* adapters */
export { default as defaultEnLocale } from "./adapter.locale/locales/en";
export { createVuelessAdapter } from "./adapter.locale/vueless";
export { createVueI18nAdapter } from "./adapter.locale/vue-i18n";
/* composables */
export { useLocale } from "./composables/useLocale";
export { useUI } from "./composables/useUI";
export { useDarkMode } from "./composables/useDarkMode";
export { useRequestQueue } from "./composables/useRequestQueue";
export { useBreakpoint, r } from "./composables/useBreakpoint";
export { useLoaderOverlay } from "./ui.loader-overlay/useLoaderOverlay";
export { useLoaderProgress } from "./ui.loader-progress/useLoaderProgress";
export { useMutationObserver } from "./composables/useMutationObserver";
export { Direction, useAutoPosition } from "./composables/useAutoPosition";
export { useComponentLocaleMessages } from "./composables/useComponentLocaleMassages";
/* loaders */
export { loaderProgressOn, loaderProgressOff } from "./ui.loader-progress/utilLoaderProgress";
export { loaderOverlayOn, loaderOverlayOff } from "./ui.loader-overlay/utilLoaderOverlay";
/* notifications */
export {
  notify,
  notifySuccess,
  notifyWarning,
  notifyInfo,
  notifyError,
  clearNotifications,
  setDelayedNotify,
  getDelayedNotify,
} from "./ui.text-notify/utilNotify";
export { NotificationType, NotificationPosition, NotificationDuration } from "./ui.text-notify/constants";
/* directives */
export { default as vTooltip }  from "./v.tooltip/vTooltip";
export { default as vClickOutside }  from "./v.click-outside/vClickOutside";
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
  ComponentCustomProp,
  ComponentCustomProps,
  CreateVuelessOptions,
  /* Color and theme types */
  StateColors,
  ColorShades,
  PrimaryColors,
  NeutralColors,
  PrimaryColorName,
  NeutralColorName,
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
/* component props */
export type { Props as UAccordionProps } from "./ui.container-accordion/types";
export type { Props as UAccordionItemProps } from "./ui.container-accordion-item/types";
export type { Props as UAlertProps } from "./ui.text-alert/types";
export type { Props as UAvatarProps } from "./ui.image-avatar/types";
export type { Props as UAvatarGroupProps } from "./ui.image-avatar-group/types";
export type { Props as UBadgeProps } from "./ui.text-badge/types";
export type { Props as UBoilerplateProps } from "./ui.boilerplate/types";
export type { Props as UBreadcrumbsProps } from "./ui.navigation-breadcrumbs/types";
export type { Props as UButtonProps } from "./ui.button/types";
export type { Props as UCalendarProps } from "./ui.form-calendar/types";
export type { Props as UCardProps } from "./ui.container-card/types";
export type { Props as UCheckboxProps } from "./ui.form-checkbox/types";
export type { Props as UCheckboxGroupProps } from "./ui.form-checkbox-group/types";
export type { Props as UCheckboxMultiStateProps } from "./ui.form-checkbox-multi-state/types";
export type { Props as UChipProps } from "./ui.other-chip/types";
export type { Props as UColProps } from "./ui.container-col/types";
export type { Props as UCollapsibleProps } from "./ui.container-collapsible/types";
export type { Props as UColorToggleProps } from "./ui.form-color-toggle/types";
export type { Props as UDataListProps } from "./ui.data-list/types";
export type { Props as UDatePickerProps } from "./ui.form-date-picker/types";
export type { Props as UDatePickerRangeProps } from "./ui.form-date-picker-range/types";
export type { Props as UDividerProps } from "./ui.container-divider/types";
export type { Props as UDotProps } from "./ui.other-dot/types";
export type { Props as UDrawerProps } from "./ui.container-drawer/types";
export type { Props as UDropdownProps } from "./ui.dropdown/types";
export type { Props as UDropdownBadgeProps } from "./ui.dropdown-badge/types";
export type { Props as UDropdownButtonProps } from "./ui.dropdown-button/types";
export type { Props as UDropdownLinkProps } from "./ui.dropdown-link/types";
export type { Props as UEmptyProps } from "./ui.container-empty/types";
export type { Props as UFileProps } from "./ui.text-file/types";
export type { Props as UFilesProps } from "./ui.text-files/types";
export type { Props as UGridProps } from "./ui.container-grid/types";
export type { Props as UGroupProps } from "./ui.container-group/types";
export type { Props as UGroupsProps } from "./ui.container-groups/types";
export type { Props as UHeaderProps } from "./ui.text-header/types";
export type { Props as UIconProps } from "./ui.image-icon/types";
export type { Props as UInputProps } from "./ui.form-input/types";
export type { Props as UInputCounterProps } from "./ui.form-input-counter/types";
export type { Props as UInputFileProps } from "./ui.form-input-file/types";
export type { Props as UInputNumberProps } from "./ui.form-input-number/types";
export type { Props as UInputPasswordProps } from "./ui.form-input-password/types";
export type { Props as UInputRatingProps } from "./ui.form-input-rating/types";
export type { Props as UInputSearchProps } from "./ui.form-input-search/types";
export type { Props as UKeyProps } from "./ui.text-key/types";
export type { Props as ULabelProps } from "./ui.form-label/types";
export type { Props as ULinkProps } from "./ui.button-link/types";
export type { Props as UListboxProps } from "./ui.form-listbox/types";
export type { Props as ULoaderProps } from "./ui.loader/types";
export type { Props as ULoaderOverlayProps } from "./ui.loader-overlay/types";
export type { Props as ULoaderProgressProps } from "./ui.loader-progress/types";
export type { Props as UModalProps } from "./ui.container-modal/types";
export type { Props as UModalConfirmProps } from "./ui.container-modal-confirm/types";
export type { Props as UNotifyProps } from "./ui.text-notify/types";
export type { Props as UNumberProps } from "./ui.text-number/types";
export type { Props as UPageProps } from "./ui.container-page/types";
export type { Props as UPaginationProps } from "./ui.navigation-pagination/types";
export type { Props as UPlaceholderProps } from "./ui.container-placeholder/types";
export type { Props as UProgressProps } from "./ui.navigation-progress/types";
export type { Props as URadioProps } from "./ui.form-radio/types";
export type { Props as URadioGroupProps } from "./ui.form-radio-group/types";
export type { Props as URowProps } from "./ui.container-row/types";
export type { Props as USelectProps } from "./ui.form-select/types";
export type { Props as USkeletonProps } from "./ui.skeleton/types";
export type { Props as USkeletonChoiceProps } from "./ui.skeleton-choice/types";
export type { Props as USkeletonInputProps } from "./ui.skeleton-input/types";
export type { Props as USkeletonTextProps } from "./ui.skeleton-text/types";
export type { Props as USplitterProps } from "./ui.container-splitter/types";
export type { Props as USwitchProps } from "./ui.form-switch/types";
export type { Props as UTabProps } from "./ui.navigation-tab/types";
export type { Props as UTableProps } from "./ui.data-table/types";
export type { Props as UTabsProps } from "./ui.navigation-tabs/types";
export type { Props as UTextProps } from "./ui.text-block/types";
export type { Props as UTextareaProps } from "./ui.form-textarea/types";
export type { Props as UThemeColorToggleProps } from "./ui.other-theme-color-toggle/types";
export type { Props as UToggleProps } from "./ui.button-toggle/types";
/* component data types */
export type {
  Row,
  BaseRow,
  TableRow,
  FlatRow,
  RowId,
  RowData,
  Cell,
  CellObject,
  Column,
  ColumnObject,
  TableColumn,
  DateDivider,
  BaseDateDivider,
} from "./ui.data-table/types";
export type { Option, BaseOption, ListboxOption, SelectedValue } from "./ui.form-listbox/types";
export type { SelectOption } from "./ui.form-select/types";
export type { UTabsOption, BaseTabOption } from "./ui.navigation-tabs/types";
export type { UBreadcrumb, BaseBreadcrumb } from "./ui.navigation-breadcrumbs/types";
export type { UToggleOption, BaseToggleOption } from "./ui.button-toggle/types";
export type { UAccordionOption, BaseAccordionOption } from "./ui.container-accordion/types";
export type { DataListItem, BaseDataListItem } from "./ui.data-list/types";
export type { UCheckboxOption, BaseCheckboxOption } from "./ui.form-checkbox/types";
export type { ChipItem, BaseChipItem } from "./ui.image-avatar/types";
export type { AvatarItem, BaseAvatarItem } from "./ui.image-avatar-group/types";
/* Export enums directly (not as types) */
export { ColorMode } from "./types";

export declare function createVueless(options?: CreateVuelessOptions): {
  install: (app: App) => void;
};
