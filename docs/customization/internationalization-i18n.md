# Internationalization (i18n)

When bootstrapping your application, you can specify available locales and the default locale for vueless components. Vueless also supports integration with [vue-i18n](https://vue-i18n.intlify.dev/).



### Getting started

Vueless supports only English locale by default. To set additional custom locales, provide locale key with the following structure:

```javascript
// main.js

import { createVueless, defaultEnLocale } from "vueless";

const vueless = createVueless({
    locale: {
       locale: "en" // default locale
       fallback: "en" // fallback locale
       massages: {
          en: { // customize or overwrite default english locale
             ...defaultEnLocale,
             componentName: { // USelect for example
                messageOne: "...",
                messageTwo: "...",
                ...
             }
          }
       
          ua: { // new custom locale
             componentName: {
                messageOne: "...",
                messageTne: "...",
                ...
             }
          }
       } 
    }
});
```

### Vue-i18n integration

Use `createVueI18nAdapter` function to integrate vue-i18n library with Vueless components.

```javascript
// main.js

import { createVueless, defaultEnLocale, createVueI18nAdapter } from "vueless";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
    legacy: false,
    locale: "ua",
    fallbackLocale: "en",
    messages: {
        en: {
            ...defaultEnLocale,
            someYourMessageOne: "Hello wrold!",
            someYourMessageTwo: "Brave new world",
        },
        ua: {
            componentName: { // USelect for example
                messageOne: "...",
                messageTwo: "...",
                ...
            },
            someYourMessageOne: "Привіт світ!",
            someYourMessageTwo: "Прекрасний новий світ",
        }
    }
});

const vuless = createVueless({
    locale: {
        adapter: createVueI18nAdapter(i18n),
    }
});
```

### Customizing text content in specific component

You can provide custom massages for specific component, providing `i18n` key in component's config.&#x20;

```javascript
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const someComponentConfig = {
    i18n: {
        dynamicExampleMesssage: t("exampleMessage"),
        staticExampleMesssage: "Some example message",
    }
}
```
