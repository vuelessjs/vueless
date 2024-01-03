<template>
  <UViewport class="auth-layout" :class="layoutClasses">
    <UTopLoader v-if="!isRenderingPage" z-index="50" />

    <UNotify />

    <div v-if="isShownFeatures" class="features-wrap">
      <ULogo size="3xl" :path="featuresLogoPath" :label="logoLabel" />

      <FeaturesBlock />

      <div class="auth-layout-wrapper">
        <LanguageSwitcher v-if="isShowLanguages" />

        <FooterMenu v-if="menuItems" :items="menuItems" :brand-name="brandName" />
      </div>
    </div>

    <main class="main" :class="mainClasses">
      <ULogo :class="portableClass" size="3xl" :path="logoPath" :label="logoLabel" />

      <div class="view-wrap">
        <router-view />
      </div>

      <LanguageSwitcher v-if="isShowLanguages" :class="portableClass" variant="dark" />
    </main>
  </UViewport>
</template>

<script>
import { isMobileApp, layout, removeOutlineFocus } from "vueless/service.ui";
import { mapState } from "vuex";

import UViewport from "vueless/layout-ui.viewport";
import ULogo from "vueless/ui.image-logo";
import UNotify from "vueless/layout-ui.notify";
import UTopLoader from "vueless/layout-ui.loader-top";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import FeaturesBlock from "./FeaturesBlock.vue";
import FooterMenu from "./FooterMenu.vue";

export default {
  name: "AuthLayout",

  components: {
    UViewport,
    ULogo,
    UNotify,
    UTopLoader,
    LanguageSwitcher,
    FeaturesBlock,
    FooterMenu,
  },

  data() {
    return {
      isHiddenFeatures: true,
    };
  },

  computed: {
    ...mapState("loader", ["isRenderingPage"]),

    isShowLanguages() {
      return !layout.auth?.languages?.isHidden;
    },

    isShownFeatures() {
      const features = layout.auth?.features;

      return features ? !features?.isHidden : !this.isHiddenFeatures;
    },

    featuresLogoPath() {
      return layout.auth?.features?.logoPath;
    },

    routeName() {
      return this.$route.name;
    },

    logoPath() {
      return layout.auth.logoPath;
    },

    logoLabel() {
      const logoLabel = layout.auth.logoLabel;

      if (!logoLabel) return;

      if (typeof logoLabel === "string") {
        return logoLabel;
      }

      return logoLabel.find((item) => item.routeNames.includes(this.routeName)).label;
    },

    layoutClasses() {
      return {
        "pwa-layout": isMobileApp,
        "pr-none-lg": this.isShownFeatures,
      };
    },

    mainClasses() {
      return {
        "rounded-r-none-lg features-l-rounded": this.isShownFeatures,
      };
    },

    portableClass() {
      return {
        portable: this.isShownFeatures,
      };
    },

    menuItems() {
      return layout.auth.footerMenuItems;
    },

    brandName() {
      return layout.auth.brandName;
    },
  },

  created() {
    this.setBodyBg();

    removeOutlineFocus();
  },

  methods: {
    setBodyBg() {
      const body = document.querySelector("body");
      const bodyClass = "auth-layout-theme-bg-default";

      if (isMobileApp) {
        const bodyPWAClass = `${bodyClass}-pwa`;

        body.classList.add(bodyPWAClass);
      }

      body.classList.add(bodyClass);
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
.auth-layout {
  @apply flex h-full min-h-screen md:p-2;
  @apply bg-gray-900;

  &-wrapper {
    @apply flex items-center justify-between;
  }

  .features-wrap {
    @apply p-12;
    @apply hidden w-full max-w-3xl flex-col justify-between lg:flex;
  }

  .main {
    @apply flex w-full flex-col items-center md:justify-center;
    @apply p-6 pt-[33%] md:pt-6 md:rounded-lg;
    @apply bg-gray-50 !bg-cover bg-fixed bg-center;

    .portable {
      @apply lg:hidden;
    }

    .view-wrap {
      @apply flex items-center justify-center;
      @apply w-full md:py-10;

      div {
        @apply border-none;
      }

      :deep(.mono-card) {
        @apply max-w-sm md:w-full md:max-w-[25rem];
        @apply bg-transparent md:bg-white;
        @apply shadow-none md:shadow;
        @apply px-0 py-6 md:p-8;

        .auth-title {
          @apply text-center text-3xl font-bold text-gray-900;
          @apply mb-6 md:mb-8;
        }

        .auth-link {
          @apply mt-6 flex justify-center;
          @apply text-sm font-normal text-gray-500 underline;
        }
      }

      :deep(.mono-button) {
        @apply mt-6 w-full md:mt-8;
      }
    }
  }
}

.pwa-layout {
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;

  .main {
    @apply mt-safe-top;
    @apply fixed inset-0 h-full overflow-auto;
    @apply rounded-t-2xl;
  }
}

.pr-none-lg {
  @apply lg:pr-0;
}

.rounded-r-none-lg {
  @apply lg:!rounded-r-none;
}

.features-l-rounded {
  @apply lg:!rounded-l-2xl;
}
</style>
