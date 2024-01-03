<template>
  <UViewport class="admin-layout" :class="layoutClasses">
    <UTopLoader v-if="!isRenderingPage" z-index="100" />

    <UNotify />

    <div class="layout-body">
      <AsideBlock v-if="!isMobileDevice" />

      <div v-if="isMobileDevice" class="mobile-overlay-header" />

      <div
        v-if="isTabletDevice"
        class="overlay-on-tablet"
        :class="overlayClasses"
        @click="onClickOverlay"
      />

      <div v-if="!isMobileDevice" class="background-block" :style="themeBlockStyle" />

      <main class="main" :class="mainClasses">
        <div id="admin-layout-main-content" ref="mainContent" class="main-content">
          <router-view />
        </div>

        <div v-if="!isMobileDevice" class="floating-block">
          <RightInfoBlock v-if="rightInfoBlockConfigs" class="right-info-block" />

          <div class="change-theme-button" @click="onClickShownThemeModal" />

          <HelperBlock v-if="isShownHelperBlock" class="helper-block" />
        </div>

        <ChangeThemeModal v-once />
      </main>

      <div v-if="isMobileDevice" class="mobile-footer-wrapper">
        <div class="menu-wrapper">
          <MobileMainMenu class="mobile-main-menu" :items="menuItems" />
        </div>

        <MobileSubBlock v-if="isOpenedMobileSubBlock" class="mobile-sub-block" />
      </div>
    </div>

    <div v-if="isMobileDevice" class="mobile-bg-scroll-fix" />
  </UViewport>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { isMobileApp, removeOutlineFocus } from "vueless/service.ui";

import UViewport from "vueless/layout-ui.viewport";
import UNotify from "vueless/layout-ui.notify";
import UTopLoader from "vueless/layout-ui.loader-top";
import AsideBlock from "./AsideBlock.vue";
import MobileMainMenu from "./MobileMainMenu.vue";
import MobileSubBlock from "./MobileSubBlock.vue";
import RightInfoBlock from "./RightInfoBlock.vue";
import ChangeThemeModal from "./ChangeThemeModal.vue";
import HelperBlock from "./HelperBlock.vue";

import layoutMixin from "./mixins";

const ASIDE_CLOSED = "aside-closed";
const ASIDE_OPENED = "aside-opened";
const ASIDE_SUB_BLOCK_CLOSED = "aside-sub-menu-closed";

