<template>
  <div :data-cy="dataCy" class="mono-files">
    <h3 v-if="label" class="mono-files-label">{{ label }}</h3>

    <div class="space-y-2">
      <slot>
        <UFile
          v-for="(option, index) in options"
          :key="option.text"
          class="!block"
          :text="option.text"
          :url="option.url"
          :data-cy="`${dataCy}-item-${index}`"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import UFile from "vueless/ui.text-file";

export default {
  name: "UFiles",

  components: {
    UFile,
  },

  props: {
    /**
     * Set files label.
     */
    label: {
      type: String,
      default: "",
    },

    /**
     * Set options for files.
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-files-label {
  @apply block max-w-max;
  @apply text-sm font-normal text-gray-500;
  @apply mb-4;
}
</style>
