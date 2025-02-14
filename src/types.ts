import UTextDefaultConfig from "./ui.text-block/config.ts";
import UAlertDefaultConfig from "./ui.text-alert/config.ts";
import UEmptyDefaultConfig from "./ui.text-empty/config.ts";
import UFileDefaultConfig from "./ui.text-file/config.ts";
import UFilesDefaultConfig from "./ui.text-files/config.ts";
import UMoneyDefaultConfig from "./ui.text-money/config.ts";
import UHeaderDefaultConfig from "./ui.text-header/config.ts";
import UNotifyDefaultConfig from "./ui.text-notify/config.ts";
import UNumberDefaultConfig from "./ui.text-number/config.ts";
import UDotDefaultConfig from "./ui.other-dot/config.ts";
import UButtonDefaultConfig from "./ui.button/config.ts";
import ULinkDefaultConfig from "./ui.button-link/config.ts";
import UToggleDefaultConfig from "./ui.button-toggle/config.ts";
import UBadgeDefaultConfig from "./ui.text-badge/config.ts";
import UCalendarDefaultConfig from "./ui.form-calendar/config.ts";
import UDatePickerConfig from "./ui.form-date-picker/config.ts";
import UDatePickerRangeConfig from "./ui.form-date-picker-range/config.ts";
import UDataTableConfig from "./ui.data-table/config.ts";
import UDropdownBadgeConfig from "./ui.dropdown-badge/config.ts";
import UDropdownButtonConfig from "./ui.dropdown-button/config.ts";
import UDropdownLinkConfig from "./ui.dropdown-link/config.ts";
import UDropdownListConfig from "./ui.dropdown-list/config.ts";
import UAccordionConfig from "./ui.container-accordion/config.ts";
import UCardConfig from "./ui.container-card/config.ts";
import UColConfig from "./ui.container-col/config.ts";
import UDividerConfig from "./ui.container-divider/config.ts";
import UGroupConfig from "./ui.container-group/config.ts";
import UModalConfig from "./ui.container-modal/config.ts";
import UModalConfirmConfig from "./ui.container-modal-confirm/config.ts";
import UPageConfig from "./ui.container-page/config.ts";
import URowConfig from "./ui.container-row/config.ts";
import ULoaderConfig from "./ui.loader/config.ts";
import ULoaderOverlayConfig from "./ui.loader-overlay/config.ts";
import ULoaderProgressConfig from "./ui.loader-progress/config.ts";
import UPaginationConfig from "./ui.navigation-pagination/config.ts";
import UProgressConfig from "./ui.navigation-progress/config.ts";
import UTabConfig from "./ui.navigation-tab/config.ts";
import UTabsConfig from "./ui.navigation-tabs/config.ts";
import UBreadcrumbsConfig from "./ui.navigation-breadcrumbs/config.ts";
import UAvatarConfig from "./ui.image-avatar/config.ts";
import UIconConfig from "./ui.image-icon/config.ts";
import UCheckboxConfig from "./ui.form-checkbox/config.ts";
import UCheckboxGroupConfig from "./ui.form-checkbox-group/config.ts";
import UCheckboxMultiStateConfig from "./ui.form-checkbox-multi-state/config.ts";
import URadioConfig from "./ui.form-radio/config.ts";
import URadioGroupConfig from "./ui.form-radio-group/config.ts";
import USwitchConfig from "./ui.form-switch/config.ts";
import UTextareaConfig from "./ui.form-textarea/config.ts";
import ULabelConfig from "./ui.form-label/config.ts";
import UColorPickerConfig from "./ui.other-theme-color-toggle/config.ts";
import UInputConfig from "./ui.form-input/config.ts";
import UInputNumberConfig from "./ui.form-input-number/config.ts";
import UInputRatingConfig from "./ui.form-input-rating/config.ts";
import UInputSearchConfig from "./ui.form-input-search/config.ts";
import UInputFileConfig from "./ui.form-input-file/config.ts";
import UInputMoneyConfig from "./ui.form-input-money/config.ts";
import UDataListConfig from "./ui.data-list/config.ts";
import USelectConfig from "./ui.form-select/config.ts";

