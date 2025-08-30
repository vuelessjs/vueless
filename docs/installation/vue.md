# Quick start (Vue)

## New project

To start using Vueless UI, run the following command:

{% tabs %}
{% tab title="npm" %}
```bash
npm create vueless@latest
```
{% endtab %}

{% tab title="yarn" %}
```bash
# For Yarn (v1+)
yarn create vueless

# For Yarn Modern (v2+)
$ yarn create vueless@latest
  
# For Yarn ^v4.11
$ yarn dlx create-vueless@latest
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm create vueless@latest
```

{% hint style="info" %}
Use the `--pnpm` flag when working with pnpm. This will generate a `.npmrc` file preconfigured with the necessary settings for the Vueless package.
{% endhint %}
{% endtab %}

{% tab title="bun" %}
```bash
bun create vueless@latest
```
{% endtab %}
{% endtabs %}

This command guides you through a few setup options, then generates a new scaffolded Vue + Vueless UI project with the complete application structure.

## Existing project

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
yarn vueless init --yarn
```

{% hint style="info" %}
Use the `--yarn` flag when working with Yarn 2+ or newer. This will generate a `.yarnrc.yml` file preconfigured with the necessary settings for the Vueless package.
{% endhint %}
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add vueless
pnpm exec vueless init --pnpm
```

{% hint style="info" %}
Use the `--pnpm` flag when working with pnpm. This will generate a `.npmrc` file preconfigured with the necessary settings for the Vueless package.
{% endhint %}
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

3\. Import Tailwind CSS and Vueless at the top of the main CSS file.

{% code title="main.css" %}
```scss
@import "tailwindcss";
@import "vueless";
```
{% endcode %}

4\. Add Vite plugins.

{% code title="vite.config.{js,ts}" overflow="wrap" %}
```javascript
import { Vueless, TailwindCSS, UnpluginComponents } from "vueless/plugin-vite";

export default defineConfig({
  plugins: [
    ...
    Vueless(),
    TailwindCSS(),
    UnpluginComponents(),
  ],
  ...
});
```
{% endcode %}

That’s it! Vueless is now ready to use in your app ✨

