import type { App } from "vue";
import type { CreateVuelessOptions } from "./types.ts";

/* eslint-disable prettier/prettier */
/* utils */
export {
  isSSR,
  isCSR,
  setTitle,
  getRandomId,
  getCookie,
  setCookie,
  deleteCookie,
  createDebounce,
  hasSlotContent
} from "./utils/helper.ts";
export { getStored, setTheme, cssVar } from "./utils/theme.ts";
export { isMac, isPWA, isIOS, isAndroid, isMobileApp, isWindows } from "./utils/platform.ts";
export { cx, cva, compose, getDefaults, setVuelessConfig, setColor, vuelessConfig } from "./utils/ui.ts";
export { getArgTypes, getSlotNames, getSlotsFragment, getSource, getDocsDescription } from "./utils/storybook.ts";
/* adapters */
export { default as defaultEnLocale } from "./adapter.locale/locales/en.ts";
export { createVuelessAdapter } from "./adapter.locale/vueless.ts";
export { createVueI18nAdapter } from "./adapter.locale/vue-i18n.ts";
/* composables */
export { useLocale } from "./composables/useLocale.ts";
export { default as useUI } from "./composables/useUI.ts";
export { useDarkMode } from "./composables/useDarkMode.ts";
export { useLoaderProgress } from "./ui.loader-progress/useLoaderProgress.ts";
export { useMutationObserver } from "./composables/useMutationObserver.ts";
/* loaders */
export { loaderProgressOn, loaderProgressOff } from "./ui.loader-progress/utilLoaderProgress.ts";
export { useLoaderOverlay } from "./ui.loader-overlay/useLoaderOverlay.ts";
export { loaderOverlayOn, loaderOverlayOff } from "./ui.loader-overlay/utilLoaderOverlay.ts";
/* notifications */
export {
  notify,
  notifySuccess,
  notifyWarning,
  notifyError,
  clearNotifications,
  setDelayedNotify,
  getDelayedNotify,
} from "./ui.text-notify/utilNotify.ts";
export { NotificationType, NotificationPosition, NotificationDuration } from "./ui.text-notify/constants.ts";
/* directives */
export { default as vTooltip }  from "./directives/tooltip/vTooltip.ts";
export { default as vClickOutside }  from "./directives/clickOutside/vClickOutside.ts";
/* eslint-enable prettier/prettier */

export declare function createVueless(options?: CreateVuelessOptions): {
  install: (app: App) => void;
};
