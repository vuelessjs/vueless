<template>
  <div class="right-info-block">
    <div class="icon-wrapper" @click="onClickRightBlock">
      <UIcon
        v-if="configs?.iconName"
        :name="configs.iconName"
        color="white"
        variant="light"
        size="sm"
        class="icon"
      />
    </div>

    <div v-if="isShownInfoBlock" class="info-block" :class="infoBlockClass">
      <div class="header">
        <div v-if="configs.translate?.title" class="title">{{ $t(configs.translate.title) }}</div>
        <UIcon
          name="close"
          color="white"
          variant="light"
          size="xs"
          class="icon"
          interactive
          @click="onClickClose"
        />
      </div>
      <UText v-if="configs.translate?.content" :html="$t(configs.translate.content)" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import UIcon from "vueless/ui.image-icon";
import UText from "vueless/ui.text-block";

export default {
  name: "RightInfoBlock",

  components: {
    UIcon,
    UText,
  },

  data() {
    return {
      isShownInfoBlock: true,
      defaultWidth: "md",
    };
  },

  computed: {
    ...mapState("layout", ["rightInfoBlockConfigs", "isFirstHideRightInfoBlock"]),

    routeName() {
      return this.$route.name;
    },

    infoBlockClass() {
      const width = this.configs?.infoBlockWidth || this.defaultWidth;

      return `info-block-width-${width}`;
    },

    configs() {
      return this.rightInfoBlockConfigs;
    },
  },

  watch: {
    routeName: "getConfigs",

    isShownInfoBlock: "onChangeShownInfoBlock",
  },

  created() {
    if (this.isFirstHideRightInfoBlock) this.isShownInfoBlock = false;

    window.addEventListener("click", (event) => this.closeMenuBlock(event));
  },

  unmounted() {
    window.removeEventListener("click", (event) => this.closeMenuBlock(event));
  },

  methods: {
    ...mapMutations("layout", ["SAVE_RIGHT_INFO_BLOCK_STATE"]),

    closeMenuBlock(event) {
      if (!this.$el.contains(event.target)) {
        this.isShownInfoBlock = false;
      }
    },

    onClickRightBlock() {
      this.isShownInfoBlock = !this.isShownInfoBlock;
    },

    onClickClose() {
      this.isShownInfoBlock = false;
    },

    onChangeShownInfoBlock() {
      if (!this.isShownInfoBlock && !this.isFirstHideRightInfoBlock) {
        this.SAVE_RIGHT_INFO_BLOCK_STATE();
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.right-info-block {
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

  .info-block {
    @apply absolute bottom-0 right-10;
    @apply h-auto;
    @apply rounded-lg border border-gray-700 bg-gray-900;
    @apply p-4;
    @apply flex flex-col;
    @apply text-white;

    .header {
      @apply relative;
      @apply h-4;
      @apply mb-3;

      .title {
        @apply whitespace-nowrap text-sm;
        @apply pr-8;
      }

      .icon {
        @apply absolute right-0 top-0;
      }
    }
  }
}

.info-block-width {
  &-sm {
    @apply w-[8.75rem];
  }

  &-md {
    @apply w-[15rem];
  }

  &-lg {
    @apply w-[21.25rem];
  }
}
</style>
