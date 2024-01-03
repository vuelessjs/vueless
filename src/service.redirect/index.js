import I18nServiceDefault from "vueless/service.i18n";

export default class RedirectServiceDefault {
  static currentLocale = new I18nServiceDefault().getActiveLanguage();

  static getFallbackLocale(redirectLinks, fallBackLocale) {
    const localeKeys = Object.keys(redirectLinks);

    return localeKeys.includes(fallBackLocale) ? fallBackLocale : localeKeys.at(0);
  }

  static redirect(redirectLinks, fallBackLocale) {
    let href =
      redirectLinks[this.currentLocale] ||
      redirectLinks[this.getFallbackLocale(redirectLinks, fallBackLocale)] ||
      redirectLinks[I18nServiceDefault.FALLBACK_LOCALE];

    if (href) window.location = href;
  }
}
