# Vueless – Vue Styleless UI Component Framework

![logo.png](public/images/logo.png)

## About the project

* [Documentation](https://docs.vueless.com/)
* [UI Components](https://ui.vueless.com/)
* [Website](http://vueless.com/)

## Quick Start

1. Install `vueless` UI library packages.

```bash
npm install vueless @vueless/plugin-vite
```

2. Create `vueless.config.js` at the root of the project.

```javascript filename="vueless.config.js" title="vueless.config.js"
export default {
  color: {},
  component: {},
};
```

3. Add TailwindCSS preset.

```javascript
import { vuelessPreset } from "vueless/preset.tailwind";

export default {
  presets: [vuelessPreset],
  ...
};
```

4. Add Vite plugins.

```javascript
import { Vueless, VuelessUnpluginComponents } from "@vueless/plugin-vite";

export default defineConfig({
  plugins: [
    ...
    Vueless(),
    VuelessUnpluginComponents(),
  ],
  ...
})
```

That's it! You can use components in your app now ✨



