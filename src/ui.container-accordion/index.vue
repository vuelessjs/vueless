<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs" @click="onClickItem">
    <div v-bind="bodyAttrs">
      <div v-bind="titleAttrs">
        {{ title }}
        <!--
          @slot Use it to add something instead of the toggle icon.
          @binding {string} icon-size
          @binding {boolean} opened
        -->
        <slot name="toggle" :icon-name="toggleIcon" :icon-size="size" :opened="isOpened">
          <UIcon :name="toggleIcon" :size="size" color="gray" internal v-bind="toggleIconAttrs" />
        </slot>
      </div>

      <div :id="`description-${id}`" v-bind="descriptionAttrs" v-text="description" />
    </div>

    <UDivider :size="dividerSize" v-bind="dividerAttrs" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import UIcon from "../ui.image-icon";
import UDivider from "../ui.container-divider";
import { getRandomId, getDefault } from "../utils/utilsUI";

import { UAccordion } from "./constants/index";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UAccordion", inheritAttrs: false });

const props = defineProps({
  /**
   * Accordion title.
   */
  title: {
    type: String,
    required: true,
  },

  /**
   * Accordion description.
   */
  description: {
    type: String,
    required: true,
  },

  /**
   * Unique block name.
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Accordion size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UAccordion).size,
  },

  /**
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  /**
   * Triggers when the accordion item is toggled.
   * @property {string} name
   */
  "click",
]);

const isOpened = ref(false);

const {
  config,
  wrapperAttrs,
  descriptionAttrs,
  bodyAttrs,
  titleAttrs,
  toggleIconAttrs,
  dividerAttrs,
} = useAttrs(props, { isOpened });

const toggleIcon = computed(() =>
  isOpened.value ? config.value.defaults.collapseIcon : config.value.defaults.expandIcon,
);

const dividerSize = computed(() => {
  const sizes = {
    sm: "md",
    md: "lg",
    lg: "xl",
  };

  return sizes[props.size];
});

function onClickItem() {
  isOpened.value = !isOpened.value;

  emit("click", props.name);
}
</script>
