import { getCurrentInstance, useAttrs, Comment, Text, Fragment } from "vue";
import { cx, globalComponentConfig, strategyOverwrite } from "vueless/service.ui";

/*
  Merging component configs in a given sequence (bigger number = bigger priority):
  1. Default component config
  2. Custom global component config (/vueless.config.js)
  3. Component config (:ui="{...}" props)
  4. Component classes (class="...")
*/
export function useUI(defaultConfig = {}, propsConfig = {}, topLevelClassKey = "wrapper") {
  const { name: componentName } = getCurrentInstance().type;
  const globalConfig = globalComponentConfig[componentName];

  const attrs = useAttrs();

  const ui = strategyOverwrite
    ? { ...defaultConfig, ...globalConfig, ...propsConfig }
    : mergeConfigs({ defaultConfig, globalConfig, propsConfig });

  ui[topLevelClassKey] = cx([ui[topLevelClassKey], attrs.class]);

  return {
    ui,
    hasSlotContent,
  };
}

/*
  Recursively merge config objects with tailwind classes duplicates removing.
 */
function mergeConfigs({ defaultConfig, globalConfig, propsConfig, ui = {} }) {
  globalConfig = globalConfig || {};
  propsConfig = propsConfig || {};

  const isGlobalConfig = Object.keys(globalConfig).length;
  const isPropsConfig = Object.keys(propsConfig).length;

  for (let key in defaultConfig) {
    if (isGlobalConfig || isPropsConfig) {
      const isObject = typeof defaultConfig[key] === "object";
      const isEmpty = defaultConfig[key] === null;

      ui[key] =
        isObject && !isEmpty
          ? mergeConfigs({
              defaultConfig: defaultConfig[key],
              globalConfig: globalConfig[key],
              propsConfig: propsConfig[key],
              ui: defaultConfig[key],
            })
          : cx([defaultConfig[key], globalConfig[key], propsConfig[key]]);
    } else {
      ui[key] = defaultConfig[key];
    }
  }

  return ui;
}

/**
  Check if slot defined, and have a content.
  @returns boolean
 */
function hasSlotContent(slot, props = {}) {
  const asArray = (arg) => (Array.isArray(arg) ? arg : arg != null ? [arg] : []);

  const isVNodeEmpty = (vnode) => {
    return (
      !vnode ||
      asArray(vnode).every(
        (vnode) =>
          vnode.type === Comment ||
          (vnode.type === Text && !vnode.children?.length) ||
          (vnode.type === Fragment && !vnode.children?.length),
      )
    );
  };

  return !isVNodeEmpty(slot?.(props));
}
