<template>
  <div class="aside-wrapper">
    <div class="aside" :class="asideBlockClass">
      <div class="main-block">
        <div v-if="isShownBrandBlockComponent" class="header">
          <div class="header-block">
            <BrandBlock v-model="isShownBrandBlock" class="brand-block" />
          </div>
        </div>

        <MainMenu :items="menuItems" :tooltip="isTooltip" />

        <div class="footer">
          <div v-if="isExistSettingsRoute" class="settings-wrapper" :class="settingsWrapperClass">
            <UDot v-if="checkActivePage(settingsRoute)" class="settings-dot" color="black" />

            <ULink
              class="settings"
              :url="settingsRoute.link"
              :target-blank="settingsRoute.targetBlank"
              :route="getRoute(settingsRoute)"
              no-focus-ring
              @click="onClickSettings(settingsRoute)"
            >
              <UIcon
                v-if="isTooltip"
                class="settings-icon"
                :name="settingsRoute.iconName"
                :interactive="settingsIconInteractive"
                :tooltip="settingsTranslate"
                :tooltip-settings="tooltipSettings"
                :color="settingsIconColor"
                variant="light"
                size="lg"
              />

              <span
                v-else
                class="settings-block"
                @mouseover="onMouseover"
                @mouseleave="onMouseleave"
              >
                <UIcon
                  class="settings-icon"
                  :name="settingsRoute.iconName"
                  :interactive="settingsIconInteractive"
                  :color="settingsIconColor"
                  variant="light"
                  size="lg"
                />

                <span class="settings-text" :class="getTextClass(settingsRoute)">
                  {{ settingsTranslate }}
                </span>
              </span>
            </ULink>
          </div>

          <UserBlock />

          <UIcon
            class="close-menu-icon"
            name="keyboard_tab-fill"
            variant="light"
            color="gray"
            interactive
            @click="onClickCloseMenu"
          />
        </div>
      </div>

      <div class="sub-block" :class="subBlockClass">
        <MainSubMenu class="sub-menu" :items="subMenuItems" active-item />

        <div class="sub-info-block">
          <AsideInfoBlock v-if="asideInfoBlockConfigs" />
        </div>
      </div>
    </div>

    <div v-if="!isOpenedAside" class="menu-burger" @click="onClickOpenMenu">
      <UIcon name="menu" color="gray" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { getBasePath } from "vueless/service.ui";
import layoutMixin from "./mixins";

import BrandBlock from "./BrandBlock.vue";
import MainMenu from "./MainMenu.vue";
import MainSubMenu from "./MainSubMenu.vue";
import UserBlock from "./UserBlock.vue";
import AsideInfoBlock from "./AsideInfoBlock.vue";
import UDot from "vueless/ui.other-dot";
import ULink from "vueless/ui.button-link";
import UIcon from "vueless/ui.image-icon";

