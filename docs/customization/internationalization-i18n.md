# Internationalization (i18n)

You can specify locale messages and a default locale for Vueless components and integrate it with [vue-i18n](https://vue-i18n.intlify.dev/) as well.

## Vueless i18n

Vueless supports only English locale by default. To set additional locales, you can provide them in `createVueless()` under the `locale` key with the structure below:

{% code title="main.js" %}
```javascript
import { createVueless, defaultEnLocale } from "vueless";

const vueless = createVueless({
  locale: {
    locale: "en", // default locale
    fallback: "en", // fallback locale
    messages: {
      en: { // customize or overwrite default english locale
        ...defaultEnLocale,
        USelect: { // Vueless component name
          listIsEmpty: "List is empty.",
          noDataToShow: "No data to show.",
          clear: "clear",
          addMore: "Add more...",
        },
      },
      ua: { // new custom locale
        USelect: { // Vueless component name
          listIsEmpty: "Список порожній.",
          noDataToShow: "Дані відсутні.",
          clear: "очистити",
          addMore: "Додати ще...",
        },
      },
    },
  },
});
```
{% endcode %}

Full list of locale keys available in [Vueless UI docs](https://ui.vueless.com/) in **`Default config`** chapter (at the end of each page).

## Vue-i18n integration

Use `createVueI18nAdapter()` to integrate [`vue-i18n`](https://vue-i18n.intlify.dev/) library with Vueless components.

{% code title="main.js" %}
```javascript
import { createVueless, defaultEnLocale, createVueI18nAdapter } from "vueless";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false, // legacy mode should be disabled
  locale: "ua", // default locale
  fallback: "en", // fallback locale
  messages: {
    en: { // customize or overwrite default english locale
      ...defaultEnLocale,
      USelect: { // Vueless component name
        listIsEmpty: "List is empty.",
        noDataToShow: "No data to show.",
        clear: "clear",
        addMore: "Add more...",
      },
      // other project messages
      projectMessageOne: "Hello wrold!",
      projectMessageTwo: "Brave new world.",
    },
    ua: { // new custom locale
      USelect: { // Vueless component name
        listIsEmpty: "Список порожній.",
        noDataToShow: "Дані відсутні.",
        clear: "очистити",
        addMore: "Додати ще...",
      },
      // other project messages
      projectMessageOne: "Привіт світ!",
      projectMessageTwo: "Прекрасний новий світ.",
    },
  },
});

const vueless = createVueless({
  locale: {
    adapter: createVueI18nAdapter(i18n),
  },
});
```
{% endcode %}

## Customising messages in specific component

You can easily set custom massages for specific component by providing `i18n` key in the component's config.&#x20;

```html
<USelect :config="seelctConfig">

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const seelctConfig = {
  i18n: {
    listIsEmpty: t("label.listIsEmpty"), // dynamyc message
    clear: "x", // static message
  }
}
</script>
```
