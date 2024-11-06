![logo.png](public/images/vueless-logo-git.png)

## Vueless UI

* [Documentation](https://docs.vueless.com/)
* [UI Components](https://ui.vueless.com/)
* [Website](http://vueless.com/)

## Quick Start

1. Install `vueless` UI library packages.

```bash
npm install vueless
```


2. In the file where you create the Vue application, add the following code:
```javascript
import { createApp } from 'vue';
import { createVueless } from "vueless";
import App from './App.vue';

const vueless = createVueless();

createApp(App).use(vueless).mount('#app');
```

3. Add TailwindCSS preset.

```javascript
import { vuelessPreset } from "vueless/preset-tailwind";

export default {
  presets: [vuelessPreset],
  ...
};
```

4. Add Vite plugins.

```javascript
import { Vueless, VuelessUnpluginComponents } from "vueless/plugin-vite";

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



