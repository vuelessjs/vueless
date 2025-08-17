declare module "*.svg?url" {
  const src: string;
  export default src;
}

declare module "*.svg?raw" {
  const content: string;
  export default content;
}

declare module "*.svg?component" {
  import type { DefineComponent, SVGAttributes } from "vue";
  const component: DefineComponent<SVGAttributes> | undefined;
  export default component;
}

declare module "*.svg?skipsvgo" {
  import type { DefineComponent, SVGAttributes } from "vue";
  const component: DefineComponent<SVGAttributes> | undefined;
  export default component;
}

declare module "virtual:vueless/icons" {
  import type { UnknownArray } from "./types";
  export const cachedIcons: UnknownArray;
}
