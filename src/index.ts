/* eslint-disable prettier/prettier */
import { createLocale, LocaleSymbol } from "./composables/useLocale";
import { createLoaderOverlay, LoaderOverlaySymbol } from "./ui.loader-overlay/useLoaderOverlay";
import { createLoaderProgress, LoaderProgressSymbol } from "./ui.loader-progress/useLoaderProgress";
import { setTheme } from "./utils/theme";
import { setVuelessConfig } from "./utils/ui";

import type { App } from "vue"
import type { CreateVuelessOptions } from "./types.ts"

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
export { addToRequestQueue, removeFromRequestQueue } from "./utils/requestQueue";
export { isMac, isPWA, isIOS, isAndroid, isMobileApp, isWindows } from "./utils/platform";
export { cx, cva, compose, getDefaults, setVuelessConfig, setColor, vuelessConfig } from "./utils/ui";
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

export function createVueless(options: CreateVuelessOptions = {}) {
  const i18n = createLocale(options.i18n);
  const loaderOverlay = createLoaderOverlay();
  const loaderProgress = createLoaderProgress();

  const install = (app: App) => {
    app.provide(LocaleSymbol, i18n);
    app.provide(LoaderOverlaySymbol, loaderOverlay);
    app.provide(LoaderProgressSymbol, loaderProgress);
  };

  /* set vueless config from a client (uses in Nuxt) */
  setVuelessConfig(options.config);

  /* init theme after first render */
  setTimeout(setTheme, 0);

  return {
    install,
  };
}
