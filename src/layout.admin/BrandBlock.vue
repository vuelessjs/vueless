<template>
  <div class="brand">
    <ULink v-if="!isMobileDevice" :route="logoRouteName" class="brand-link" no-focus-ring>
      <ULogo v-if="logoPath" :path="logoPath" size="xl" class="logo" @click="onClickLogo" />

      <UAvatar
        v-else
        color="violet"
        :user-name="firstWord"
        size="lg"
        bordered
        @click="onClickLogo"
      />
    </ULink>

    <div v-else class="brand-wrapper" @click="onClickBrandWrapper">
      <ULogo v-if="logoPath" class="logo" :path="logoPath" size="xl" />

      <UAvatar v-else color="violet" :user-name="firstWord" size="lg" bordered />

      <div class="brand-name">
        {{ brandName }}
      </div>

      <UIcon
        v-if="isShownBrandBlockDropdown"
        :name="modelValue ? 'keyboard_arrow_up-fill' : 'keyboard_arrow_down-fill'"
        class="icon"
      />
    </div>

    <div v-if="isShownBrandBlock && isMobileDevice" class="line" />

    <div v-if="isShownBrandBlock && menuItems.length" :class="brandBlockClass">
      <div v-if="!isMobileDevice" class="brand-name">
        {{ brandName }}
      </div>

      <div v-if="workspaces.length && !isMobileDevice" class="line" />

      <div v-if="isMobileDevice" class="workspaces">{{ $t("title.workspaces") }}</div>

      <div
        v-for="(item, index) of workspaces"
        :key="index"
        class="workspace-item"
        @click="onClickBrandNameDropdownItem(item.id)"
      >
        <UAvatar
          :class="avatarClass"
          :color="getColor(item)"
          :user-name="item.label"
          :size="avatarSize"
          :rounded="avatarRounded"
          bordered
        />
        <div>{{ item.label }}</div>
      </div>

      <div v-if="menuItems" class="line" />

      <MainSubMenu class="sub-menu" :items="menuItems" show-icon :icon-color="iconColor" />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { mapGetters, mapMutations, useStore } from "vuex";

import { layout } from "vueless/service.ui";

import ULink from "vueless/ui.button-link";
import UIcon from "vueless/ui.image-icon";
import ULogo from "vueless/ui.image-logo";
import UAvatar from "vueless/ui.image-avatar";
import MainSubMenu from "./MainSubMenu.vue";

import layoutMixin from "./mixins";

