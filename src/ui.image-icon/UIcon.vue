<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

import useUI from "../composables/useUI.ts";
import { vTooltip } from "../directives";
import { getDefaults } from "../utils/ui.ts";
import { isSSR } from "../utils/helper.ts";
import { VUELESS_ICONS_CACHED_DIR, VUELESS_LIBRARY } from "../constants.js";

import { UIcon } from "./constants.ts";
import defaultConfig from "./config.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, UIcon),
  tooltipSettings: () => ({}),
});

const emit = defineEmits([
  /**
   * Triggers when the icon is clicked.
   */
  "click",
]);

const generatedIcons = computed(() => {
  return (
    Object.entries(
      import.meta.glob(`/node_modules/.cache/vueless/assets/icons/**/*.svg`, {
        eager: true,
        query: "?component",
      }),
    ) || []
  );
});

const dynamicComponent = computed(() => {
  const FILL_SUFFIX = "-fill";

  const isInternalIcon = Boolean(
    generatedIcons.value.find(([path]) => path.includes(VUELESS_LIBRARY + "/" + props.name)),
  );

  const userLibrary = config.value.defaults.library;
  const library = props.internal && isInternalIcon ? VUELESS_LIBRARY : userLibrary;
  const weight = config.value.defaults.weight;
  const style = config.value.defaults.style;
  const isFill = props.name?.endsWith(FILL_SUFFIX);
  const name = props.name;
  const src = props.src;

  /* Edge case */
  if (!src && !name) return "";

  /* Static import */
  if (src?.render) {
    return src.render({}, {});
  }

  /* Dynamic import */
  if (!name) return "";

  function getIcon(params: Array<string | number | undefined>) {
    const [, component] =
      generatedIcons.value.find(([path]) =>
        params.every(
          (param) => (isFill || !path.includes(FILL_SUFFIX)) && path.includes(String(param)),
        ),
      ) || [];

    return component;
  }

  /* eslint-disable prettier/prettier */
  const libraries = {
    "vueless": async () => {
      return import.meta.env.PROD
        ? await getIcon([name])
        : isSSR
          ? import(/* @vite-ignore */ `${VUELESS_ICONS_CACHED_DIR}/${VUELESS_LIBRARY}/${name}.svg?component`)
          : import(/* @vite-ignore */ `/${VUELESS_ICONS_CACHED_DIR}/${VUELESS_LIBRARY}/${name}.svg?component`);
    },
    "@material-symbols": async () => {
      return import.meta.env.PROD
        ? await getIcon([
          library,
          weight,
          style,
          name
        ])
        : isSSR
          ? import(/* @vite-ignore */ `node_modules/${library}/svg-${weight}/${style}/${name}.svg?component`)
          : import(/* @vite-ignore */ `/node_modules/${library}/svg-${weight}/${style}/${name}.svg?component`);
    },
    "bootstrap-icons": async () => {
      return import.meta.env.PROD
        ? await getIcon([library, name])
        : isSSR
          ? import(/* @vite-ignore */ `node_modules/${library}/icons/${name}.svg?component`)
          : import(/* @vite-ignore */ `/node_modules/${library}/icons/${name}.svg?component`);
    },
    "heroicons": async () => {
      const fillType = isFill ? "solid" : "outline";

      return import.meta.env.PROD
        ? await getIcon([library, fillType, name])
        : isSSR
          ? import(/* @vite-ignore */ `node_modules/${library}/24/${fillType}/${name}.svg?component`)
          : import(/* @vite-ignore */ `/node_modules/${library}/24/${fillType}/${name}.svg?component`);
    },
  };
  /* eslint-enable prettier/prettier */

  return defineAsyncComponent(libraries[library]);
});

const tooltipConfig = computed(() => ({
  onShow: () => !!props.tooltip,
  ...props.tooltipSettings,
  content: props.tooltip,
}));

function onClick(event: MouseEvent) {
  emit("click", event);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const { config, iconAttrs } = useUI<Config>(defaultConfig);
</script>

<template>
  <component
    :is="dynamicComponent"
    v-tooltip="tooltipConfig"
    tabindex="-1"
    v-bind="iconAttrs"
    :data-test="dataTest"
    @click="onClick"
  />
</template>
