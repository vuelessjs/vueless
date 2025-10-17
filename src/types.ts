import UTextDefaultConfig from "./ui.text-block/config";
import UAlertDefaultConfig from "./ui.text-alert/config";
import UEmptyDefaultConfig from "./ui.text-empty/config";
import UFileDefaultConfig from "./ui.text-file/config";
import UFilesDefaultConfig from "./ui.text-files/config";
import UHeaderDefaultConfig from "./ui.text-header/config";
import UNotifyDefaultConfig from "./ui.text-notify/config";
import UNumberDefaultConfig from "./ui.text-number/config";
import UDotDefaultConfig from "./ui.other-dot/config";
import UChipDefaultConfig from "./ui.other-chip/config";
import UButtonDefaultConfig from "./ui.button/config";
import ULinkDefaultConfig from "./ui.button-link/config";
import UToggleDefaultConfig from "./ui.button-toggle/config";
import UBadgeDefaultConfig from "./ui.text-badge/config";
import UCalendarDefaultConfig from "./ui.form-calendar/config";
import UDatePickerConfig from "./ui.form-date-picker/config";
import UDatePickerRangeConfig from "./ui.form-date-picker-range/config";
import UDataTableConfig from "./ui.data-table/config";
import UDropdownBadgeConfig from "./ui.dropdown-badge/config";
import UDropdownButtonConfig from "./ui.dropdown-button/config";
import UDropdownLinkConfig from "./ui.dropdown-link/config";
import UAccordionConfig from "./ui.container-accordion/config";
import UAccordionItemConfig from "./ui.container-accordion-item/config";
import UCardConfig from "./ui.container-card/config";
import UColConfig from "./ui.container-col/config";
import UDividerConfig from "./ui.container-divider/config";
import UGroupConfig from "./ui.container-group/config";
import UModalConfig from "./ui.container-modal/config";
import UModalConfirmConfig from "./ui.container-modal-confirm/config";
import UDrawerConfig from "./ui.container-drawer/config";
import UPageConfig from "./ui.container-page/config";
import URowConfig from "./ui.container-row/config";
import ULoaderConfig from "./ui.loader/config";
import ULoaderOverlayConfig from "./ui.loader-overlay/config";
import ULoaderProgressConfig from "./ui.loader-progress/config";
import UPaginationConfig from "./ui.navigation-pagination/config";
import UProgressConfig from "./ui.navigation-progress/config";
import UTabConfig from "./ui.navigation-tab/config";
import UTabsConfig from "./ui.navigation-tabs/config";
import UBreadcrumbsConfig from "./ui.navigation-breadcrumbs/config";
import UAvatarConfig from "./ui.image-avatar/config";
import UIconConfig from "./ui.image-icon/config";
import UCheckboxConfig from "./ui.form-checkbox/config";
import UCheckboxGroupConfig from "./ui.form-checkbox-group/config";
import UCheckboxMultiStateConfig from "./ui.form-checkbox-multi-state/config";
import URadioConfig from "./ui.form-radio/config";
import URadioGroupConfig from "./ui.form-radio-group/config";
import USwitchConfig from "./ui.form-switch/config";
import UTextareaConfig from "./ui.form-textarea/config";
import ULabelConfig from "./ui.form-label/config";
import UColorPickerConfig from "./ui.other-theme-color-toggle/config";
import UInputConfig from "./ui.form-input/config";
import UInputCounterConfig from "./ui.form-input-counter/config";
import UInputPasswordConfig from "./ui.form-input-password/config";
import UInputRatingConfig from "./ui.form-input-rating/config";
import UInputSearchConfig from "./ui.form-input-search/config";
import UInputFileConfig from "./ui.form-input-file/config";
import UInputNumberConfig from "./ui.form-input-number/config";
import UDataListConfig from "./ui.data-list/config";
import USelectConfig from "./ui.form-select/config";
import UListboxConfig from "./ui.form-listbox/config";

