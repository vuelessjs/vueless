# Class autocompletion

## IntelliSense

If you’re using VSCode or JetBrains IDEs (WebStorm, PHPStorm, etc.), you can set up class autocompletion.

**Benefits:**

* Autocompletion when typing in the `class` attribute.
* Autocompletion in objects by prefixing them with `/*tw*/`.
* Autocompletion inside the `config` prop.

**Example of an SFC with IntelliSense:**

```jsx
<template>
  <UCard :config="config" />
</template>

<script setup>
const config = /*tw*/ {
  card: 'bg-white dark:bg-slate-900'
}
</script>
```

## VSCode

* Install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extension.
* Add the following extension configuration to your VSCode settings.

{% code title=".vscode/settings.json" %}
```json
{
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
{% endcode %}

## JetBrains IDEs

* Ensure the [Tailwind CSS IntelliSense](https://www.jetbrains.com/help/webstorm/tailwind-css.html) extension is installed in your IDE. If it’s not, install it.
* Add the following extension configuration below in `Settings` > `Languages & Frameworks` > `Style Sheets` > `Tailwind CSS`.

```json
{
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
