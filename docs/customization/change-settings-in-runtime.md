# Change settings in runtime

To change theme settings in runtime use `setTheme()` method anywhere in you app. &#x20;

```javascript
import { setTheme } from "vueless";
    
setTheme({
  brand: "green",
  gray: "zink",  
  ring: 4, /* px */
  ringOffset: 0, /* px */
  rounding: 8, /* px */
  darkMode: true, /* true | false | undefined */
});
```

You can set the only params you need and the rest of them will be taken from `vueless.config.js` (if it defined there) or from Vueless defaults.

{% hint style="info" %}
When you set the **dark mode** in runtime, selected value will be saved into `localStorage` to keep user preferred setting after the page reload.
{% endhint %}