export default {
  name: "AsideBlock",

  components: {
    BrandBlock,
    MainMenu,
    MainSubMenu,
    UserBlock,
    AsideInfoBlock,
    UDot,
    ULink,
    UIcon,
  },

  mixins: [layoutMixin],

  data() {
    return {
      focus: false,
      isShownBrandBlock: false,
      isSubMenu: false,
      subMenuItems: [],
      tooltipSettings: {
        placement: "bottom",
        arrow: false,
        size: "small",
        theme: "dark",
        distance: 0.4,
        duration: [0, 0],
      },
    };
  },

  computed: {
    ...mapState("layout", [
      "isAnimation",
      "isOpenedAside",
      "isOpenedAsideSubBlock",
      "isAsideSubMenu",
      "asideInfoBlockConfigs",
    ]),

    ...mapGetters("breakpoint", ["isTabletDevice"]),

    routeName() {
      return this.$route.name;
    },

    menuItems() {
      return this.layoutConfig.mainMenuItems();
    },

    isTooltip() {
      return !!this.layoutConfig.mainMenuItemsTooltip;
    },

    settingsRoute() {
      return this.layoutConfig.settingsRoute ? this.layoutConfig.settingsRoute() : {};
    },

    isExistSettingsRoute() {
      return Object.keys(this.settingsRoute).length && !this.settingsRoute.isHidden;
    },

    isShownBrandBlockComponent() {
      return !this.layoutConfig.brandBlock.isHidden;
    },

    asideBlockClass() {
      return {
        "aside-opened":
          this.isOpenedAside &&
          (this.isOpenedAsideSubBlock || this.isAsideSubMenu) &&
          this.isAnimation,
        "aside-closed":
          !this.isOpenedAside &&
          (this.isOpenedAsideSubBlock || this.isAsideSubMenu) &&
          this.isAnimation,
        "aside-without-sub-block-opened":
          this.isOpenedAside && (!this.isOpenedAsideSubBlock || !this.isAsideSubMenu),
        "aside-without-sub-block-closed":
          (!this.isOpenedAside && !this.isAsideSubMenu) ||
          (!this.isOpenedAside &&
            this.isTabletDevice &&
            (!this.isOpenedAsideSubBlock || !this.isAsideSubMenu)),
      };
    },

    subBlockClass() {
      return {
        "aside-sub-menu-opened":
          this.isAnimation &&
          ((this.isTabletDevice && this.isOpenedAsideSubBlock) || this.isAsideSubMenu),
        "aside-sub-menu-closed":
          (this.isTabletDevice && !this.isOpenedAsideSubBlock) || !this.isAsideSubMenu,
      };
    },

    itemsWithSubMenu() {
      const items = this.menuItems.filter((item) => item.subItems);

      if (this.settingsRoute.subItems) {
        items.push(this.settingsRoute);
      }

      return items;
    },

    settingsIconInteractive() {
      return !this.checkActivePage(this.settingsRoute);
    },

    settingsIconColor() {
      return this.checkActivePage(this.settingsRoute) || this.focus ? "black" : "gray";
    },

    settingsTranslate() {
      return this.$t(this.settingsRoute.translate);
    },

    settingsWrapperClass() {
      return !this.isTooltip ? "settings-without-tooltip" : "";
    },
  },

  watch: {
    isSubMenu: "onChangeSubmenu",

    routeName: {
      handler: "onChangeRouteName",
      immediate: true,
    },

    isOpenedAside: "SAVE_ASIDE_STATES",

    isOpenedAsideSubBlock: "SAVE_ASIDE_STATES",

    isAsideSubMenu: {
      handler: "onChangeAsideSubMenu",
      immediate: true,
    },
  },

  created() {
    this.getAsideInfoBlockConfigs();
  },

  methods: {
    ...mapMutations("layout", [
      "ENABLE_ANIMATION",
      "OPEN_ASIDE",
      "CLOSE_ASIDE",
      "OPEN_ASIDE_SUB_BLOCK",
      "CLOSE_ASIDE_SUB_BLOCK",
      "TOGGLE_ASIDE_SUB_BLOCK",
      "SAVE_ASIDE_STATES",
      "SET_ASIDE_SUB_MENU",
      "SET_ASIDE_INFO_BLOCK_CONFIGS",
    ]),

    getAsideInfoBlockConfigs() {
      const blockConfigs = this.layoutConfig?.asideInfoBlock;

      if (blockConfigs) {
        const configs = blockConfigs.find((item) => {
          if (item.isHidden || !item.relatedPage) return null;

          if (typeof item.relatedPage === "object") {
            return this.checkByRelatedPageArray(item);
          } else if (item.relatedPage === this.routeName || item.relatedPage === "*") {
            return item;
          }
        });

        this.SET_ASIDE_INFO_BLOCK_CONFIGS(configs);
      }
    },

    checkByRelatedPageArray(item) {
      const relatedPage = item.relatedPage.find((page) => page === this.routeName);

      return relatedPage ? item : null;
    },

    onClickCloseMenu() {
      this.CLOSE_ASIDE();
      if (this.isTabletDevice) this.CLOSE_ASIDE_SUB_BLOCK();
    },

    onClickOpenMenu() {
      this.OPEN_ASIDE();
    },

    onChangeSubmenu() {
      this.SET_ASIDE_SUB_MENU(this.isSubMenu);
      this.SAVE_ASIDE_STATES();
    },

    onChangeAsideSubMenu() {
      this.isSubMenu = this.isAsideSubMenu;
    },

    onChangeRouteName() {
      this.getAsideInfoBlockConfigs();
      this.isSubMenu = false;
      this.subMenuItems = [];
      const routePath = this.$route.path;
      const path = `${getBasePath()}${routePath}`;

      this.itemsWithSubMenu.forEach((item) => {
        const { page, subItems } = item;
        const parentRoute = this.$router.resolve({ name: page }).href;

        if (this.checkCurrentPage(page) || path.includes(parentRoute)) {
          this.subMenuItems = subItems;
          this.isSubMenu = true;
        }

        if (!this.subMenuItems.length) this.checkSubItems(subItems, path);
      });
    },

    checkSubItems(subItems, path) {
      subItems.forEach((subItem) => {
        const page = subItem.page;
        const parentRoute = this.$router.resolve({ name: page }).href;

        if (page && !subItem.isHidden) {
          if (this.checkCurrentPage(page) || path.includes(parentRoute)) {
            this.subMenuItems = subItems;
            this.isSubMenu = true;
          }
        }
      });
    },

    getTextClass({ page, subItems }) {
      return this.checkActivePage({ page, subItems }) ? "active" : "";
    },

    onMouseover() {
      this.focus = true;
    },

    onMouseleave() {
      this.focus = false;
    },

    onClickSettings({ page, subItems }) {
      const isActivePage = this.checkActivePage({ page, subItems });

      if (!this.isAnimation) this.ENABLE_ANIMATION();

      if (this.isTabletDevice && subItems) {
        this.TOGGLE_ASIDE_SUB_BLOCK();

        if (!this.checkCurrentPage(page) && !isActivePage) this.OPEN_ASIDE_SUB_BLOCK();
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.aside-wrapper {
  @apply relative z-40;
  @apply w-auto max-w-full md:max-w-[18rem];
  @apply h-max md:fixed md:h-screen;

  .aside {
    @apply flex;
    @apply w-auto max-w-full md:max-w-[18rem];
    @apply h-max md:fixed md:h-screen;
    @apply md:transition-all;
  }

  .aside-opened {
    @apply md:duration-100;
    @apply absolute left-0;
  }

  .aside-closed {
    @apply md:duration-150;
    @apply absolute -left-[21rem];
  }

  .aside-without-sub-block-opened {
    @apply absolute left-0;
  }

  .aside-without-sub-block-closed {
    @apply md:duration-150;
    @apply absolute -left-[4.125rem];
  }

  .main-block {
    @apply flex flex-col justify-between;
    @apply h-full min-w-[4.125rem] max-w-[4.125rem];
    @apply z-40;
    @apply border-r border-gray-200 bg-gray-100;
    @apply py-6;
    @apply bg-gray-100;

    .header {
      @apply h-[4.82rem] w-full;
      @apply px-3;

      .header-block {
        @apply h-full;
        @apply flex justify-center;
        @apply border-b border-gray-200;
      }
    }

    .footer {
      @apply flex flex-col items-center justify-end space-y-3;
      @apply h-[8rem] w-full;

      .settings-wrapper {
        @apply relative;
        @apply cursor-pointer;
        @apply mb-0;

        .settings-dot {
          @apply absolute -left-2.5 top-3 z-30;
        }

        .settings {
          @apply mb-2;

          &-icon {
            :deep(.interactive) {
              &:hover {
                @apply text-gray-800 opacity-100;
              }
            }

            .size-md {
              @apply h-7 w-7;
            }
          }

          &-block {
            @apply flex flex-col items-center;

            .settings-text {
              @apply w-[2.938rem];
              @apply text-center align-text-top text-2xs text-gray-400;
              @apply break-all;

              &.active {
                @apply text-gray-900;
              }
            }

            &:hover {
              .settings-text {
                @apply !text-gray-900;
              }
            }
          }
        }

        &.settings-without-tooltip {
          @apply mb-1;

          .settings-dot {
            @apply -left-[0.25rem] top-4;
          }

          .settings {
            @apply mb-0;
          }
        }
      }

      .close-menu-icon {
        @apply rotate-180;
        @apply mt-3;

        .size-md {
          .path {
            @apply h-3 w-7;
          }
        }
      }
    }
  }

  .sub-block {
    @apply flex flex-col items-center justify-between space-y-5;
    @apply h-full min-w-[14rem] max-w-[14rem];
    @apply border-r border-gray-200 bg-gray-100;
    @apply pb-6 pt-4;
    @apply md:transition-all;

    .sub-menu {
      @apply h-auto w-full;
      @apply px-3;
    }

    .sub-info-block {
      @apply h-auto;
      @apply px-6;
    }
  }

  .aside-sub-menu-opened {
    @apply md:duration-150;
    @apply absolute left-[4.125rem];
  }

  .aside-sub-menu-closed {
    @apply md:duration-200;
    @apply absolute -left-[10rem];
  }

  .menu-burger {
    @apply cursor-pointer;
    @apply absolute bottom-4 left-4;
    @apply flex items-center justify-center;
    @apply h-[2.5rem] w-[2.5rem];
    @apply rounded-full bg-gray-200;

    &:hover {
      @apply bg-gray-300;
    }
  }
}

:deep(.mono-link) {
  @apply whitespace-normal;
}
</style>
