<template>
  <td :data-cy="dataCy" v-bind="tableCellAttrs">
    <slot />
  </td>
</template>

<script setup>
import UIService from "../service.ui";

import { UTableCell } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UTableCell", inheritAttrs: false });

const props = defineProps({
  /**
   * Makes the cell more narrow.
   */
  compact: {
    type: Boolean,
    default: UIService.get(defaultConfig, UTableCell).default.compact,
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

const { tableCellAttrs } = useAttrs(props);
</script>
