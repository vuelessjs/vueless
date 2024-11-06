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

<script setup>
import { computed, defineAsyncComponent } from "vue";
import { getDefault } from "../utils/ui.ts";
import { isSSR } from "../utils/helper.ts";

import { UIcon } from "./constants.js";
import defaultConfig from "./config.ts";
import useAttrs from "./useAttrs.js";

import { vTooltip } from "../directives";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Icon name.
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Icon source (svg as a vue component).
   */
  src: {
    type: Object,
    default: () => {},
  },

  /**
   * Icon color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, UIcon).color,
  },

  /**
   * Icon size.
   * @values 4xs, 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UIcon).size,
  },

  /**
   * Icon variant.
   * @values light, default, dark
   */
  variant: {
    type: String,
    default: getDefault(defaultConfig, UIcon).variant,
  },

  /**
   * Make the icon interactive (cursor pointer, etc.).
   */
  interactive: {
    type: Boolean,
    default: getDefault(defaultConfig, UIcon).interactive,
  },

  /**
   * Add tooltip text on hover.
   */
  tooltip: {
    type: String,
    default: "",
  },

  /**
   * Tooltip settings.
   * [See all settings here](https://kabbouchi.github.io/vue-tippy/4.0/features/placement.html).
   */
  tooltipSettings: {
    type: Object,
    default: () => {},
  },

  /**
   * Component config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },

  /**
   * Mark that Icon used inside Vueless components (used to get icons from vueless library).
   * @ignore
   */
  internal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  /**
   * Triggers when the icon is clicked.
   */
  "click",
]);

const { config, iconAttrs } = useAttrs(props);

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

  const isDefaultIcon = Boolean(generatedIcons.value.find(([path]) => path.includes(props.name)));
  const userLibrary = config.value.defaults.library;

  const library = props.internal && isDefaultIcon ? "vueless" : userLibrary;
  const weight = config.value.defaults.weight;
  const style = config.value.defaults.style;
  const isFill = props.name.endsWith(FILL_SUFFIX);
  const name = props.name;
  const src = props.src;

  /* Edge case */
  if (!src && !name) return "";

  /* Static import */
  if (src) return src.render({}, {});

  /* Dynamic import */
  if (!name) return "";

  function getIcon(params) {
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
          ? import(/* @vite-ignore */ `node_modules/.cache/vueless/assets/icons/${name}.svg?component`)
          : import(/* @vite-ignore */ `/node_modules/.cache/vueless/assets/icons/${name}.svg?component`);
    },
    "@material-symbols": async () => {
      return import.meta.env.PROD
        ? await getIcon([library, weight, style, name])
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

function onClick(event) {
  emit("click", event);
}
</script>
