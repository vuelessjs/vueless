# Vueless Vite Plugins

## Vueless()

This plugin enables core Vueless functionality such as automatic SVG icon imports, dynamic Tailwind color class safelisting, prop extension and restriction, and more.

#### Parameters

* `include` – Specify an array of files or folders that differs from the default structure of Vue/Nuxt projects. Use this to tell Vueless where your custom project files are located.
* `debug` – Enable to display debug logs in the terminal.

## UnpluginComponents()

This plugin enables automatic import of Vueless components used in your project. It is built on top of  [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components), and supports the same configuration options as the original plugin.

## TailwindCSS()

This plugin ensures proper parsing of Tailwind CSS classes and uses two original TailwindCSS Vite plugins: [@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite) (default) and [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss). All configuration options are the same as in the original plugins.

#### Parameters

* `postcss` – boolean, if `true` uses [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss) otherwise [@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite).

