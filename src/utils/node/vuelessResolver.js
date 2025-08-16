/**
 Custom vueless UI library resolver for "unplugin-vue-components" Vite plugin.

 When new components are added, please add related to them data into an `COMPONENTS` object with a format:
 - key = component name;
 - value = component folder;

 Docs: https://github.com/unplugin/unplugin-vue-components?tab=readme-ov-file#importing-from-ui-libraries
 */

import { COMPONENTS, DIRECTIVES } from "../../constants.js";

/**
 * Resolver for Vueless components.
 * @param {string} componentName
 * @return {Object} Component path
 */
export function componentResolver(componentName) {
  const folder = COMPONENTS[componentName];

  if (folder) {
    return {
      from: `vueless/${folder}/${componentName}.vue`,
    };
  }
}

/**
 * Resolver for Vueless directives.
 * @param {string} directiveName
 * @return {Object} Directive path
 */
export function directiveResolver(directiveName) {
  const folder = DIRECTIVES[directiveName];

  if (folder) {
    return {
      from: `vueless/${folder}/${directiveName}.vue`,
    };
  }
}
