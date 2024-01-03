<template>
  <div class="mono-groups">
    <!-- @slot Use it to add something inside. -->
    <slot />
  </div>
</template>

<script>
export default {
  name: "UGroups",
};
</script>

<style scoped lang="postcss">
.mono-groups {
  @apply flex flex-col space-y-14;
}
</style>
