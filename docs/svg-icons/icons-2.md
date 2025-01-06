# Dynamic import

Before the build, Vueless automatically scans the project files and collects all the icons. If Vueless can’t recognize an icon, it may be skipped, meaning it will be lost after the build.

To avoid this behavior and ensure all icons are included in the build, follow the rules below or add the required icons to the safelist.

```html
<!-- ✅ this will work (string) -->
<UIcon name="close" />

<!-- ✅ this will work too (ternary operator with strings) -->
<UIcon name="isOpened ? 'arrow_up' : 'arrow_down'" />

<!-- 🛑 this won't work (variable) -->
<UIcon :name="stateIcon" />
```

If you need to use icon names in JavaScript, declare them within a JavaScript object. If the key in the object contains the word `icon`, it will be automatically recognized by Vueless and the icon will be included in the build.

<pre class="language-html"><code class="lang-html">&#x3C;script setup>
import { computed } from "vue";

/* here is the trick */
const icons = {
<strong>  iconArrowUp: "arrow_up",
</strong><strong>  iconArrowDown: "arrow_down",
</strong>}

const stateIcon = computed(() => isOpened ? icons.iconArrowUp : icons.iconArrowDown);
&#x3C;/script>

&#x3C;UIcon :name="stateIcon" />
</code></pre>

## Icons safelisting

If you don’t want to use the object approach, you can simply add the required icons into the safelist to ensure they are included in the build.

{% code title="vueless.config.js" %}
```js
export default {
  component: {
    UIcon: {
      safelistIcons: ["1k", "2d", "close"],
    }
  }
};
```
{% endcode %}

{% hint style="info" %}
In this case, both outlined and solid/filled icons will be safelisted, ensuring that both versions are included in the build.
{% endhint %}
