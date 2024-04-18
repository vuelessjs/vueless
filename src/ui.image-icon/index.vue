<template>
  <div
    v-tippy="tippyConfig"
    :data-cy="dataCy"
    v-bind="wrapperAttrs"
    @focus="onFocus"
    @blur="onBlur"
    @click="onClick"
  >
    <div v-bind="containerAttrs">
      <component :is="dynamicComponent" v-bind="iconAttrs" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import { directive as tippyDirective, setDefaultProps as tippySetConfig } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";
import UIService from "../service.ui";

import { UIcon } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

tippySetConfig({
  arrow: true,
  theme: "light",
  animation: "shift-away",
});

/* Should be a string for correct web-types gen */
defineOptions({
  name: "UIcon",
  directives: { tippy: tippyDirective },
  inheritAttrs: false,
});

const props = defineProps({
  /**
   * Icon SVG data source (svg as a vue component).
   */
  src: {
    type: [String, Object],
    default: "",
  },

  /**
   * Name of the icon.
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Change icon variant from outline to filled.
   */
  fill: {
    type: Boolean,
    default: UIService.get(defaultConfig, UIcon).default.fill,
  },

  /**
   * Icon color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UIcon).default.color,
  },

  /**
   * Icon size.
   * @values 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UIcon).default.size,
  },

  /**
   * Set pill mild semi-transparent background and solid colour icon.
   */
  pill: {
    type: Boolean,
    default: UIService.get(defaultConfig, UIcon).default.pill,
  },

  /**
   * Icon variant.
   * @values light, default, dark
   */
  variant: {
    type: String,
    default: UIService.get(defaultConfig, UIcon).default.variant,
  },

  /**
   * Add interactive states to the icon (hover, clicked).
   */
  interactive: {
    type: Boolean,
    default: UIService.get(defaultConfig, UIcon).default.interactive,
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
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click", "focus", "blur"]);

const { config, wrapperAttrs, containerAttrs, iconAttrs } = useAttrs(props);

let generatedIcons = [];

if (import.meta.env.PROD) {
  // when building storybook inside the package (only for Vueless contributors).
  if (import.meta.env.STORYBOOK_VUELESS_ENV) {
    generatedIcons = Object.entries(
      import.meta.glob(`../assets/images/.generated/**/*.svg`, {
        eager: true,
        query: "?component",
      }),
    );
  } else {
    generatedIcons = Object.entries(
      import.meta.glob(`../../../../src/assets/images/.generated/**/*.svg`, {
        eager: true,
        query: "?component",
      }),
    );
  }
}

const dynamicComponent = computed(() => {
  const library = config.value.defaultVariants.library;
  const weight = config.value.defaultVariants.weight;
  const style = config.value.defaultVariants.style;
  const fill = props.fill || config.value.defaultVariants.fill ? "-fill" : "";
  const name = props.name;
  const src = props.src;

  /* Edge case */
  if (!src && !name) return "";

  /* Static import */
  if (src) return src.render();

  /* Dynamic import */
  if (!name) return "";

  function getIcon(params) {
    const [, component] = generatedIcons.find(([path]) =>
      params.every((param) => path.includes(param)),
    );

    return component;
  }

  /* eslint-disable vue/max-len, prettier/prettier */
  const libraries = {
    "@material-symbols": async () => {
      return import.meta.env.PROD
        ? await getIcon([library, weight, style, name, fill])
        : import(/* @vite-ignore */ `/node_modules/${library}/svg-${weight}/${style}/${name}${fill}.svg?component`);
    },
    "bootstrap-icons": async () => {
      return import.meta.env.PROD
        ? await getIcon([library, name, fill])
        : import(/* @vite-ignore */ `/node_modules/${library}/icons/${name}${fill}.svg?component`);
    },
    heroicons: async () => {
      const fillType = fill ? "solid" : "outline";

      return import.meta.env.PROD
        ? await getIcon([library, style, fillType, name])
        : import(/* @vite-ignore */ `/node_modules/${library}/${style}/${fillType}/${name}.svg?component`);
    },
  };
  /* eslint-enable vue/max-len, prettier/prettier */

  return defineAsyncComponent(libraries[library]);
});

const tippyConfig = computed(() => {
  return { onShow: () => !!props.tooltip, ...props.tooltipSettings, content: props.tooltip };
});

function onClick(event) {
  emit("click", event);
}

function onFocus() {
  emit("focus");
}

function onBlur(event) {
  emit("blur", event);
}
</script>
