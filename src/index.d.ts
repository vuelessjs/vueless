import type { App } from "vue";
import type { CreateVuelessOptions } from "./types.ts";
export { setTheme } from "./utils/theme.ts";
export { cx, cva, compose, getDefaults } from "./utils/ui.ts";
export {
  isSSR,
  isCSR,
  getRandomId,
  setTitle,
  createDebounce,
  hasSlotContent,
} from "./utils/helper.ts";
export { getArgTypes, getSlotNames, getSlotsFragment, getSource } from "./utils/storybook.ts";
export { isMac, isPWA, isIOS, isAndroid, isMobileApp, isWindows } from "./utils/platform.ts";
export { default as createVueI18nAdapter } from "./adatper.locale/vue-i18n.ts";
export { default as defaultEnLocale } from "./adatper.locale/locales/en.ts";
export { default as useUI } from "./composables/useUI.ts";
export { useLocale } from "./composables/useLocale.ts";
export { useLoaderProgress } from "./ui.loader-progress/useLoaderProgress.ts";
export { loaderProgressOn, loaderProgressOff } from "./ui.loader-progress/utilLoaderProgress.ts";
export { useLoaderOverlay } from "./ui.loader-overlay/useLoaderOverlay.ts";
export { loaderOverlayOn, loaderOverlayOff } from "./ui.loader-overlay/utilLoaderOverlay.ts";
export {
  notify,
  notifySuccess,
  notifyWarning,
  notifyError,
  clearNotifications,
  setDelayedNotify,
  getDelayedNotify,
} from "./ui.text-notify/utilNotify.ts";
export declare function createVueless(options?: CreateVuelessOptions): {
  install: (app: App) => void;
};
