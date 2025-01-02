# Custom icons

The `<UIcon>` component also supports custom icons. To use a custom icon, import the SVG icon with the suffix `?component` and pass the imported component in the `:src` prop.

```html
<script setup>
import EqualIcon from "./images/equal.svg?component";
</script>

<UIcon :src="EqualIcon" />
```

## Custom library

If all the icons you plan to use are custom, you can define your own library path in the config to reference the icons from your project.

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
