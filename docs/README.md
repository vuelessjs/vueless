# Quick start (Vue)

1\. Install Vueless package.

{% tabs %}
{% tab title="npm" %}
```bash
npm install vueless
npx vueless init
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add vueless
yarn vueless init
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add vueless
pnpm exec vueless init
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add vueless
bunx vueless init
```
{% endtab %}
{% endtabs %}

2\. In the file where you create the Vue application, add the following code:&#x20;

{% code title="main.{js,ts}" %}
```javascript
import { createApp } from 'vue';
import { createVueless } from "vueless";
import App from './App.vue';

const vueless = createVueless();

createApp(App).use(vueless).mount('#app');
```
{% endcode %}

3\. Install and configure [TailwindCSS](https://tailwindcss.com/docs/guides/vite#vue) (if not already done) and add `vuelessPreset`.

{% code title="tailwind.config.{js,ts}" %}
```javascript
import { vuelessPreset } from "vueless/preset-tailwind";

export default {
  presets: [vuelessPreset],
  ...
};
```
{% endcode %}

4\. Add Vite plugins.

{% code title="vite.config.{js,ts}" overflow="wrap" %}
```javascript
import { Vueless, VuelessUnpluginComponents } from "vueless/plugin-vite";

export default defineConfig({
  plugins: [
    ...
    Vueless(),
    VuelessUnpluginComponents(),
  ],
  ...
});
```
{% endcode %}

That’s it! Vueless is now ready to use in your app ✨

