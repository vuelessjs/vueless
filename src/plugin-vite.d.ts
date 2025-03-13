import { Config } from "svgo";
import { Plugin } from "vite";

declare function Vueless(options?: {
  env?: string;
  mode?: string;
  debug?: boolean;
  include?: string[];
  mirrorCacheDir?: string;
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

declare module "*.svg?component" {
  import type { FunctionalComponent, SVGAttributes } from "vue";
  const component: FunctionalComponent<SVGAttributes>;
  export default component;
}

declare module "*.svg?url" {
  const src: string;
  export default src;
}

declare module "*.svg?raw" {
  const content: string;
  export default content;
}

declare module "*.svg?skipsvgo" {
  import type { FunctionalComponent, SVGAttributes } from "vue";
  const component: FunctionalComponent<SVGAttributes>;
  export default component;
}
