export function VuelessUnpluginComponents(options?: unknown): import("vite").Plugin<unknown> & {
  api: import("unplugin-vue-components/types.js").PublicPluginAPI;
};

export function Vueless(options?: {
  env?: string;
  mode?: string;
  debug?: boolean;
  include?: string[];
  duplicatedCachePath?: string;
}): never;
