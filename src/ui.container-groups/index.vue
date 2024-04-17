<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script setup>
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UGroups", inheritAttrs: false });

const props = defineProps({
  /**
   * Set component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Set data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const { wrapperAttrs } = useAttrs(props);
</script>
