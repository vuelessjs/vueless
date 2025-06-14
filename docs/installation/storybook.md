# Storybook docs

If you going to debug component stylings in a more easier way you can use our [Storybook](https://storybook.js.org/) preset to style and test components in isolation.

## Installation

1\. Install the package as a dev dependency and apply Vueless Storybook preset to the project.

{% tabs %}
{% tab title="npm" %}
```bash
npm install -D @vueless/storybook
npx @vueless/storybook
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add -D @vueless/storybook
yarn @vueless/storybook
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add -D @vueless/storybook --pnpm
pnpm exec @vueless/storybook
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @vueless/storybook -d
bunx @vueless/storybook
```
{% endtab %}
{% endtabs %}

Which:

* creates `.storybook` folder with all needed configuration in the project's root.
* adds commands into the project `package.json` to run and build Storybook locally.
* creates `.npmrc` config (for `pnpm` project only).

{% hint style="info" %}
If the `.storybook` folder already exists, the command will back it up by renaming it to `.storybook-backup-{timestamp}`. You should migrate your custom configuration (if any) and remove the backup folder manually afterward.
{% endhint %}

2\. Run the Storybook ✨

```
npm run sb:dev
```

Other available commands:

```bash
# run Storybook in docs mode (same as seen on ui.vueless.com)
npm run sb:dev:docs

# build Storybook
npm run sb:build

# preview built Storybook locally
npm run sb:preview
```

## Hiding unused components in Storybook

If you don’t plan to use certain Vueless components, you can hide them from Storybook by setting the `storybook` key to `false` in the specific component’s config.

For example, if you don’t plan to use `UPagination` and `UBadge` in your project, you can configure them as follows:

{% code title="vueless.config.{js,ts}" %}
```js
export default {
  component: {
    UPagination: {
      storybook: false,
    },
    UBadge: {
      storybook: false,
    },
  },
};
```
{% endcode %}



