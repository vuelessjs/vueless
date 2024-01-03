<template>
  <div class="menu-footer">
    <div class="menu-footer-wrapper">
      <div class="menu-footer-title">{{ appName }}</div>

      <div class="menu-footer-version">{{ appVersion }}</div>
    </div>

    <div v-if="items.length" class="menu-footer-block">
      <router-link v-for="(item, index) in items" :key="index" :to="{ name: item.page }">
        <UIcon :tooltip="$t(item.translate)" class="menu-footer-icon" :name="item.iconName" />
      </router-link>
    </div>
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";

const { name, version } = require("/package.json");

export default {
  name: "FooterMenu",

  components: {
    UIcon,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },

    brandName: {
      type: String,
      default: "",
    },
  },

  computed: {
    appName() {
      return name;
    },

    appVersion() {
      return `v.${version}`;
    },
  },
};
</script>

<style lang="postcss" scoped>
.menu-footer {
  @apply flex items-center justify-between;
  @apply space-x-4 overflow-hidden;

  &-wrapper {
    @apply flex items-end space-x-1;
  }

  &-title {
    @apply text-sm font-normal text-gray-500/[85];
  }

  &-version {
    @apply text-2xs font-normal text-gray-500/[85];
    @apply mb-px;
  }

  &-block {
    @apply flex space-x-3;
  }

  &-icon {
    @apply block cursor-pointer;

    &:deep(svg g [fill]) {
      @apply text-violet-200/20;
    }

    &:hover {
      &:deep(svg g [fill]) {
        @apply text-violet-200/100;
        @apply transition-all duration-200;
      }
    }
  }
}
</style>
