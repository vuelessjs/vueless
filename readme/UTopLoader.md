## TopLoader config:

Settings for an `ULoaderTop` component (top stripe which appears when API request is pending).

To use this layout, you need to import vuex store from `@vueless/layouts/ui.loader-top/store` and ` @vueless/layouts/ui.loader/store`.

**color** – top stripe color.
- type: String
- default: `blue`
- values: `gray`, `red`, `orange`, `yellow`, `green`, `blue`, `violet`, `fuchsia`

Example:

``` javascript
color: "red"
```

**brandColorGetter** – Vuex Getter to get brand color (brand color) from Vuex store.
- type: String
- default: `""`
- expected data: `String` (for example `#434cd0`)

Example:

``` javascript
colorGetter: "user/topLoaderColor",
```
