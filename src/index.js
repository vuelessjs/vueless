import { createLocale, LocaleSymbol } from "./composable.locale";
import {
  createLoaderRendering,
  LoaderRenderingSymbol,
} from "./ui.loader-rendering/composables/useLoaderRendering";
import { createLoaderTop, LoaderTopSymbol } from "./ui.loader-top/composables/useLoaderTop";

export { default as createVueI18nAdapter } from "./adatper.locale/vue-i18n";
export { default as defaultEnLocale } from "./adatper.locale/locales/en";
export { useLoaderRendering } from "./ui.loader-rendering/composables/useLoaderRendering";
export { useLoaderTop } from "./ui.loader-top/composables/useLoaderTop";
export { useLocale } from "./composable.locale";
export {
  notify,
  notifySuccess,
  notifyWarning,
  notifyError,
  clearAllNotifications,
  setDelayedNotify,
  getDelayedNotify,
} from "./ui.notify/services";

export function createVueless(options = {}) {
  const i18n = createLocale(options.i18n);
  const loaderRenderingState = createLoaderRendering();
  const loaderTopState = createLoaderTop();

  const install = (app) => {
    app.provide(LocaleSymbol, i18n);
    app.provide(LoaderRenderingSymbol, loaderRenderingState);
    app.provide(LoaderTopSymbol, loaderTopState);
  };

  return {
    install,
  };
}
