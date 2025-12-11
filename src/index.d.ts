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
/* Export enums directly (not as types) */
export { ColorMode } from "./types";

export declare function createVueless(options?: CreateVuelessOptions): {
  install: (app: App) => void;
};
