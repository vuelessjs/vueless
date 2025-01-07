# Advanced settings

Loading SVG icons supported by [`@vueless/plugin-vite`](https://github.com/vuelessjs/vueless-plugin-vite) which was inspired by [`vite-svg-loader`](https://github.com/jpkleemans/vite-svg-loader). This allows efficient handling of SVG icons in your Vueless project.

## Changing SVG optimisation config

For loading SVGs [`@vueless/plugin-vite`](https://github.com/vuelessjs/vueless-plugin-vite) uses [SVGO](https://github.com/svg/svgo) by default. We’ve provided an optimal configuration that covers most use cases.&#x20;

However, if you encounter issues with your custom SVG icons rendering, you can customize the configuration by passing your own settings under the `svgoConfig` key, ([see SVGO plugin docs](https://svgo.dev/docs/preset-default/) for more details).

{% code title="vite.config.{js,ts}" %}
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

## Disable SVG optimization

You can disable SVGO globally as well by setting the svgo option to false in the Vueless Vite plugin config. This will prevent SVGO from processing the SVGs in `dev` and `prod` environments.

{% code title="vite.config.{js,ts}" %}
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

SVGO can also be explicitly disabled for a specific import by adding the `?skipsvgo` suffix to the SVG import path. This ensures that SVGO optimization will be skipped for that particular SVG file, allowing you to use the raw SVG without any modifications.

```html
<script setup>
import IconWithoutOptimization from "./my-icon.svg?skipsvgo"
</script>

<UIcon :src="IconWithoutOptimization" />
```
