# Override existing component

If Vueless customization options are not enough for your needs, you can fully override and modify any Vueless component.

{% tabs %}
{% tab title="npm" %}
```bash
npx vueless copy <src>

# example: 
# npx vueless copy UButton
```
{% endtab %}

{% tab title="yarn" %}
```bash
yarn vueless copy <src>

# example:
# yarn vueless copy UButton
```
{% endtab %}

{% tab title="pnpm" %}
```bash
pnpm exec vueless copy <src>

# example: 
# pnpm exec vueless copy UButton
```
{% endtab %}

{% tab title="bun" %}
```bash
bunx vueless copy <src>

# example:
# bunx vueless copy UButton
```
{% endtab %}
{% endtabs %}

The component will be created in the `.vueless/components` folder.

{% hint style="warning" %}
Use this approach only when absolutely necessary, as you will need to manually update the component after each new Vueless release.
{% endhint %}
