declare module "unplugin-vue-components" {
  export function VuelessUnpluginComponents(options?: unknown): import("vite").Plugin<unknown> & {
    api: import("unplugin-vue-components/types.js").PublicPluginAPI;
  };
}

declare module "Vueless" {
  import { Plugin } from "vite";
  import { Config } from "svgo";
  function Vueless(options?: {
    env?: string;
    mode?: string;
    debug?: boolean;
    include?: string[];
    mirrorCacheDir?: string;
    svgoConfig?: Config;
    svgo?: boolean;
    defaultImport?: "url" | "raw" | "component";
  }): Plugin;
  export default Vueless;
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
