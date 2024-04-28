# Icons

The library supports three popular icon libraries:

* `@material-symbols/svg-{weight}`, where {weight} is number from 100 to 700 (`@material-symbols/svg-500` is default).
* `bootstrap-icons`
* `heroicons`

{% hint style="info" %}
The package works only with SVG icons.
{% endhint %}

#### Icons safelist colors

If you set some icon names dynamically in `UIcon` component, then them may be skipped on a build stage. To avoid this behavior and include the icons in the build, you can add them into a safelist.

```js
// vueless.config.js

export default {
  component: {
    UIcon: {
      safelistIcons: ["1k", "2d", "close"],
    }
  }
};
```

> In this case, the regular and filled icon variants will be added into the build.
