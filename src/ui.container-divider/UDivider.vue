<template>
  <div :data-test="dataTest" v-bind="wrapperAttrs">
    <div v-bind="dividerAttrs" />
    <span v-if="label" v-bind="labelAttrs" v-text="label" />
  </div>
</template>

<script setup>
import { getDefault } from "../utils/ui.ts";

import { UDivider } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Divider label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Divider padding size.
   * @values xs, sm, md, lg, xl
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, UDivider).size,
  },

  /**
   * Divider color.
   * @values light, default, dark
   */
  variant: {
    type: String,
    default: getDefault(defaultConfig, UDivider).variant,
  },

  /**
   * Set padding around the Divider.
   * @values none, before, after, all
   */
  padding: {
    type: String,
    default: getDefault(defaultConfig, UDivider).padding,
  },

  /**
   * Set line dashed.
   */
  dashed: {
    type: Boolean,
    default: getDefault(defaultConfig, UDivider).dashed,
  },

  /**
   * Set line dotted.
   */
  dotted: {
    type: Boolean,
    default: getDefault(defaultConfig, UDivider).dotted,
  },

  /**
   * Set divider vertically orientated.
   */
  vertical: {
    type: Boolean,
    default: getDefault(defaultConfig, UDivider).vertical,
  },

  /**
   * Remove border (keeps only spacings).
   */
  noBorder: {
    type: Boolean,
    default: getDefault(defaultConfig, UDivider).noBorder,
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
});

const { wrapperAttrs, dividerAttrs, labelAttrs } = useAttrs(props);
</script>
