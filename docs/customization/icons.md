# Icons

Vueless supports three popular SVG icon libraries: `@material-symbols`, `bootstrap-icons`, `heroicons`.

if you going to use `bootstrap-icons` or `heroicons` or other weight of `@material-symbols`  you should install needed package first.

{% tabs %}
{% tab title="npm" %}
```bash
# weight from 100 to 700 available
npm install @material-symbols/svg-400
# or
npm install bootstrap-icons
# or
npm install heroicons
```
{% endtab %}

{% tab title="yarn" %}
```bash
# weight from 100 to 700 available
yarn add @material-symbols/svg-400
# or
yarn add bootstrap-icons
# or
yarn add heroicons
```
{% endtab %}

{% tab title="pnpm" %}
```bash
# weight from 100 to 700 available
pnpm add @material-symbols/svg-400
# or
pnpm add bootstrap-icons
# or
pnpm add heroicons
```
{% endtab %}

{% tab title="bun" %}
<pre class="language-bash"><code class="lang-bash"># weight from 100 to 700 available
bun add @material-symbols/svg-400
# or
<strong>bun add bootstrap-icons
</strong># or
bun add heroicons
</code></pre>
{% endtab %}
{% endtabs %}

And after set the library in the config:

{% tabs %}
{% tab title="@material-symbols/svg-400" %}
{% code title="vueless.config.js" %}
```javascript
export default /*tw*/ {
  component: {
    UIcon: {
      defaultVariants: {
        library: "@material-symbols",
        weight: "400", // 100 | 200 | ... | 700
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
export default /*tw*/ {
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
{% endtab %}

{% tab title="heroicons" %}
{% code title="vueless.config.js" %}
```javascript
export default /*tw*/ {
  component: {
    UIcon: {
      defaultVariants: {
        library: "bootstrap-icons",
        style: "solid", // solid | mini | micro
      }
    }
  }
};
```
{% endcode %}
{% endtab %}
{% endtabs %}

## Custom icons

Vueless `UIcon` component supports custom icons as well. To use it:

* Import the SVG icon, with suffix `?component` at the end.&#x20;
* Pass the imported component in the `:src` prop.

```html
<UIcon :src="EqualIcon" color="gray" />

<script setup>
import EqualIcon from "./images/equal.svg?component";
</script>
```

## Dynamic import

Before the build Vueless automatically scan the project files and collects all the icons. If Vueless can't recognise the icon it may be skipped, what mean's it will be lost after build.

To avoid this behavior and include all the icons into the build, please follow rules below or add needed icons into the safelist.

```html
<!-- ✅ this will work -->
<UIcon name="close" />

<!-- ✅ this will work too -->
<UIcon name="isOpened ? 'arrow_up' : 'arrow_down'" />

<!-- 🛑 this won't work -->
<UIcon :name="stateIcon" />
```

If you need to use icon names in JS you should declare the icon names in any of JS object. If the key in the object includes  `icon` word it will be automatically recognised by Vueless and icon will be added to the build.

```html
<UIcon :name="stateIcon" />

<script setup>
import { computed } from "vue";

/* here is the trick */
const icons = {
  iconArrowUp: "arrow_up",
  iconArrowDown: "arrow_down",
}

const stateIcon = computed(() => isOpened ? icons.iconArrowUp : icons.iconArrowDown);
</script>
```

## Icons safelist colors

if you don't want to use object approach you can simply add needed icons into the safelist.

{% code title="vueless.config.js" %}
```js
export default {
  component: {
    UIcon: {
      safelistIcons: ["1k", "2d", "close"],
    }
  }
};
```
{% endcode %}

{% hint style="info" %}
In this case regular and filled icon variants will be safelistd and added into the build.
{% endhint %}

***

## Deep tuning

Loding SVG icons provided by [`@vueless/plugin-vite`](https://github.com/vuelessjs/vueless-plugin-vite)  which in turn was be inspired by [`vite-svg-loader`](https://github.com/jpkleemans/vite-svg-loader) .

For loading SVG  [`@vueless/plugin-vite`](https://github.com/vuelessjs/vueless-plugin-vite) use [SVGO](https://github.com/svg/svgo) by default. We created and already included optimal config to cover most of the cases, but if you will face with some issues with SVG rendering feel free to change it by passing you own config under the `svgoConfig` key, ([see SVGO plugin docs](https://svgo.dev/docs/preset-default/)).

{% code title="vite.config.js" %}
```javascript
import { Vueless } from "@vueless/plugin-vite";

export default defineConfig({
  plugins: [
    ...
    Vueless({
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                convertColors: {
                  currentColor: true,
                },
              },
            },
          },
        ],
      },
    }),
  ],
  ...
});
```
{% endcode %}

Or you can disable SVGO globally as well.

{% code title="vite.config.js" %}
```javascript
import { Vueless } from "@vueless/plugin-vite";

export default defineConfig({
  plugins: [
    ...
    Vueless({ svgo: false }),
  ],
  ...
});
```
{% endcode %}

SVGO also can be explicitly disabled for one file by adding the `?skipsvgo` suffix.

```html
<UIcon :src="IconWithoutOptimizer" />

<script setup>
import IconWithoutOptimizer from "./my-icon.svg?skipsvgo"
</script>
```

