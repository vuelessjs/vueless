# Change settings in runtime

To change theme settings at runtime, use the `setTheme()` method anywhere in your app.

```javascript
import { setTheme } from "vueless";
    
setTheme({
  primary: "green",
  neutral: "zink",  
  text: 16, /* px */
  outline: 4, /* px */
  rounding: 8, /* px */
  letterSpacing: 0.025, /* em */
  disabledOpacity: 40, /* percent, % */
  colorMode: "dark", /* dark | light | auto */
});
```

You can set only the parameters you need, and the rest will be taken from `vueless.config.{js,ts}` (if defined there) or from Vueless defaults.

{% hint style="info" %}
When you set the dark mode at runtime, the selected value will be saved into `localStorage` and `cookies` to preserve the user’s preferred setting after the page reloads in CSR, SSR and SSG apps.
{% endhint %}
