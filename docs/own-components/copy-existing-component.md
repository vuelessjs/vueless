# Copy existing component

If Vueless customization options are not enough for your needs, you can fully copy and modify any Vueless component.

{% hint style="warning" %}
However, use this approach only when absolutely necessary, as you will need to manually update the component after each new Vueless release.

**Note:** We do not provide free support for custom components.
{% endhint %}

{% tabs %}
{% tab title="npm" %}
```bash
npx vueless copy <src> <target>

# example: 
# npx vueless copy UButton CustomButton
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn vueless copy <src> <target>

# example:
# yarn vueless copy UButton CustomButton
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm exec vueless copy <src> <target>

# example: 
# pnpm exec vueless copy UButton CustomButton
```
{% endtab %}

{% tab title="bun" %}
```bash
bunx vueless copy <src> <target>

# example:
# bunx vueless copy UButton CustomButton
```
{% endtab %}
{% endtabs %}

The component will be created in the project's `/components` folder:

* `/src/components/<componentName>` – for Vue
* `/components/<componentName>` – for Nuxt
