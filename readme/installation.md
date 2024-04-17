# Installation
Learn how to install and configure the package in your Vue app.

## Quick Start

1\. Install `vueless` to your project:

```bash
# npm
npm install vueless

# yarn
yarn add vueless

# pnpm
pnpm add vueless
```

2\. Create `vueless.config.js` at the root of your project.

```js
export default {
  color: {},
  component: {},
};
```

3\. Add vueless preset into `tailwind.config.js`.

```js
import { vuelessPreset } from "vueless/service.tailwind";

export default {
  presets: [vuelessPreset],
  ...
};
```

4\. Add Vueless Vite plugins into `vite.config.js`.

```js
import { Vueless, VuelessUnpluginComponents } from "vueless/plugin.vite";

export default defineConfig({
  plugins: [
    ...
    Vueless(),
    VuelessUnpluginComponents(),
  ],
  ...
})
```

5\. Configure your `package.json`.

```json
{
  ...
  "web-types": "vueless/web-types.json"
}
```

Where:
* `web-types` – add props and values autocompletion to your IDE.

<br/>

That's it! You can now use all the components in your Vue app ✨

## IntelliSense
If you're using **VSCode** or **JetBrains** IDEs (WebStorm, PHPStorm, etc..) you can configure autocompletion for the classes.

**What you'll get:**
* Autocompletion on typing.
* Autocompletion on objects by prefixing them with `/*tw*/`
* Autocompletion when using the `config` prop.

**An example SFC using IntelliSense:**

```jsx
<template>
  <UCard :config="config" />
</template>

<script setup>
const config = /*tw*/ {
  background: 'bg-white dark:bg-slate-900'
}
</script>
```

### VSCode
* Install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  extension.
* Set the plugin configuration below in the file `.vscode/settings.json`.

```json
{
  "files.associations": {
      "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
      "strings": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["config:\\s*{([^)]*)\\s*}", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["/\\*tw\\*/\\s*{([^;]*)}", ":\\s*[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "tailwindCSS.classAttributes": ["class", "className", "ngClass", "config"]
}
```


### JetBrains IDEs
* Check if [Tailwind CSS IntelliSense](https://www.jetbrains.com/help/webstorm/tailwind-css.html) 
  already installed in the IDE, if not, install it in extensions.
* Set the plugin configuration below in `Settings` > `Languages & Frameworks` > `Style Sheets` > `Tailwind CSS`.

```json
{
  "includeLanguages": {
    "javascript": "javascript"
  },
  "suggestions": true,
  "classAttributes": ["class", "className", "ngClass", "config"],
  "experimental": {
    "classRegex": [
      ["config:\\s*{([^)]*)\\s*}", "[\"'`]([^\"'`]*).*?[\"'`]"],
      ["/\\*tw\\*/\\s*{([^;]*)}", ":\\s*[\"'`]([^\"'`]*).*?[\"'`]"]
    ]
  }
}
```






