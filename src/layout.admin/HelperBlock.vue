<template>
  <div class="helper-block">
    <div class="icon-wrapper" @click="onClickHelperMenu">
      <UIcon name="question_mark-fill" color="white" variant="light" size="sm" class="icon" />
    </div>

    <div v-if="isShownMenuBlock" class="menu-block">
      <MainSubMenu class="sub-menu" :items="menuHelperItems" icon-color="white" show-icon />

      <div v-if="menuHelperItems.length" class="line" />

      <div class="project-info">{{ appName }} {{ appVersion }}</div>
    </div>
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";
import MainSubMenu from "./MainSubMenu.vue";

import layoutMixin from "./mixins";

export default {
  name: "HelperBlock",

  components: {
    UIcon,
    MainSubMenu,
  },

  mixins: [layoutMixin],

  data() {
    return {
      isShownMenuBlock: false,
    };
  },

  computed: {
    routeName() {
      return this.$route.name;
    },

    menuHelperItems() {
      return this.layoutConfig.helperBlock.items;
    },
  },

  watch: {
    routeName: "onChangeRouteName",
  },

  created() {
    window.addEventListener("click", (event) => this.closeMenuBlock(event));
  },

  unmounted() {
    window.removeEventListener("click", (event) => this.closeMenuBlock(event));
  },

  methods: {
    onChangeRouteName() {
      this.isShownMenuBlock = false;
    },

    closeMenuBlock(event) {
      if (!this.$el.contains(event.target)) {
        this.isShownMenuBlock = false;
      }
    },

    onClickHelperMenu() {
      this.isShownMenuBlock = !this.isShownMenuBlock;
    },
  },
};
</script>

<style lang="postcss" scoped>
.helper-block {
  @apply relative;

  .icon-wrapper {
    @apply h-7 w-7;
    @apply box-content rounded-full border-2  border-white bg-gray-900;
    @apply flex items-center justify-center;
    @apply cursor-pointer;

    &:hover {
      @apply bg-gray-700;
    }
  }

  .menu-block {
    @apply absolute bottom-0 right-10;
    @apply h-auto w-[12.5rem];
    @apply rounded-lg border border-gray-700 bg-gray-900;
    @apply py-3;
    @apply flex flex-col;

    .line {
      @apply h-px w-auto;
      @apply mx-3 my-2;
      @apply bg-gray-700;
    }

    :deep(.sub-menu) {
      .menu-item-link-block {
        @apply space-x-4;
        @apply px-5;

        &:hover {
          @apply bg-white/5 md:rounded;
        }
      }

      .menu-item-link-text {
        @apply text-sm text-white;
      }

      .menu-item-item-active {
        @apply bg-white/5 md:rounded;
      }
    }

    .project-info {
      @apply text-2xs text-gray-300;
      @apply px-5 py-2;
    }
  }
}
</style>
