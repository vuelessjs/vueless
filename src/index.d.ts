import type { App } from "vue";
import type { CreateVuelessOptions } from "./types.ts";
export { setTheme } from "./utils/theme.ts";
export { cx, cva, compose } from "./utils/ui.ts";
export { isSSR, isCSR, getRandomId, setTitle, createDebounce } from "./utils/helper.ts";
export { isMac, isPWA, isIOS, isAndroid, isMobileApp, isWindows } from "./utils/platform.ts";
export { default as createVueI18nAdapter } from "./adatper.locale/vue-i18n.js";
export { default as defaultEnLocale } from "./adatper.locale/locales/en.js";
export { useLocale } from "./composables/useLocale.ts";
export { useLoaderProgress } from "./ui.loader-progress/useLoaderProgress.js";
export { loaderProgressOn, loaderProgressOff } from "./ui.loader-progress/utilLoaderProgress.js";
export { useLoaderOverlay } from "./ui.loader-overlay/useLoaderOverlay.js";
export { loaderOverlayOn, loaderOverlayOff } from "./ui.loader-overlay/utilLoaderOverlay.js";
export {
  notify,
  notifySuccess,
  notifyWarning,
  notifyError,
  clearNotifications,
  setDelayedNotify,
  getDelayedNotify,
} from "./ui.text-notify/utilNotify.js";
export declare function createVueless(options?: CreateVuelessOptions): {
  install: (app: App) => void;
};
