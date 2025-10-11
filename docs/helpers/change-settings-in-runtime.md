# Runtime theming

## setTheme

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
When you set the dark mode at runtime, the selected value will be saved into  `cookies` to preserve the user’s preferred setting after the page reloads in CSR, SSR and SSG apps.
{% endhint %}

## getTheme

To retrieve theme settings, use the `getTheme()` method.

```javascript
import { getTheme, getCookie } from "vueless";
    
const theme = getTheme();

// or

const themeWithConfig = getTheme({
  rounding: getCookie("vl-rounding"),
});
```

## resetTheme

To clear stored runtime theme data use the `resetTheme()` method.

```javascript
import { resetTheme } from "vueless";
    
resetTheme();
```

## normalizeThemeConfig

Use the `normalizeThemeConfig()` helper to convert config values to proper types before calling `setTheme()` method.

```javascript
import { normalizeThemeConfig, setTheme } from "vueless";
    
const config = normalizeThemeConfig({
  text: {
    sm: "12",
    md: "14",
    lg: "16",
  },
  colorMode: "dark",
  isColorModeAuto: "1",
  ...
});

/*
  This returns in `config` const:
  {
    text: {
      sm: 12,
      md: 14,
      lg: 16,
    },
    colorMode: "dark",
    isColorModeAuto: true,
  }
*/

setTheme(config);
```
