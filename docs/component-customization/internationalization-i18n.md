# Internationalization (i18n)

You can specify locale messages and a default locale for Vueless components. Additionally, you can integrate the package with [vue-i18n](https://vue-i18n.intlify.dev/).

## Defining locales

Vueless supports only the English locale by default. To add additional locales, you can provide them in the `createVueless()` function under the `i18n` key, using the structure shown below.

The full list of locale keys available in Vueless UI can be found in the Default Config chapter of the  [Vueless UI docs](https://ui.vueless.com/), at the end of each page.

{% tabs %}
{% tab title="Vue-i18n" %}
To integrate the [`vue-i18n`](https://vue-i18n.intlify.dev/) library with Vueless components, use the `createVueI18nAdapter()` function. This will allow Vueless components to work seamlessly with the [`vue-i18n`](https://vue-i18n.intlify.dev/) package for localization.

{% code title="main.{js,ts}" %}
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
  i18n: {
    adapter: createVueI18nAdapter(i18n),
  },
});
```
{% endcode %}
{% endtab %}

{% tab title="Vueless-i18n" %}
Vueless provides minimal built-in support for internationalization (i18n) out of the box. However, we strongly recommend using [`vue-i18n`](https://vue-i18n.intlify.dev/) alongside `vueless-i18n` to take full advantage of advanced i18n features.

{% code title="main.{js,ts}" %}
```javascript
import { createVueless, defaultEnLocale } from "vueless";

const vueless = createVueless({
  i18n: {
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
{% endtab %}

{% tab title="Nuxt i18n" %}
The built-in internationalization support in Vueless works fine with Nuxt. However, you will need to use the [Nuxt I18n module](https://i18n.nuxtjs.org/) for more advanced features like route localization. \
\
Run to install Nuxt i18n:

```bash
npx nuxi@latest module add @nuxtjs/i18n
```

You can extend and overwrite [locales](https://i18n.nuxtjs.org/docs/getting-started/usage) in locales directory.

```json
locales/en.json

{
  "USelect": {
    "listIsEmpty": "List is empty.",
    "noDataToShow": "No data to show.",
    "clear": "clear",
    "addMore": "Add more..."
  },
  "projectMessageOne": "Hello wrold!",
  "projectMessageTwo": "Brave new world."
}
```
{% endtab %}
{% endtabs %}



## Changing current locale

If you’re using [`vue-i18n`](https://vue-i18n.intlify.dev/), you can change the current locale using the provided `useI18n` composable. However, if you want to change the locale without[`vue-i18n`](https://vue-i18n.intlify.dev/), you can use the `useLocale` composable provided by Vueless. This composable allows you to manage the locale directly within the Vueless library.

{% tabs %}
{% tab title=" Vue-i18n" %}
```html
<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
locale.value = "ua";
</script>
```
{% endtab %}

{% tab title=" Vueless-i18n" %}
```html
<script setup>
import { useLocale } from "vueless"

const { locale } = useLocale();
locale.value = "ua";
</script>
```
{% endtab %}

{% tab title="Nuxt i18n" %}
```html
<script setup>
const { setLocale } = useI18n();

setLocale("ua");
</script>
```
{% endtab %}
{% endtabs %}

## Customizing messages in specific component

You can easily set custom messages for a specific component by providing the `i18n` key in the component’s config.

```html
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const selectConfig = {
  i18n: {
    listIsEmpty: t("label.listIsEmpty"), // dynamyc message
    clear: "x", // static message
  }
}
</script>

<USelect :config="selectConfig">
```