import type { Props } from "tippy.js";
import type { Config as TailwindConfig } from "tailwindcss";
import type { ComputedRef, Ref, ComponentInternalInstance, TransitionProps } from "vue";

export enum ColorMode {
  Dark = "dark",
  Light = "light",
  Auto = "auto",
}

export interface ThemeConfigText {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

export interface ThemeConfigRounding {
  sm: number;
  md: number;
  lg: number;
}

export interface ThemeConfigOutline {
  sm: number;
  md: number;
  lg: number;
}

export interface ThemeConfig {
  /**
   * Components primary color.
   */
  primary?: PrimaryColors;

  /**
   * Components neutral color.
   */
  neutral?: NeutralColors;

  /**
   * Default components font size.
   */
  text?: number | Partial<ThemeConfigText>;

  /**
   * Default components rounding (border-radius).
   */
  rounding?: number | Partial<ThemeConfigRounding>;

  /**
   * Default components outline width.
   */
  outline?: number | Partial<ThemeConfigOutline>;

  /**
   * Default components spacing.
   */
  spacing?: number;

  /**
   * Default components letter spacing.
   */
  letterSpacing?: number;

  /**
   * Default components opacity for disabled state (in percents).
   */
  disabledOpacity?: number;

  /**
   * Default color mode.
   */
  colorMode?: `${ColorMode}`;

  /**
   * Defines the color mode to auto.
   */
  isColorModeAuto?: boolean;

  /**
   * Light theme design system CSS variables.
   */
  lightTheme?: Partial<VuelessCssVariables>;

  /**
   * Dark theme design system CSS variables.
   */
  darkTheme?: Partial<VuelessCssVariables>;
}

export interface Config extends ThemeConfig {
  /**
   * Array of colors to use as primary and neutral colors.
   * If set, a full color palette for each color will be safelisted.
   * If not set, will disable runtime color changing.
   *
   */
  runtimeColors?: (PrimaryColors | NeutralColors)[] | boolean;

  /**
   * Array of colors to show in component color props.
   * If set, only defined colors will be available in component color props.
   * If not set, will use default Vueless state colors.
   */
  colors?: StateColors[];

  /**
   * Removes default component styles (keeps only custom config, removes all default classes).
   */
  unstyled?: boolean;

  /**
   * Component configs.
   */
  components?: Partial<Components>;

  /**
   * Directive configs.
   */
  directives?: Partial<Directives>;

  /**
   * Tailwind CSS theme config.
   * https://tailwindcss.com/docs/theme
   */
  tailwindTheme?: TailwindConfig["theme"];

