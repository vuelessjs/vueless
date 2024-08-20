<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs">
    <div v-bind="dividerAttrs" />
    <template v-if="label && !vertical">
      <span v-bind="labelAttrs" v-text="label" />
      <div v-bind="dividerAttrs" />
    </template>
  </div>
</template>

<script setup>
import { getDefault } from "../service.ui";

import { UDivider } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDivider", inheritAttrs: false });

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
   * Set divider orientation to vertical.
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
   * Remove all paddings.
   */
  noPadding: {
    type: Boolean,
    default: getDefault(defaultConfig, UDivider).noPadding,
  },

  /**
   * Remove top padding.
   */
  noTopPadding: {
    type: Boolean,
    default: getDefault(defaultConfig, UDivider).noTopPadding,
  },

  /**
   * Remove bottom padding.
   */
  noBottomPadding: {
    type: Boolean,
    default: getDefault(defaultConfig, UDivider).noBottomPadding,
  },

  /**
   * Remove left padding.
   */
  noLeftPadding: {
    type: Boolean,
    default: getDefault(defaultConfig, UDivider).noLeftPadding,
  },

  /**
   * Remove right padding.
   */
  noRightPadding: {
    type: Boolean,
    default: getDefault(defaultConfig, UDivider).noRightPadding,
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

const { wrapperAttrs, dividerAttrs, labelAttrs } = useAttrs(props);
</script>
