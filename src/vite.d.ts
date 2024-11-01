export function VuelessUnpluginComponents(options: any): import("vite").Plugin<any> & {
  api: import("unplugin-vue-components/types.js").PublicPluginAPI;
};
export function Vueless(options?: {
  mode?: string;
  debug?: boolean;
  env?: string;
  include?: string[];
}): {
  name: string;
  enforce: string;
  config: () => {
    define: {
      "process.env": {};
    };
    optimizeDeps: {
      include: string[];
    };
  };
  configResolved: (config: any) => Promise<void>;
  buildEnd: () => Promise<void>;
  load: (id: any) => Promise<string>;
  handleHotUpdate: ({ file, read }: { file: any; read: any }) => Promise<void>;
};
