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

declare module "virtual:vueless/icons" {
  import type { UnknownArray } from "./types.ts";
  export const cachedIcons: UnknownArray;
}
