# Quick start (Nuxt)

1\. Install Vueless Nuxt module.

{% tabs %}
{% tab title="npm" %}
```bash
npm install @vueless/nuxt
npx vueless init
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add @vueless/nuxt
yarn vueless init
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add @vueless/nuxt
pnpm exec vueless init
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @vueless/nuxt
bunx vueless init
```
{% endtab %}
{% endtabs %}

2\. Register `@vueless/nuxt` into the Nuxt config `modules` section.

{% code title="nuxt.config.{js,ts}" %}
```javascript
export default defineNuxtConfig({
  modules: [
    '@vueless/nuxt'
  ],
  ...
})

```
{% endcode %}

3\. Import Tailwind CSS and Vueless at the top of the main CSS file.

{% code title="main.css" %}
```scss
@import "tailwindcss";
@import "vueless";
```
{% endcode %}

That’s it! Vueless is now ready to use in your app ✨

