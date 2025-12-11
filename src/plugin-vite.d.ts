import { Config } from "svgo";
import { Plugin } from "vite";

declare function Vueless(options?: {
  env?: string;
  debug?: boolean;
  include?: string[];
  basePath?: string;
  svgoConfig?: Config;
  svgo?: boolean;
  defaultImport?: "url" | "raw" | "component";
}): Plugin;

declare function UnpluginComponents(options?: unknown): Plugin & {
  api: import("unplugin-vue-components/types.js").PublicPluginAPI;
};

declare function TailwindCSS(options?: unknown): Plugin;

declare module "vueless/plugin-vite" {
  export { Vueless, UnpluginComponents, TailwindCSS };
}

declare module "vueless/plugin-vite.js" {
  export { Vueless, UnpluginComponents, TailwindCSS };
}
