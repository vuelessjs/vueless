<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs" @click="onClick">
    <template v-if="label">{{ label }}</template>
    <slot />
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDropdownItem", inheritAttrs: false });

const hideDropdownOptions = inject("hideDropdownOptions", null);

const props = defineProps({
  /**
   * Set dropdown item label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Sets component ui config object.
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
});

const emit = defineEmits([
  /**
   * Triggers when dropdown item is clicked.
   * @property {string} value
   */
  "click",
]);

function onClick() {
  // invokes click event on current item
  emit("click");

  hideDropdownOptions && hideDropdownOptions();
}

const { wrapperAttrs } = useAttrs(props);
</script>
