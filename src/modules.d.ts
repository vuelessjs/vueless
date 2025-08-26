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

declare module "vueless/storybook" {
  import type { Config, UnknownObject } from "./types";
  export function defineConfigWithVueless(config: Config): Promise<UnknownObject>;
  export function getVuelessStoriesGlob(vuelessEnv: string): Promise<string[]>;
}

declare module "virtual:vueless/icons" {
  import type { UnknownArray } from "./types";
  export const cachedIcons: UnknownArray;
}

/* Fake minimal types just to suppress errors */
declare module "virtual:vueless/vue-i18n" {
  import type { UnknownObject } from "./types";
  export type I18n = UnknownObject;
  export type VueMessageType = UnknownObject;
}
