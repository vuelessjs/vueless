/* eslint-disable prettier/prettier */
import { createLocale, LocaleSymbol } from "./composables/useLocale.ts";
import { createLoaderOverlay, LoaderOverlaySymbol } from "./ui.loader-overlay/useLoaderOverlay.js";
import { createLoaderProgress, LoaderProgressSymbol } from "./ui.loader-progress/useLoaderProgress.js";
import { themeInit } from "./utils/theme.ts";

import type { App } from 'vue'
import type { CreateVuelessOptions } from './types.ts'

export { setTitle } from "./utils/helper.ts";
export { setTheme } from "./utils/theme.ts";
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
/* eslint-enable prettier/prettier */

export function createVueless(options: CreateVuelessOptions = {}) {
  const i18n = createLocale(options.i18n);
  const loaderOverlay = createLoaderOverlay();
  const loaderProgress = createLoaderProgress();

  const install = (app: App) => {
    app.provide(LocaleSymbol, i18n);
    app.provide(LoaderOverlaySymbol, loaderOverlay);
    app.provide(LoaderProgressSymbol, loaderProgress);
  };

  themeInit();

  return {
    install,
  };
}
