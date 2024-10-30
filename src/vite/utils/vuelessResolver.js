/**
 Custom vueless UI library resolver for "unplugin-vue-components" plugin.

 When new components are added, please add related to them data into an object below with a format:
 - key = component name;
 - value = component folder;

 Docs:
 https://github.com/unplugin/unplugin-vue-components?tab=readme-ov-file#importing-from-ui-libraries
 */

import { COMPONENTS } from "../constants.js";

export function componentResolver(componentName) {
  const folder = COMPONENTS[componentName]?.folder;

  if (folder) {
    return { from: `vueless/${folder}/${componentName}.vue` };
  }
}

export const directiveResolver = {
  type: "directive",
  resolve(name) {
    return {
      from: `vueless/directives/v${name}.js`,
    };
  },
};
