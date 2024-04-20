<template>
  <div v-bind="wrapperAttrs(gridColsClass)">
    <div v-for="(item, index) in options" :key="id + index" v-bind="itemsAttrs">
      <label :for="id + index" v-bind="labelAttrs">
        <URadio
          :id="id + index"
          v-model="selectedItem"
          :value="item.value"
          :name="name"
          :label="item.label"
          :checked="item.value === selectedItem"
          :description="item.description"
          :label-align="labelAlign"
          v-bind="radioAttrs"
        >
          <!-- @slot Use it to add icon. -->
          <slot v-if="withIcon" name="icon" :item="item">
            <UIcon :name="item.iconName" size="xl" :color="color" v-bind="iconAttrs" />
          </slot>
        </URadio>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

import UIcon from "../ui.image-icon";
import URadio from "../ui.form-radio";
import UIService, { getRandomId } from "../service.ui";

import defaultConfig from "./configs/default.config";
import { URadioCard } from "./constants";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "URadioCard", inheritAttrs: false });

const store = useStore();

const props = defineProps({
  /**
   * Set radio card name.
   */
  name: {
    type: String,
    required: true,
    default: "",
  },

  /**
   * Set options for component.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Set component value.
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },

  /**
   * Set grid cols number.
   */
  gridCols: {
    type: Number,
    default: UIService.get(defaultConfig, URadioCard).default.gridCols,
  },

  /**
   * Show / hide component icon.
   */
  withIcon: {
    type: Boolean,
    default: UIService.get(defaultConfig, URadioCard).default.withIcon,
  },

  /**
   * The color of the icon.
   * @values brand, grayscale, black, white, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, URadioCard).default.color,
  },

  /**
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
  },

  labelAlign: {
    type: String,
    default: UIService.get(defaultConfig, URadioCard).default.labelAlign,
  },

  /**
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const { radioAttrs, iconAttrs, wrapperAttrs, labelAttrs, itemsAttrs } = useAttrs(props);

const isMobileDevice = computed(() => {
  return store.getters["breakpoint/isMobileDevice"];
});

const selectedItem = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const gridColsClass = computed(() => {
  return {
    "grid-cols-1": isMobileDevice,
    "grid-cols-2": props.gridCols === 2 && isMobileDevice,
    "grid-cols-3": props.gridCols === 3 && isMobileDevice,
    "grid-cols-4": props.gridCols === 4 && isMobileDevice,
  };
});
</script>