import type { Props } from "tippy.js";
import type { Config as TailwindConfig } from "tailwindcss";
import type { ComputedRef, Ref, ComponentInternalInstance } from "vue";
import type { LocaleOptions } from "./adatper.locale/vueless.ts";

export enum ColorMode {
  Dark = "dark",
  Light = "light",
  Auto = "auto",
}

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
   * Default components small size rounding (border-radius).
   */
  roundingSm?: number;

  /**
   * Default components rounding (border-radius).
   */
  rounding?: number;

  /**
   * Default components large size rounding (border-radius).
   */
  roundingLg?: number;

  /**
   * Default components small size outline width.
   */
  outlineSm?: number;

  /**
   * Default components outline width.
   */
  outline?: number;

  /**
   * Default components large size outline width.
   */
  outlineLg?: number;

  /**
   * Default color mode.
   */
  colorMode?: `${ColorMode}`;
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
   * Classes which will be applied to the root element of all vueless components.
   */
  baseClasses?: string;

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
   * https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts.
   */
  tailwindMerge?: UnknownObject;
}

export type UnknownObject = Record<string, unknown>;
export type UnknownArray = unknown[];
export type UnknownType = string | number | boolean | UnknownObject | undefined | null;

export type ComponentNames = keyof Components & string; // keys union
export type Strategies = "merge" | "replace" | "override";

export type GrayColors = "slate" | "cool" | "zinc" | "neutral" | "stone" | string;
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
  | "rose"
  | string;

export interface Directives {
  tooltip?: Partial<Props>;
}

export interface Components {
  UText: Partial<typeof UTextDefaultConfig>;
  UAlert: Partial<typeof UAlertDefaultConfig>;
  UEmpty: Partial<typeof UEmptyDefaultConfig>;
  UFile: Partial<typeof UFileDefaultConfig>;
  UFiles: Partial<typeof UFilesDefaultConfig>;
  UMoney: Partial<typeof UMoneyDefaultConfig>;
  UHeader: Partial<typeof UHeaderDefaultConfig>;
  UNotify: Partial<typeof UNotifyDefaultConfig>;
  UNumber: Partial<typeof UNumberDefaultConfig>;
  UDot: Partial<typeof UDotDefaultConfig>;
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
  UDropdownList: Partial<typeof UDropdownListConfig>;
  UAccordion: Partial<typeof UAccordionConfig>;
  UCard: Partial<typeof UCardConfig>;
  UCol: Partial<typeof UColConfig>;
  UDivider: Partial<typeof UDividerConfig>;
  UGroup: Partial<typeof UGroupConfig>;
  UModal: Partial<typeof UModalConfig>;
  UModalConfirm: Partial<typeof UModalConfirmConfig>;
  UPage: Partial<typeof UPageConfig>;
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
  UInputNumber: Partial<typeof UInputNumberConfig>;
  UInputRating: Partial<typeof UInputRatingConfig>;
  UInputSearch: Partial<typeof UInputSearchConfig>;
  UInputFile: Partial<typeof UInputFileConfig>;
  UInputMoney: Partial<typeof UInputMoneyConfig>;
  UDataList: Partial<typeof UDataListConfig>;
  USelect: Partial<typeof USelectConfig>;
  [key: string]: UnknownObject;
}

/* Make all config keys optional and allow to have string and object values. */
export type ComponentConfig<T> = Partial<{
  [K in keyof T]: K extends string
    ? K extends `${string}transition${string}` | `${string}Transition${string}`
      ? Transition
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

export type Defaults = {
  color?: string;
  [key: string]: unknown | UnknownObject;
};

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

export interface CreateVuelessOptions {
  i18n?: LocaleOptions;
}

export interface TailwindColorShades {
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
  "--vl-outline-sm": string;
  "--vl-outline": string;
  "--vl-outline-lg": string;
  "--vl-rounding-sm": string;
  "--vl-rounding": string;
  "--vl-rounding-lg": string;
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
