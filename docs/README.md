# Quick start

1\. Install Vueless UI library packages.

{% tabs %}
{% tab title="npm" %}
```bash
npm install vueless @vueless/plugin-vite
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add vueless @vueless/plugin-vite
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add vueless @vueless/plugin-vite
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add vueless @vueless/plugin-vite
```
{% endtab %}
{% endtabs %}

2\. In the file where you create the Vue application, add the following code:&#x20;

{% code title="main.js" %}
```javascript
import { createApp } from 'vue';
import { createVueless } from "vueless";
import App from './App.vue';

const vueless = createVueless();

createApp(App).use(vueless).mount('#app');
```
{% endcode %}

3\. Create `vueless.config.js` at the root of the project.

{% code title="vueless.config.js" %}
```javascript
export default {
  color: {},
  component: {},
};
```
{% endcode %}

4.Install and configure [TailwindCSS](https://tailwindcss.com/docs/guides/vite#vue) (if not) and add `vuelessPreset` to it.

<pre class="language-javascript" data-title="tailwind.config.js"><code class="lang-javascript"><strong>import { vuelessPreset } from "vueless/preset.tailwind.js";
</strong>
export default {
  presets: [vuelessPreset],
  ...
};
</code></pre>

5\. Add Vite plugins.

{% code title="vite.config.js" overflow="wrap" %}
```javascript
import { Vueless, VuelessUnpluginComponents } from "@vueless/plugin-vite";

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

6\. Migrate you project to ECMAScript modules (ESM).

<pre class="language-javascript" data-title="package.json"><code class="lang-javascript"><strong>{
</strong>  "type": "module",
  ...
}
</code></pre>

That's it! You can use Vueless in your app now ✨

### Minimal requirements

* Node 20+
* Vite 5+
* Vue 3.5+
* TailwindCSS 3.4+

