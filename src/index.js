/* eslint-disable vue/max-len, prettier/prettier */
import { createLocale, LocaleSymbol } from "./composables/useLocale.js";
import { createLoaderRendering, LoaderRenderingSymbol } from "./ui.loader-rendering/composables/useLoaderRendering";
import { createLoaderTop, LoaderTopSymbol } from "./ui.loader-top/composables/useLoaderTop";
import { themeInit } from "./utils/utilTheme.js";

export { setTitle } from "./utils/utilHelper.js";
export { setTheme } from "./utils/utilTheme.js";
export { default as createVueI18nAdapter } from "./adatper.locale/vue-i18n";
export { default as defaultEnLocale } from "./adatper.locale/locales/en";
export { useLocale } from "./composables/useLocale.js";
export { useLoaderTop } from "./ui.loader-top/composables/useLoaderTop";
export { loaderTopOn, loaderTopOff } from "./ui.loader-top/services/loaderTop.service";
export { useLoaderRendering } from "./ui.loader-rendering/composables/useLoaderRendering";
export { loaderRenderingOn, loaderRenderingOff } from "./ui.loader-rendering/services/loaderRedering.service";
export {
  notify,
  notifySuccess,
  notifyWarning,
  notifyError,
  clearNotifications,
  setDelayedNotify,
  getDelayedNotify,
} from "./ui.text-notify/services";
/* eslint-enable vue/max-len, prettier/prettier */

export function createVueless(options = {}) {
  const i18n = createLocale(options.i18n);
  const loaderRendering = createLoaderRendering();
  const loaderTop = createLoaderTop();

  const install = (app) => {
    app.provide(LocaleSymbol, i18n);
    app.provide(LoaderRenderingSymbol, loaderRendering);
    app.provide(LoaderTopSymbol, loaderTop);
  };

  themeInit();

  return {
    install,
  };
}