export default {
  name: "AdminLayout",

  components: {
    UViewport,
    UNotify,
    UTopLoader,
    AsideBlock,
    MobileMainMenu,
    MobileSubBlock,
    RightInfoBlock,
    ChangeThemeModal,
    HelperBlock,
  },

  mixins: [layoutMixin],

  data() {
    return {
      baseFontSize: 16,
      windowWidth: 0,
      containerPageWidth: 0,
      minWidth: 16,
      defaultAsideWidth: 288,
      asideWidths: {
        [ASIDE_CLOSED]: 0,
        [ASIDE_OPENED]: 288,
        [ASIDE_SUB_BLOCK_CLOSED]: 66,
      },
      defaultAsideDuration: 0,
      asideDurations: {
        [ASIDE_CLOSED]: 100,
        [ASIDE_OPENED]: 151,
        [ASIDE_SUB_BLOCK_CLOSED]: 100,
      },
    };
  },

  computed: {
    ...mapState("loader", ["isRenderingPage"]),
    ...mapState("layout", [
      "isAnimation",
      "isOpenedAside",
      "isOpenedAsideSubBlock",
      "isOpenedMobileSubBlock",
      "isAsideSubMenu",
      "activeTheme",
      "rightInfoBlockConfigs",
    ]),

    ...mapGetters("breakpoint", ["isTabletDevice", "isMobileDevice"]),

    layoutClasses() {
      const classes = {
        "mobile-app-layout": isMobileApp,
      };

      return [classes];
    },

    overlayClasses() {
      return this.isOpenedAsideSubBlock && this.isAsideSubMenu && this.isOpenedAside
        ? "overlay-opened"
        : "overlay-closed";
    },

    mainClasses() {
      return {
        [ASIDE_OPENED]:
          this.isOpenedAside &&
          this.isAsideSubMenu &&
          !this.isMobileDevice &&
          !this.isTabletDevice &&
          this.isAnimation,
        [ASIDE_CLOSED]: !this.isOpenedAside || (this.isMobileDevice && this.isAnimation),
        [ASIDE_SUB_BLOCK_CLOSED]:
          !this.isMobileDevice &&
          this.isOpenedAside &&
          (!this.isAsideSubMenu || this.isTabletDevice),
        "footer-opened": this.isMobileDevice,
      };
    },

    activeClass() {
      let activeClass;

      Object.entries(this.mainClasses).forEach(([key, value]) => {
        if (value) activeClass = key;
      });

      return activeClass;
    },

    routeName() {
      return this.$route.name;
    },

    routePath() {
      return this.$route.path;
    },

    menuItems() {
      return this.isMobileDevice
        ? this.layoutConfig.mobileMainMenuItems()
        : this.layoutConfig.mainMenuItems();
    },

    isShownHelperBlock() {
      return !this.layoutConfig.helperBlock.isHidden;
    },

    asideBlockWidth() {
      return this.activeClass ? this.asideWidths[this.activeClass] : this.defaultAsideWidth;
    },

    themeBlockWidth() {
      return this.windowWidth - this.containerPageWidth - this.asideBlockWidth + this.minWidth;
    },

    themeBlockTransitionDuration() {
      return this.activeClass && this.isAnimation
        ? this.asideDurations[this.activeClass]
        : this.defaultAsideDuration;
    },

    themeBlockStyle() {
      const theme = this.activeTheme;
      const display = this.windowWidth || this.containerPageWidth ? "block" : "none";

      return `
        width: ${this.themeBlockWidth / this.baseFontSize}rem;
        transition-duration: ${this.themeBlockTransitionDuration}ms;
        background-image: url(${theme});
        display: ${display}
      `;
    },
  },

  watch: {
    routeName: {
      handler: "onChangeRouteName",
      immediate: true,
    },

    routePath: "onChangeRoutePath",

    isOpenedMobileSubBlock: "onChangeOpenMobileSubBlock",
  },

  created() {
    this.setAsideSubMenu();
    this.SET_FIRST_OPENED_PAGE_NAME(this.routeName);
    this.SET_ASIDE_STATES();
    this.SET_ACTIVE_THEME();
    this.SET_RIGHT_INFO_BLOCK_STATE();

    this.setBodyBg();
    this.getRightInfoBlockConfigs();

    removeOutlineFocus();
  },

  mounted() {
    this.$nextTick(() => {
      this.setWindowAndContainerPageWidth();
    });

    window.addEventListener("resize", () => this.setWindowAndContainerPageWidth(), {
      passive: true,
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", () => this.setWindowAndContainerPageWidth());
  },

  updated() {
    this.setWindowAndContainerPageWidth();
  },

  methods: {
    ...mapMutations("layout", [
      "CLOSE_ASIDE_SUB_BLOCK",
      "CLOSE_MOBILE_SUB_BLOCK",
      "SET_ASIDE_SUB_MENU",
      "SET_ASIDE_STATES",
      "SHOWN_THEME_MODAL",
      "SET_ACTIVE_THEME",
      "SET_RIGHT_INFO_BLOCK_CONFIGS",
      "SET_RIGHT_INFO_BLOCK_STATE",
      "SET_FIRST_OPENED_PAGE_NAME",
      "SAVE_LAST_OPENED_PAGE_NAME",
    ]),

    onChangeOpenMobileSubBlock(isOpen) {
      if (isOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "auto";
    },

    setAsideSubMenu() {
      this.menuItems.forEach((item) => {
        if (item.page === this.routeName && !item.subItems) {
          this.SET_ASIDE_SUB_MENU(false);
        }
      });
    },

    setBodyBg() {
      const body = document.querySelector("body");
      const bodyClass = "admin-layout-theme-bg-default";

      if (isMobileApp) {
        const bodyPWAClass = `${bodyClass}-pwa`;

        body.classList.add(bodyPWAClass);
        body.classList.add("!bg-gray-100");
      }

      body.classList.add(bodyClass);
    },

    getRightInfoBlockConfigs() {
      const blockConfigs = this.layoutConfig?.rightInfoBlock;

      if (blockConfigs) {
        const configs = blockConfigs.find((item) => {
          if (item.isHidden || !item.relatedPage) return null;

          if (typeof item.relatedPage === "object") {
            return this.checkByRelatedPageArray(item);
          } else if (item.relatedPage === this.routeName || item.relatedPage === "*") {
            return item;
          }
        });

        this.SET_RIGHT_INFO_BLOCK_CONFIGS(configs);
      }
    },

    checkByRelatedPageArray(item) {
      const relatedPage = item.relatedPage.find((page) => page === this.routeName);

      return relatedPage ? item : null;
    },

    onClickOverlay() {
      this.CLOSE_ASIDE_SUB_BLOCK();
    },

    onChangeRouteName() {
      this.setWindowAndContainerPageWidth();
      this.getRightInfoBlockConfigs();
      this.SET_RIGHT_INFO_BLOCK_STATE();
      this.CLOSE_MOBILE_SUB_BLOCK();
    },

    onChangeRoutePath() {
      this.SAVE_LAST_OPENED_PAGE_NAME(this.routeName);
    },

    setWindowAndContainerPageWidth() {
      this.windowWidth = window.innerWidth;
      this.containerPageWidth = this.$refs.mainContent?.firstChild?.clientWidth;
    },

    onClickShownThemeModal() {
      this.SHOWN_THEME_MODAL();
    },
  },
};
</script>

<style lang="postcss">
@media screen and (display-mode: standalone) {
  html,
  body {
    @apply bg-gray-800;
  }
}
</style>

<style lang="postcss" scoped>
.admin-layout {
  @apply h-full min-h-screen;

  .layout-body {
    @apply lg:flex;
    @apply relative;

    .background-block {
      @apply fixed right-0 top-0;
      @apply h-full;
      @apply bg-cover bg-center;
      z-index: -1;
    }

    .overlay-on-tablet {
      @apply h-full w-full;
      @apply fixed left-0 top-0;
      z-index: -1;
      @apply bg-gray-900/70;
    }

    .overlay-opened {
      @apply md:duration-150;
      @apply opacity-100;
      @apply z-30;
    }

    .overlay-closed {
      @apply md:duration-150;
      @apply opacity-0;
      z-index: -1;
    }

    .main {
      @apply relative;
      @apply w-full md:z-auto md:min-h-screen;
      @apply md:pl-72 md:pr-8;
      @apply md:transition-all;
      @apply md:inline-flex;

      .main-content {
        @apply w-full md:max-w-screen-2xl;
        @apply rounded-t-2xl md:rounded-2xl;
      }

      .floating-block {
        @apply fixed bottom-6 right-[1.125rem] z-40;
        @apply flex flex-col space-y-3;

        .change-theme-button {
          @apply h-7 w-7;
          @apply box-content rounded-full border-2 border-white;
          @apply cursor-pointer;
          background: radial-gradient(60.71% 60.71% at 10.71% 44.64%, #68dedd 0%, #aa99cc 100%);

          &:hover {
            @apply scale-105;
          }
        }
      }
    }

    .aside-opened {
      @apply md:duration-[151ms];
      @apply pl-72;
    }

    .aside-closed {
      @apply md:duration-100;
      @apply pl-0;
    }

    .aside-sub-menu-closed {
      @apply pl-[4.125rem];
    }

    .footer-opened {
      @apply lg:pb-[3.375rem];
    }

    .mobile-footer-wrapper {
      @apply fixed bottom-0 z-40;

      .menu-wrapper {
        @apply fixed bottom-0 z-40;
        @apply bg-gray-100;
        @apply border-t border-gray-200;
        @apply h-mobile-menu-height w-full;
      }

      .mobile-sub-block {
        @apply fixed top-0 z-30;
        @apply w-full;
      }
    }
  }
}

@media (max-width: 1023px) {
  .admin-layout {
    .layout-body {
      .main {
        @apply md:pl-[4.125rem];
      }

      .aside-closed {
        @apply md:duration-100;
        @apply pl-0;
      }

      .aside-sub-menu-closed {
        @apply pl-[4.125rem];
      }
    }
  }
}

.mobile-bg-scroll-fix {
  @apply absolute bottom-0 bg-white;
  @apply rounded-t-xl;
  @apply z-[-1];
  @apply w-full;
  height: calc(100vh - theme("spacing.safe-top"));
}

.body-gray-bg {
  .mobile-bg-scroll-fix {
    @apply bg-gray-50;
  }
}

.mobile-app-layout {
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  @apply fixed inset-0;
  @apply bg-gray-800;
  @apply relative z-10;

  :deep(.aside) {
    @apply fixed inset-x-0;
  }

  :deep(.mono-page-wrapper) {
    @apply rounded-t-xl;

    &.rounding {
      @apply pb-6;
    }
  }

  /* TODO: Fixed pwa header
:deep(.mono-page-content) {
@apply pt-24;
}

:deep(.mono-page-header) {
@apply left-0 -mt-4 p-4;
@apply fixed w-full;
@apply bg-white;
@apply border border-b border-gray-200;
}
*/

  /* temporary-solution */
  .mobile-overlay-header {
    @apply fixed w-full h-safe-top;
    @apply z-[55];
    @apply bg-gray-800;
  }

  .mobile-sub-block {
    @apply mt-safe-top;
    @apply rounded-t-xl;
  }

  .menu-wrapper {
    @apply !h-auto;
    padding-bottom: calc(theme("spacing.safe-bottom") + 0.5rem);
  }

  .main {
    @apply fixed inset-x-0 overflow-y-auto;
    @apply rounded-t-xl;
    /* screen - footer */
    height: calc(100vh - theme("spacing.mobile-menu-height"));
  }

  .main-content {
    @apply pt-safe-top pb-safe-bottom;
  }
}
</style>
