# Quick Start

1\. Install `vueless` package.

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
{% endtabs %}

2\. Create `vueless.config.js` at the root of the project.

{% code title="vueless.config.js" %}
```javascript
export default {
  color: {},
  component: {},
};
```
{% endcode %}

3\. Add TailwindCSS preset.

<pre class="language-javascript" data-title="tailwind.config.js"><code class="lang-javascript"><strong>import { vuelessPreset } from "vueless/preset.tailwind";
</strong>
export default {
  presets: [vuelessPreset],
  ...
};
</code></pre>

4\. Add Vite plugins.

{% code title="vite.config.mjs" overflow="wrap" %}
```javascript
import { Vueless, VuelessUnpluginComponents } from "@vueless/plugin-vite";

export default defineConfig({
  plugins: [
    ...
    Vueless(),
    VuelessUnpluginComponents(),
  ],
  ...
})
```
{% endcode %}

That's it! You can use components in your app now ✨

