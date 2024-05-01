import { createLocale, LocaleSymbol } from "./composable.locale";

export { default as createVueI18nAdapter } from "./adatper.locale/vue-i18n";
export { default as defaultEnLocale } from "./adatper.locale/locales/en";
export { default as useLoaderRendering } from "./ui.loader-rendering/composables/useLoaderRendering";
export { default as useLoaderTop } from "./ui.loader-top/composables/useLoaderTop";
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

  const install = (app) => {
    app.provide(LocaleSymbol, i18n);
  };

  return {
    install,
  };
}
