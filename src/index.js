import { createLocale, LocaleSymbol } from "./composable.locale";
import {
  createLoaderRendering,
  LoaderRenderingSymbol,
} from "./ui.loader-rendering/composables/useLoaderRendering";
import { createLoaderTop, LoaderTopSymbol } from "./ui.loader-top/composables/useLoaderTop";

export { default as createVueI18nAdapter } from "./adatper.locale/vue-i18n";
export { default as defaultEnLocale } from "./adatper.locale/locales/en";
export { useLocale } from "./composable.locale";
export { useLoaderRendering } from "./ui.loader-rendering/composables/useLoaderRendering";
export { useLoaderTop } from "./ui.loader-top/composables/useLoaderTop";
export {
  loaderRenderingOn,
  loaderRenderingOff,
} from "./ui.loader-rendering/services/loaderRedering.service";
export { loaderTopOn, loaderTopOff } from "./ui.loader-top/services/loaderTop.service";
export {
  notify,
  notifySuccess,
  notifyWarning,
  notifyError,
  clearNotifications,
  setDelayedNotify,
  getDelayedNotify,
} from "./ui.text-notify/services";

export function createVueless(options = {}) {
  const i18n = createLocale(options.i18n);
  const loaderRendering = createLoaderRendering();
  const loaderTop = createLoaderTop();

  const install = (app) => {
    app.provide(LocaleSymbol, i18n);
    app.provide(LoaderRenderingSymbol, loaderRendering);
    app.provide(LoaderTopSymbol, loaderTop);
  };

  return {
    install,
  };
}
