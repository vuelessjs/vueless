# Class autocompletion

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

## VSCode

* Install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension.
* Set the plugin configuration below in the file `.vscode/settings.json`.

```json
{
  "files.associations": {
      "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
      "strings": true
  },
  "tailwindCSS.classAttributes": ["class", "config"],
  "tailwindCSS.experimental.classRegex": [
    ["config:\\s*{([^)]*)\\s*}", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["/\\*tw\\*/\\s*{([^;]*)}", ":\\s*[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## JetBrains IDEs

* Check if [Tailwind CSS IntelliSense](https://www.jetbrains.com/help/webstorm/tailwind-css.html) extension already installed in the IDE and install it if not.
* Set the plugin configuration below in `Settings` > `Languages & Frameworks` > `Style Sheets` > `Tailwind CSS`.

```json
{
  "includeLanguages": {
    "javascript": "javascript"
  },
  "suggestions": true,
  "classAttributes": ["class", "config"],
  "experimental": {
    "classRegex": [
      ["config:\\s*{([^)]*)\\s*}", "[\"'`]([^\"'`]*).*?[\"'`]"],
      ["/\\*tw\\*/\\s*{([^;]*)}", ":\\s*[\"'`]([^\"'`]*).*?[\"'`]"]
    ]
  }
}
```
