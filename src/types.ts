import UTextDefaultConfig from "./ui.text-block/config.ts";
import UAlertDefaultConfig from "./ui.text-alert/config.ts";
import UEmptyDefaultConfig from "./ui.text-empty/config.ts";
import UFileDefaultConfig from "./ui.text-file/config.ts";
import UFilesDefaultConfig from "./ui.text-files/config.ts";
import UMoneyDefaultConfig from "./ui.text-money/config.ts";
import UHeaderDefaultConfig from "./ui.text-header/config.ts";
import UNotifyDefaultConfig from "./ui.text-notify/config.ts";
import UDotDefaultConfig from "./ui.other-dot/config.ts";
import UButtonDefaultConfig from "./ui.button/config.ts";
import ULinkDefaultConfig from "./ui.button-link/config.ts";
import UToggleDefaultConfig from "./ui.button-toggle/config.ts";
import UToggleItemDefaultConfig from "./ui.button-toggle-item/config.ts";
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
import UAvatarConfig from "./ui.image-avatar/config.ts";
import UIconConfig from "./ui.image-icon/config.ts";
import UCheckboxConfig from "./ui.form-checkbox/config.ts";
import UCheckboxGroupConfig from "./ui.form-checkbox-group/config.ts";
import UCheckboxMultiStateConfig from "./ui.form-checkbox-multi-state/config.ts";
import URadioConfig from "./ui.form-radio/config.ts";
import URadioGroupConfig from "./ui.form-radio-group/config.ts";

import type { MaybeRef, Ref } from "vue";
import type { Props } from "tippy.js";
import type { LocaleOptions } from "./adatper.locale/vueless.ts";

export type TemplateRefElement = MaybeRef<HTMLElement | HTMLElement[] | null>;

export enum ColorMode {
  Dark = "dark",
  Light = "light",
  Auto = "auto",
}

export interface ExtendedKeyClasses {
  [key: string]: Ref<string>;
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
   * Default components rounding (border-radius).
   */
  rounding?: number;

  /**
   * Default components ring width.
   */
  ring?: number;

  /**
   * Default components ring offset width.
   */
  ringOffset?: number;

  /**
   * Default components ring color for light theme.
   */
  ringOffsetColorLight?: string;

  /**
   * Default components ring color for dark theme.
   */
  ringOffsetColorDark?: string;

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
   * Component configs.
   */
  component?: Partial<Components>;

  /**
   * Directive configs.
   */
  directive?: Partial<Directives>;

  /**
   * Tailwind-merge config extension for custom classes.
   * All lists of rules available here:
   * https://github.com/dcastil/tailwind-merge/blob/v2.3.0/src/lib/default-config.ts.
   */
  tailwindMerge?: UnknownObject;
}

export type UnknownObject = Record<string, unknown>;
export type UnknownArray = Array<unknown>;
export type ComponentNames = keyof Components; // keys union
export type Strategies = "merge" | "replace" | "override";
export type Gray = "gray";
export type GrayColors = "slate" | "cool" | "zinc" | "neutral" | "stone";
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
  | "rose";

export interface Components {
  UText?: Partial<typeof UTextDefaultConfig>;
  UAlert?: Partial<typeof UAlertDefaultConfig>;
  UEmpty?: Partial<typeof UEmptyDefaultConfig>;
  UFile?: Partial<typeof UFileDefaultConfig>;
  UFiles?: Partial<typeof UFilesDefaultConfig>;
  UMoney?: Partial<typeof UMoneyDefaultConfig>;
  UHeader?: Partial<typeof UHeaderDefaultConfig>;
  UNotify?: Partial<typeof UNotifyDefaultConfig>;
  UDot?: Partial<typeof UDotDefaultConfig>;
  UButton?: Partial<typeof UButtonDefaultConfig>;
  ULink?: Partial<typeof ULinkDefaultConfig>;
  UToggle?: Partial<typeof UToggleDefaultConfig>;
  UToggleItem?: Partial<typeof UToggleItemDefaultConfig>;
  UBadge?: Partial<typeof UBadgeDefaultConfig>;
  UCalendar?: Partial<typeof UCalendarDefaultConfig>;
  UDatePicker?: Partial<typeof UDatePickerConfig>;
  UDatePickerRange?: Partial<typeof UDatePickerRangeConfig>;
  UTable?: Partial<typeof UDataTableConfig>;
  UDropdownBadge?: Partial<typeof UDropdownBadgeConfig>;
  UDropdownButton?: Partial<typeof UDropdownButtonConfig>;
  UDropdownLink?: Partial<typeof UDropdownLinkConfig>;
  UDropdownList?: Partial<typeof UDropdownListConfig>;
  UAccordion?: Partial<typeof UAccordionConfig>;
  UCard?: Partial<typeof UCardConfig>;
  UCol?: Partial<typeof UColConfig>;
  UDivider?: Partial<typeof UDividerConfig>;
  UGroup?: Partial<typeof UGroupConfig>;
  UModal?: Partial<typeof UModalConfig>;
  UModalConfirm?: Partial<typeof UModalConfirmConfig>;
  UPage?: Partial<typeof UPageConfig>;
  URow?: Partial<typeof URowConfig>;
  ULoader?: Partial<typeof ULoaderConfig>;
  ULoaderOverlay?: Partial<typeof ULoaderOverlayConfig>;
  ULoaderProgress?: Partial<typeof ULoaderProgressConfig>;
  UPagination?: Partial<typeof UPaginationConfig>;
  UProgress?: Partial<typeof UProgressConfig>;
  UTab?: Partial<typeof UTabConfig>;
  UTabs?: Partial<typeof UTabsConfig>;
  UAvatar?: Partial<typeof UAvatarConfig>;
  UIcon?: Partial<typeof UIconConfig>;
  UCheckbox?: Partial<typeof UCheckboxConfig>;
  UCheckboxGroup?: Partial<typeof UCheckboxGroupConfig>;
  UCheckboxMultiState?: Partial<typeof UCheckboxMultiStateConfig>;
  URadio?: Partial<typeof URadioConfig>;
  URadioGroup?: Partial<typeof URadioGroupConfig>;
}

export interface Directives {
  tooltip?: Partial<Props>;
}

export interface Component {
  i18n?: UnknownObject;
  defaults?: Defaults;
  safelist?: (string: string) => TailwindSafelist[];
  strategy?: Strategies;
  transition?: Transition;
  safelistColors?: BrandColors;
  [key: string]: (CVA & NestedComponent) | object | string | undefined;
}

export type Defaults = {
  color?: string;
  [key: string]: unknown;
};

export interface NestedComponent {
  component: string;
  [key: string]: Record<string, string | object> | string;
}

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

export interface VueAttrs {
  id?: string;
  class?: string;
  value?: string;
}

export type KeysAttrs = Record<string, Ref<UnknownObject | undefined>>;

export interface UseAttrs<TConfig> {
  config: Ref<TConfig | undefined>;
  [key: string]: Ref<TConfig | undefined>;
}

export interface KeyAttrs extends VueAttrs {
  "vl-component"?: string | null;
  "vl-key"?: string | null;
  "vl-child-component"?: string | null;
  "vl-child-key"?: string | null;
  config?: UnknownObject;
  [key: string]: string | UnknownObject | undefined | null;
}

export interface CreateVuelessOptions {
  i18n?: LocaleOptions;
}

export interface TailwindSafelist {
  pattern: string;
  variants?: string[];
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
  "--vl-ring": string;
  "--vl-ring-offset": string;
  "--vl-ring-offset-color": string;
  "--vl-rounding": string;
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
