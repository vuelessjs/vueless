# Custom icons

The `<UIcon>` component also supports custom SVG icons. To use a custom icon, import it with the suffix `?component` and pass the imported component in the `:src` prop.

```html
<script setup>
import EqualIcon from "./images/equal.svg?component";
</script>

<UIcon :src="EqualIcon" />
```

## Custom library

To reference all icons from your project, specify your library path in the config.

{% code title="vueless.config.js" %}
```javascript
export default {
  component: {
    UIcon: {
      defaults: {
        library: "custom-icons", /* tells Vueless that the library is custom */
        path: "src/assets/icons", /* path to the icons folder from the project root */
      }
    }
  }
};
```
{% endcode %}

{% hint style="info" %}
In this case, the library name should be `custom-icons`, which is a predefined name.
{% endhint %}

Afterward, you can use the icons by passing the prop name in the `<UIcon>` component.

```html
<UIcon :name="equal-icon" />
```
