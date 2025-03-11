# Create new component

To speed up the development process, we provide a boilerplate with a minimal file structure. You can copy it into your components folder with a single command.

{% tabs %}
{% tab title="npm" %}
```bash
npx vueless create <componentName>

# example:
# npx vueless create URadioCard
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn vueless create <componentName>

# example:
# yarn vueless create URadioCard
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm exec vueless create <componentName>

# example:
# pnpm exec vueless create URadioCard
```
{% endtab %}

{% tab title="bun" %}
```bash
bunx vueless create <componentName>

# example:
# bunx vueless create URadioCard
```
{% endtab %}
{% endtabs %}

The component will be created in the project's `/components` folder:

* `/src/components/<componentName>` – for Vue
* `/components/<componentName>` – for Nuxt