  /**
   * Tailwind-merge config extension for custom classes.
   * All lists of rules available here:
   * https://github.com/dcastil/tailwind-merge/blob/main/src/lib/default-config.ts
   */
  tailwindMerge?: UnknownObject;
}

export type MergedThemeConfig = Omit<ThemeConfig, "text | outline | rounding"> & {
  text: Partial<ThemeConfigText>;
  outline: Partial<ThemeConfigOutline>;
  rounding: Partial<ThemeConfigRounding>;
};

export type UnknownObject = Record<string, unknown>;
export type UnknownArray = unknown[];
export type UnknownType = string | number | boolean | UnknownObject | undefined | null | unknown;

export type ComponentNames = keyof Components & string; // keys union

export type StateColors =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "success"
  | "info"
  | "notice"
  | "neutral"
  | "grayscale"
  | string;

export interface ColorShades {
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

export type NeutralColors =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | string
  | Partial<ColorShades>;
export type PrimaryColors =
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
  | "rose"
  | string
  | Partial<ColorShades>;

export interface Directives {
  tooltip?: Partial<Props>;
  clickOutside?: Partial<Props>;
}

export interface Components {
  UText: Partial<typeof UTextDefaultConfig>;
  UAlert: Partial<typeof UAlertDefaultConfig>;
  UEmpty: Partial<typeof UEmptyDefaultConfig>;
  UFile: Partial<typeof UFileDefaultConfig>;
  UFiles: Partial<typeof UFilesDefaultConfig>;
  UHeader: Partial<typeof UHeaderDefaultConfig>;
  UNotify: Partial<typeof UNotifyDefaultConfig>;
  UNumber: Partial<typeof UNumberDefaultConfig>;
  UDot: Partial<typeof UDotDefaultConfig>;
  UChip: Partial<typeof UChipDefaultConfig>;
  UButton: Partial<typeof UButtonDefaultConfig>;
  ULink: Partial<typeof ULinkDefaultConfig>;
  UToggle: Partial<typeof UToggleDefaultConfig>;
  UBadge: Partial<typeof UBadgeDefaultConfig>;
  UCalendar: Partial<typeof UCalendarDefaultConfig>;
  UDatePicker: Partial<typeof UDatePickerConfig>;
  UDatePickerRange: Partial<typeof UDatePickerRangeConfig>;
  UTable: Partial<typeof UDataTableConfig>;
  UDropdownBadge: Partial<typeof UDropdownBadgeConfig>;
  UDropdownButton: Partial<typeof UDropdownButtonConfig>;
  UDropdownLink: Partial<typeof UDropdownLinkConfig>;
  UListbox: Partial<typeof UListboxConfig>;
  UAccordion: Partial<typeof UAccordionConfig>;
  UAccordionItem: Partial<typeof UAccordionItemConfig>;
  UCard: Partial<typeof UCardConfig>;
  UCol: Partial<typeof UColConfig>;
  UDivider: Partial<typeof UDividerConfig>;
  UGroup: Partial<typeof UGroupConfig>;
  UModal: Partial<typeof UModalConfig>;
  UModalConfirm: Partial<typeof UModalConfirmConfig>;
  UPage: Partial<typeof UPageConfig>;
  UDrawer: Partial<typeof UDrawerConfig>;
  URow: Partial<typeof URowConfig>;
  ULoader: Partial<typeof ULoaderConfig>;
  ULoaderOverlay: Partial<typeof ULoaderOverlayConfig>;
  ULoaderProgress: Partial<typeof ULoaderProgressConfig>;
  UPagination: Partial<typeof UPaginationConfig>;
  UProgress: Partial<typeof UProgressConfig>;
  UTab: Partial<typeof UTabConfig>;
  UTabs: Partial<typeof UTabsConfig>;
  UBreadcrumbs: Partial<typeof UBreadcrumbsConfig>;
  UAvatar: Partial<typeof UAvatarConfig>;
  UIcon: Partial<typeof UIconConfig>;
  UCheckbox: Partial<typeof UCheckboxConfig>;
  UCheckboxGroup: Partial<typeof UCheckboxGroupConfig>;
  UCheckboxMultiState: Partial<typeof UCheckboxMultiStateConfig>;
  URadio: Partial<typeof URadioConfig>;
  URadioGroup: Partial<typeof URadioGroupConfig>;
  USwitch: Partial<typeof USwitchConfig>;
  UTextarea: Partial<typeof UTextareaConfig>;
  ULabel: Partial<typeof ULabelConfig>;
  UColorPicker: Partial<typeof UColorPickerConfig>;
  UInput: Partial<typeof UInputConfig>;
  UInputCounter: Partial<typeof UInputCounterConfig>;
  UInputPassword: Partial<typeof UInputPasswordConfig>;
  UInputRating: Partial<typeof UInputRatingConfig>;
  UInputSearch: Partial<typeof UInputSearchConfig>;
  UInputFile: Partial<typeof UInputFileConfig>;
  UInputNumber: Partial<typeof UInputNumberConfig>;
  UDataList: Partial<typeof UDataListConfig>;
  USelect: Partial<typeof USelectConfig>;
  [key: string]: UnknownObject;
}

/* Make all config keys optional and allow to have string and object values. */
export type ComponentConfig<T> = Partial<{
  [K in keyof T]: K extends string
    ? K extends `${string}transition${string}` | `${string}Transition${string}`
      ? TransitionProps
      : K extends "i18n"
        ? T[K]
        : T[K] | string | UnknownObject
    : never;
}> & { [key: string]: unknown };

export type ComponentConfigFull<T> = ComponentConfig<T> & NestedComponent;

export interface NestedComponent {
  base?: string;
  defaults?: Record<string, string | UnknownObject>;
  [key: string]: Record<string, string | UnknownObject> | string | undefined;
}

export type ComponentDefaults = {
  color?: string;
  [key: string]: UnknownType;
};

export type ComponentCustomProps = {
  [key: string]: ComponentCustomProp;
};

export type ComponentCustomProp = {
  required?: boolean;
  ignore?: boolean;
  values?: string[];
  default?: UnknownType;
  description?: string;
};

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

export type MutatedProps = ComputedRef<UnknownObject>;

export type UseUI<T> = {
  config: Ref<T & ComponentConfig<T>>;
  getDataTest: (suffix?: string) => string | null;
} & KeysAttrs<T>;

export type KeysAttrs<T> = Record<
  string,
  Ref<KeyAttrsWithConfig<T>> | ComputedRef<KeyAttrsWithConfig<T>>
>;

export type KeyAttrsWithConfig<T> = {
  config?: ComponentConfig<T>;
} & KeyAttrs;

export interface KeyAttrs extends VueAttrs {
  "vl-component"?: string | null;
  "vl-key"?: string | null;
  "vl-child-component"?: string | null;
  "vl-child-key"?: string | null;
  [key: string]: string | boolean | unknown | undefined | null;
}

export interface VueAttrs {
  id?: string;
  class?: string;
  value?: string;
}

export interface CreateVuelessOptions extends Config {
  i18n?: LocaleOptions;
  config?: Config;
}

export interface LocaleOptions {
  messages?: LocaleMessages;
  locale?: string;
  fallback?: string;
  adapter?: LocaleInstance;
}

export interface LocaleInstance {
  name: string;
  messages: LocaleMessages | Ref<LocaleMessages>;
  locale: string | Ref<string>;
  fallback: string | Ref<string>;
  t: (key: string, ...params: unknown[]) => string;
  n: (value: number) => string;
  tm: <TMassages>(key: string) => Partial<TMassages>;
}

export interface LocaleMessages {
  [key: string]: LocaleMessages | string;
}

export interface VuelessCssVariables {
  /* Outline size CSS variables */
  "--vl-outline-sm": string;
  "--vl-outline-md": string;
  "--vl-outline-lg": string;
  /* Border radius size variables */
  "--vl-rounding-sm": string;
  "--vl-rounding-md": string;
  "--vl-rounding-lg": string;
  /* Font size CSS variables */
  "--vl-text-xs": string;
  "--vl-text-sm": string;
  "--vl-text-md": string;
  "--vl-text-lg": string;
  /* Primary CSS variables */
  "--vl-primary-50": string;
  "--vl-primary-100": string;
  "--vl-primary-200": string;
  "--vl-primary-300": string;
  "--vl-primary-400": string;
  "--vl-primary-500": string;
  "--vl-primary-600": string;
  "--vl-primary-700": string;
  "--vl-primary-800": string;
  "--vl-primary-900": string;
  "--vl-primary-950": string;
  /* Gray CSS variables */
  "--vl-neutral-50": string;
  "--vl-neutral-100": string;
  "--vl-neutral-200": string;
  "--vl-neutral-300": string;
  "--vl-neutral-400": string;
  "--vl-neutral-500": string;
  "--vl-neutral-600": string;
  "--vl-neutral-700": string;
  "--vl-neutral-800": string;
  "--vl-neutral-900": string;
  "--vl-neutral-950": string;
  /* Primary design system CSS variables */
  "--vl-primary": string;
  "--vl-primary-toned": string;
  "--vl-primary-accented": string;
  /* Secondary design system CSS variables */
  "--vl-secondary": string;
  "--vl-secondary-toned": string;
  "--vl-secondary-accented": string;
  /* Neutral design system CSS variables */
  "--vl-neutral": string;
  "--vl-neutral-toned": string;
  "--vl-neutral-accented": string;
  /* Success design system CSS variables */
  "--vl-success": string;
  "--vl-success-toned": string;
  "--vl-success-accented": string;
  /* Info design system CSS variables */
  "--vl-info": string;
  "--vl-info-toned": string;
  "--vl-info-accented": string;
  /* Warning design system CSS variables */
  "--vl-warning": string;
  "--vl-warning-toned": string;
  "--vl-warning-accented": string;
  /* Error design system CSS variables */
  "--vl-error": string;
  "--vl-error-toned": string;
  "--vl-error-accented": string;
  /* Grayscale design system CSS variables */
  "--vl-grayscale": string;
  "--vl-grayscale-toned": string;
  "--vl-grayscale-accented": string;
  /* Text neutral design system CSS variables */
  "--vl-text": string;
  "--vl-text-lifted": string;
  "--vl-text-accented": string;
  "--vl-text-muted": string;
  "--vl-text-inverted": string;
  /* Border neutral design system CSS variables */
  "--vl-border": string;
  "--vl-border-lifted": string;
  "--vl-border-accented": string;
  "--vl-border-muted": string;
  /* Background neutral design system CSS variables */
  "--vl-bg": string;
  "--vl-bg-lifted": string;
  "--vl-bg-accented": string;
  "--vl-bg-muted": string;
  "--vl-bg-inverted": string;
  /* Any other design system CSS variables */
  [key: string]: string;
}

/* Web-types interfaces and types */

export interface WebTypes {
  framework: string;
  name: string;
  version: string;
  contributions: Contributions;
}

export interface Contributions {
  html: HtmlContributions;
}

export interface HtmlContributions {
  "description-markup": string;
  "types-syntax": string;
  tags: Tag[];
}

export interface Tag {
  name: string;
  description?: string;
  attributes?: Attribute[];
  events?: Event[];
  slots?: Slot[];
  exposes?: Expose[];
  source?: Source;
}

export interface Source {
  module: string;
  symbol: string;
}

export interface Attribute {
  name: string;
  enum: string[];
  required?: boolean;
  description?: string;
  value: AttributeValue;
  default?: unknown;
}

export interface AttributeValue {
  kind: string;
  type: string;
}

export interface Event {
  name: string;
  description?: string;
  properties?: EventProperty[];
}

export interface EventProperty {
  type: string[];
  name: string;
  description?: string;
}

export interface Slot {
  name: string;
  description?: string;
  scoped?: boolean;
  bindings?: SlotBinding[];
}

export interface SlotBinding {
  type: string;
  name: string;
  description?: string;
}

export interface Expose {
  name: string;
  description?: string;
  properties: ExposeProperty[];
}

export interface ExposeProperty {
  type: string;
  description?: string;
}

export type VuelessComponentInstance = ComponentInternalInstance & {
  type?: {
    internal?: boolean;
  };
};

/**
 * Utility types to extract component props, slots, emit, exposed types.
 * Original code taken from `vue-component-type-helpers` npm package.
 * Source code: https://github.com/vuejs/language-tools/blob/master/packages/component-type-helpers/index.ts
 */

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type */
export type ComponentType<T> = T extends new (...args: any) => {}
  ? 1
  : T extends (...args: any) => any
    ? 2
    : 0;

export type ComponentProps<T> = T extends new (...args: any) => {
  $props: infer P;
}
  ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any
    ? P
    : {};

export type ComponentSlots<T> = T extends new (...args: any) => {
  $slots: infer S;
}
  ? NonNullable<S>
  : T extends (props: any, ctx: { slots: infer S; attrs: any; emit: any }, ...args: any) => any
    ? NonNullable<S>
    : {};

export type ComponentEmit<T> = T extends new (...args: any) => {
  $emit: infer E;
}
  ? NonNullable<E>
  : {};

export type ComponentExposed<T> = T extends new (...args: any) => infer E
  ? E
  : T extends (props: any, ctx: any, expose: (exposed: infer E) => any, ...args: any) => any
    ? NonNullable<E>
    : {};
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type */
