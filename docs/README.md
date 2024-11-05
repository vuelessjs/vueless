# Quick start

1\. Install Vueless UI library packages.

{% tabs %}
{% tab title="npm" %}
```bash
npm install vueless
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add vueless
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add vueless
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add vueless
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

3\. Install and configure [TailwindCSS](https://tailwindcss.com/docs/guides/vite#vue) (if not) and add `vuelessPreset` to it.

<pre class="language-javascript" data-title="tailwind.config.{js,ts}"><code class="lang-javascript"><strong>import { vuelessPreset } from "vueless/preset-tailwind.js";
</strong>
export default {
  presets: [vuelessPreset],
  ...
};
</code></pre>

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

That's it! You can use Vueless in your app now ✨

### Minimal requirements

* Node 20+
* Vite 5+
* Vue 3.5+
* TailwindCSS 3.4+

