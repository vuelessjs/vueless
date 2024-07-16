# Overview

You can customise the look and feel of the components and change the default library configuration in  `vueless.config.js`.

***

## Colors

Components are based on a `brand` and a `gray` color.&#x20;

<pre class="language-js" data-title="vueless.config.js"><code class="lang-js">export default {
  brand: "blue",
  gray: "stone",
}<a data-footnote-ref href="#user-content-fn-1">;</a>
</code></pre>

Vueless uses Tailwind CSS under the hood, so you can use any of the [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors#color-palette-reference) or your own custom colors.

See [Colors](colors.md) chapter for more details.

***

## Components

Components are styled with [Tailwind CSS](https://tailwindcss.com/) and you can override any class of each component.&#x20;

{% code title="vueless.config.js" %}
```js
export default {
  component: {
    UButton: {
      button: "bg-red-500 w-full",
      text: "px-4 text-lg font-bold"
    }
  }
};
```
{% endcode %}

You can find the config keys (`button`, `text`, etc...) and default classes in **Default config** block of Vueless [component docs](https://ui.vueless.com) which placed at the end of each component page.

See [Components](components.md) chapter for more details.

***

## Icons

Vueless supports three popular icon libraries: `@material-symbols`, `bootstrap-icons`, `heroicons`. You can change it like this.

{% code title="vueless.config.js" %}
```js
export default {
  component: {
    UIcon: {
      defaultVariants: {
        library: "bootstrap-icons",
      }
    }
  }
};
```
{% endcode %}

See [Icons](icons.md) chapter for more details.

***

## Internationalization (i18n)

You can specify locale messages and a default locale for Vueless components and integrate it with [vue-i18n](https://vue-i18n.intlify.dev/) as well.

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

See [Internationalization (i18n) ](internationalization-i18n.md)chapter for more details.



[^1]: 
