import { createLocale, LocaleSymbol } from "./composable.locale";

export { default as createVueI18nAdapter } from "./adatper.locale/vue-i18n";
export { default as defaultEnLocale } from "./adatper.locale/locales/en";
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
  const locale = createLocale(options.locale);

  const install = (app) => {
    app.provide(LocaleSymbol, locale);
  };

  return {
    install,
  };
}