export default {
  name: "BrandBlock",

  components: {
    ULink,
    ULogo,
    UAvatar,
    UIcon,
    MainSubMenu,
  },

  mixins: [layoutMixin],

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const store = useStore();

    const workspaceItems = ref([]);
    const selectedWorkspaceName = ref("");
    const workspaceItemClick = ref(null);
    const configKey = computed(() => store.state.layout.configKey);

    const isShownBrandBlock = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      },
    });

    const onChangeConfigKey = async () => {
      const layoutConfig = layout.admin[configKey.value] || layout.admin;
      const workspaces = layoutConfig.brandBlock.workspaces;

      workspaceItems.value = store.getters[workspaces?.workspaceItemsGetter];
      selectedWorkspaceName.value = store.getters[workspaces?.selectedWorkspaceNameGetter];

      if (workspaces?.workspacesAction) {
        await store.dispatch(workspaces?.workspacesAction, { idbOnly: true });
      }

      workspaceItemClick.value = (payload) =>
        store.dispatch(workspaces?.workspaceItemsClickAction, payload);
    };

    watch(configKey, onChangeConfigKey, { immediate: true });
    watch(isShownBrandBlock, onChangeConfigKey);

    return {
      workspaceItems,
      selectedWorkspaceName,
      workspaceItemClick,
      isShownBrandBlock,
    };
  },

  computed: {
    ...mapGetters("breakpoint", ["isMobileDevice"]),

    logoPath() {
      const { logoPath, mobileLogoPath } = this.layoutConfig;

      return this.isMobileDevice && mobileLogoPath ? mobileLogoPath : logoPath;
    },

    logoRouteName() {
      return this.layoutConfig.logoRouteName ? { name: this.layoutConfig.logoRouteName } : null;
    },

    menuItems() {
      const items = [];
      const addRoute = this.layoutConfig.brandBlock?.workspaces?.addRoute;
      const listRoute = this.layoutConfig.brandBlock?.workspaces?.listRoute;

      if (addRoute && !addRoute.isHidden) items.push(addRoute);
      if (listRoute && !listRoute.isHidden) items.push(listRoute);

      return items;
    },

    brandName() {
      return this.isShownBrandNameDropdown
        ? this.selectedWorkspaceName || ""
        : this.layoutConfig.brandBlock.name || "";
    },

    firstWord() {
      return this.brandName.split(" ")[0];
    },

    workspaces() {
      return this.isShownBrandNameDropdown ? this.workspaceItems : [];
    },

    isShownBrandNameDropdown() {
      return !!this.layoutConfig.brandBlock.workspaces;
    },

    isShownBrandBlockDropdown() {
      return (this.isMobileDevice && this.workspaces.length) || !this.isMobileDevice;
    },

    icon() {
      return this.modelValue ? "keyboard_arrow_up-fill" : "keyboard_arrow_down-fill";
    },

    iconColor() {
      return this.isMobileDevice ? "gray" : "white";
    },

    brandBlockClass() {
      return this.isMobileDevice ? "mobile-brand-block" : "brand-block";
    },

    avatarClass() {
      return this.isMobileDevice ? "border-gray" : "border-white";
    },

    avatarSize() {
      return this.isMobileDevice ? "lg" : "xs";
    },

    avatarRounded() {
      return this.isMobileDevice ? "md" : "sm";
    },
  },

  watch: {
    "$route.name": "onChangeRoute",
    "$route.params": "onChangeRoute",
  },

  async created() {
    window.addEventListener("click", (event) => this.closeBrandBlock(event));
  },

  unmounted() {
    window.removeEventListener("click", (event) => this.closeBrandBlock(event));
  },

  methods: {
    ...mapMutations("layout", ["CLOSE_MOBILE_SUB_BLOCK"]),

    async onClickBrandNameDropdownItem(workspaceSlug) {
      this.CLOSE_MOBILE_SUB_BLOCK();

      await this.workspaceItemClick({ workspaceSlug });
    },

    onChangeRoute() {
      this.isShownBrandBlock = false;
    },

    onClickLogo() {
      this.toggleBandBlock();
    },

    closeBrandBlock(event) {
      if (!this.$el.contains(event.target) && !this.isMobileDevice) {
        this.isShownBrandBlock = false;
      }
    },

    onClickBrandWrapper() {
      this.toggleBandBlock();
    },

    getColor(item) {
      return item.color || "violet";
    },

    toggleBandBlock() {
      if (this.isShownBrandBlockDropdown) this.isShownBrandBlock = !this.isShownBrandBlock;
    },
  },
};
</script>

<style lang="postcss" scoped>
.brand {
  @apply relative;

  .brand-block {
    @apply absolute left-12 top-0;
    @apply h-auto min-w-[12.5rem];
    @apply py-3;
    @apply rounded-lg border border-gray-700 bg-gray-900;

    .brand-name {
      @apply px-5 pb-1;
      @apply text-gray-200;
    }

    .line {
      @apply h-px w-auto;
      @apply mx-3 my-2;
      @apply bg-gray-700;
    }

    .workspace-item {
      @apply cursor-pointer;
      @apply w-full;
      @apply flex items-center space-x-3;
      @apply px-5 py-1.5;
      @apply text-sm text-gray-200;

      &:hover {
        @apply bg-white/5 md:rounded;
      }
    }

    :deep(.sub-menu) {
      .menu-item-link-block {
        @apply space-x-3;
        @apply px-5;

        &:hover {
          @apply bg-white/5 md:rounded;
        }
      }

      .menu-item-link-text {
        @apply text-sm text-white;
        @apply py-1.5;
      }

      .menu-item-item-active {
        @apply bg-white/5 md:rounded;
      }
    }
  }

  .mobile-brand-block {
    @apply pt-3;

    .line {
      @apply h-px w-auto;
      @apply mx-6 my-2;
      @apply bg-gray-200;
    }

    .workspaces {
      @apply text-sm text-gray-400;
      @apply pb-1 pl-5;
    }

    .workspace-item {
      @apply cursor-pointer;
      @apply w-full;
      @apply flex items-center space-x-3;
      @apply px-5 py-2;
      @apply font-medium text-gray-900;

      &:hover {
        @apply bg-gray-100 md:rounded;
      }
    }

    .sub-menu {
      .menu-item-link-block {
        @apply space-x-4;
        @apply px-5;

        &:hover {
          @apply bg-gray-100 md:rounded;
        }
      }

      .menu-item-item-active {
        @apply bg-white/5 md:rounded;
      }
    }
  }

  .brand-wrapper {
    @apply relative;
    @apply cursor-pointer;
    @apply flex items-center space-x-3;
    @apply px-5 py-2;
    @apply font-medium text-gray-900;

    &:hover {
      @apply bg-gray-100;
    }

    .icon {
      @apply absolute right-6;
    }
  }
}
</style>
