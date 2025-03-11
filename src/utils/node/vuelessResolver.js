/**
 Custom vueless UI library resolver for "unplugin-vue-components" Vite plugin.

 When new components are added, please add related to them data into an `COMPONENTS` object with a format:
 - key = component name;
 - value = component folder;

 Docs: https://github.com/unplugin/unplugin-vue-components?tab=readme-ov-file#importing-from-ui-libraries
 */

import { COMPONENTS } from "../../constants.js";

export function componentResolver(componentName) {
  const folder = COMPONENTS[componentName];

  if (folder) {
    return {
      from: `vueless/${folder}/${componentName}.vue`,
    };
  }
}

export const directiveResolver = {
  type: "directive",
  resolve(name) {
    const folder = name[0].toLowerCase() + name.slice(1);

    return {
      from: `vueless/directives/${folder}/v${name}.ts`,
    };
  },
};
