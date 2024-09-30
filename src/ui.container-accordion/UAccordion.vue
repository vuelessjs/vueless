<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs" @click="onClickItem">
    <div v-bind="bodyAttrs">
      <div v-bind="labelAttrs">
        {{ label }}
        <!--
          @slot Use it to add something instead of the toggle icon.
          @binding {string} icon-name
          @binding {string} icon-size
          @binding {boolean} opened
        -->
        <slot name="toggle" :icon-name="toggleIcon" :icon-size="size" :opened="isOpened">
          <UIcon :name="toggleIcon" :size="size" color="gray" internal v-bind="toggleIconAttrs" />
        </slot>
      </div>

      <div :id="`description-${elementId}`" v-bind="descriptionAttrs" v-text="description" />
    </div>

    <UDivider :size="dividerSize" v-bind="dividerAttrs" />
  </div>
</template>

<script setup>
import { computed, ref, useId } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import UDivider from "../ui.container-divider/UDivider.vue";
import { getDefault } from "../utils/utilUI.js";

import { UAccordion } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Accordion label.
   */
  label: {
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
   * Accordion size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UAccordion).size,
  },

  /**
   * Unique element id.
   */
  id: {
    type: String,
    default: "",
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
   * @property {string} elementId
   * @property {boolean} isOpened
   */
  "click",
]);

const isOpened = ref(false);

const elementId = props.id || useId();

const {
  config,
  wrapperAttrs,
  descriptionAttrs,
  bodyAttrs,
  labelAttrs,
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

  emit("click", elementId, isOpened.value);
}
</script>
