# Storybook UI docs

For the component documentation Vueless use [Storybook](https://storybook.js.org/).

In some cases you may need to run our Storybook UI Docs locally, so for that reason we created optional and zero config package.

**Why you may need to install it:**

* If you going to significantly change the look of the components.
* If you going to debug your custom stylings in a more easier way.
* If you going to build and publish your styled docs.&#x20;

## Installation

1\. Install the package.

{% tabs %}
{% tab title="npm" %}
```bash
npm install -D @vueless/storybook
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn add -D @vueless/storybook
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm add -D @vueless/storybook
```
{% endtab %}

{% tab title="bun" %}
```bash
bun add @vueless/storybook -d
```
{% endtab %}
{% endtabs %}

2\. Run the command to apply Vueless Storybook preset to the project.

```bash
npx @vueless/storybook
```

Which:

* creates `.storybook` config folder in the root of the project.
* adds commands into the project `package.json` to run and build Storybook locally.
