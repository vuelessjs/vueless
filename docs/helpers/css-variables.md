# CSS variables

Helpers for reading and applying the runtime `--vl-*` CSS theme variables. For most apps `setTheme()` (see Runtime theming) is the friendlier entry point — these are the lower-level building blocks.

### cssVar

Read the live, resolved value of a CSS custom property from `:root`. Useful for bridging theme values into non-CSS contexts (canvas, charts, etc.).

```javascript
import { cssVar } from "vueless";

const primary = cssVar("--vl-primary-600");
chart.setLineColor(primary ?? "#2563eb");
```

* `name` — the CSS variable name including the leading `--`.

Returns the computed value (reflecting the currently applied theme / dark mode), or `undefined` on the server or when the variable is not defined.

### setRootCSSVariables

Generate and apply the full set of Vueless CSS variables from an already-resolved theme config. This is the low-level apply step that `setTheme()` calls internally.

```javascript
import { getTheme, setRootCSSVariables } from "vueless";

const theme = getTheme({ primary: "blue", rounding: 8 });
const cssText = setRootCSSVariables(theme);

// For SSR you can inline the returned string into the page <head>:
// `<style id="vl-theme-tokens">${cssText}</style>`
```

* `vars` — a fully-resolved `MergedThemeConfig` (the shape produced by `getTheme()`), including `text`, `outline`, `rounding`, `spacing`, `letterSpacing`, `disabledOpacity`, `primary`, `neutral`, and `lightTheme` / `darkTheme` maps.

Returns a string of the generated CSS rule text. On the client it also injects/updates a `<style>` element so the variables take effect immediately; on the server it just returns the string for SSR inlining.

{% hint style="info" %}
Prefer `setTheme(config)` for everyday theme changes — it resolves and merges the config for you before applying. Reach for `setRootCSSVariables` only when you already have a merged config or need the raw CSS string.
{% endhint %}
