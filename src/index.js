/* eslint-disable vue/max-len, prettier/prettier */
import { createLocale, LocaleSymbol } from "./composables/useLocale.js";
import { createLoaderOverlay, LoaderOverlaySymbol } from "./ui.loader-overlay/useLoaderOverlay.js";
import { createLoaderProgress, LoaderProgressSymbol } from "./ui.loader-progress/useLoaderProgress.js";
import { themeInit } from "./utils/utilTheme.js";

export { setTitle } from "./utils/utilHelper.js";
export { setTheme } from "./utils/utilTheme.js";
export { default as createVueI18nAdapter } from "./adatper.locale/vue-i18n.js";
export { default as defaultEnLocale } from "./adatper.locale/locales/en.js";
export { useLocale } from "./composables/useLocale.js";
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
/* eslint-enable vue/max-len, prettier/prettier */

export function createVueless(options = {}) {
  const i18n = createLocale(options.i18n);
  const loaderOverlay = createLoaderOverlay();
  const loaderProgress = createLoaderProgress();

  const install = (app) => {
    app.provide(LocaleSymbol, i18n);
    app.provide(LoaderOverlaySymbol, loaderOverlay);
    app.provide(LoaderProgressSymbol, loaderProgress);
  };

  themeInit();

  return {
    install,
  };
}
