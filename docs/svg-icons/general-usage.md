# General usage

Vueless supports the dynamic import of SVG icons, so you don’t need to explicitly import them. Simply set the icon name in the component, and you’ll get perfectly optimized SVG icons in your project.&#x20;

***

Vueless comes with built-in support for four popular SVG icon libraries:&#x20;

* `@material-symbols` ([icon list](https://fonts.google.com/icons))
* `bootstrap-icons` ([icon list](https://icons.getbootstrap.com/))
* `heroicons` ([icon list](https://heroicons.com/outline))
* `lucide-static` ([icon list](https://lucide.dev/icons/))

1\. Install the desired icon library package.

{% tabs %}
{% tab title="npm" %}
```bash
# weight from 100 to 700 is available
npm install @material-symbols/svg-500
# or
npm install bootstrap-icons
# or
npm install heroicons
# or
npm install lucide-static
```
{% endtab %}

{% tab title="yarn" %}
```bash
# weight from 100 to 700 available
yarn add @material-symbols/svg-500
# or
yarn add bootstrap-icons
# or
yarn add heroicons
# or
yarn add lucide-static
```
{% endtab %}

{% tab title="pnpm" %}
```bash
# weight from 100 to 700 available
pnpm add @material-symbols/svg-500
# or
pnpm add bootstrap-icons
# or
pnpm add heroicons
# or
pnpm add lucide-static
```
{% endtab %}

{% tab title="bun" %}
```bash
# weight from 100 to 700 available
bun add @material-symbols/svg-500
# or
bun add bootstrap-icons
# or
bun add heroicons
# or
bun add lucide-static
```
{% endtab %}
{% endtabs %}

2\. Define the icon library inside the `defaults` key of the `UIcon` component configuration.

{% tabs %}
{% tab title="@material-symbols/svg-500" %}
{% code title="vueless.config.js" %}
```javascript
export default {
  component: {
    UIcon: {
      defaults: {
        library: "@material-symbols/svg-500",
        style: "outlined", // sharp | rounded | outlined
      }
    }
  }
};
```
{% endcode %}
{% endtab %}

{% tab title="bootstrap-icons" %}
{% code title="vueless.config.js" %}
```javascript
export default {
  component: {
    UIcon: {
      defaults: {
        library: "bootstrap-icons",
      }
    }
  }
};
```
{% endcode %}
{% endtab %}

{% tab title="heroicons" %}
{% code title="vueless.config.js" %}
```javascript
export default {
  component: {
    UIcon: {
      defaults: {
        library: "heroicons",
      }
    }
  }
};
```
{% endcode %}
{% endtab %}
{% endtabs %}

3\. Use the SVG icon anywhere in the project.

```html
<!-- Outlined version -->
<UIcon name="settings" />

<!-- Solid / Filled version -->
<UIcon name="settings-fill" />
```
