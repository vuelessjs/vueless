<template>
  <div class="empty:hidden" :data-cy="dataCy">
    <!-- @slot Use it to add button expand item. -->
    <slot />
  </div>
</template>

<script>
export default {
  name: "UButtonExpand",

  props: {
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
