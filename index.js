import { createLocale, LocaleSymbol } from "./src/composable.locale";

export { default as createVueI18nAdapter } from "./src/adatpers.locale/vue-i18n";
export { default as defaultEnLocale } from "./src/adatpers.locale/locales/en";

export function createVueless(options = {}) {
  const locale = createLocale(options.locale);

  const install = (app) => {
    app.provide(LocaleSymbol, locale);
  };

  return {
    install,
  };
}
