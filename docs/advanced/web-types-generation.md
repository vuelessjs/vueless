# Web Types generation

To support component recognition by IDEs (WebStorm, etc..) Vueless use  [`@vueless/web-types`](https://www.npmjs.com/package/@vueless/web-types) package for Web-Types generation which in turn was be inspired by [`JetBrains/web-types`](https://github.com/JetBrains/web-types).&#x20;

Vueless UI already included latest `web-types.json` file, so you don't need to do nothing.

But, in some cases you may need to install  [`@vueless/web-types`](https://www.npmjs.com/package/@vueless/web-types), so for that reason we created **optional** and zero config package.

**When you may need to install it:**

* If you going to change default values for props in `vueless.config.js`.
* If you going to use Vue components from the `/component` folder without importing them (unplugin) to remove IDE warnings.
* If you using JSDoc for documenting custom components and want to see props description and autocompletion on the go.

## Installation

1\. Install the package as a dev dependency.

{% tabs %}
{% tab title="npm" %}
```bash
npm install -D @vueless/web-types
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add -D @vueless/web-types
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add -D @vueless/web-types
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @vueless/web-types -d
```
{% endtab %}
{% endtabs %}

2\. Run the command to generate `web-types.json` in the root of the project.

{% tabs %}
{% tab title="default " %}
```bash
# Generate web-types for Vue components from "/src/component" folder.
npx @vueless/web-types
```
{% endtab %}

{% tab title="custom path" %}
```bash
# Generate web-types for Vue components from "/src" folder.
# You can use you own pattern as well.
npx @vueless/web-types 'src/**/*.vue'
```
{% endtab %}
{% endtabs %}

We'd recommend to add this command to `postinstall` in the project `package.json`

{% tabs %}
{% tab title="npm" %}
{% code title="package.json" %}
```json
{
  ...
  "scripts": {
    ...
    "postinstall": "npx @vueless/web-types"
  }
}
```
{% endcode %}
{% endtab %}

{% tab title="yarn" %}
{% code title="package.json" %}
```json
{
  ...
  "scripts": {
    ...
    "postinstall": "yarn dlx @vueless/web-types"
  }
}
```
{% endcode %}
{% endtab %}

{% tab title="pnpm" %}
{% code title="package.json" %}
```json
{
  ...
  "scripts": {
    ...
    "postinstall": "pnpx @vueless/web-types"
  }
}
```
{% endcode %}
{% endtab %}

{% tab title="bun" %}
{% code title="package.json" %}
```json
{
  ...
  "scripts": {
    ...
    "postinstall": "bunx @vueless/web-types"
  }
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

3\. Declare web-types in the project `package.json`.&#x20;

{% code title="package.json" %}
```json
{
  ...
  "web-types": "./web-types.json"
}
```
{% endcode %}

{% hint style="success" %}
It will be added automatically when you start the project in dev mode `npm run dev`. Vueless Vite plugin do this magic for you ✨
{% endhint %}
