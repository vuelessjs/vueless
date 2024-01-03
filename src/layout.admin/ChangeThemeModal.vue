<template>
  <UModal v-model="isShownModal" class="change-theme-modal" width="xl" :title="i18n.themeSettings">
    <div class="themes">
      <div
        v-for="(theme, index) of backgroundThemes"
        :key="index"
        class="theme"
        :class="activeThemeClass(theme.full)"
        :style="bgImage(theme.preview)"
        @click="onClickTheme(theme.full)"
      >
        <div v-if="theme.full === activeTheme" class="icon-wrapper">
          <UIcon name="check-fill" color="white" variant="light" size="xs" class="icon" />
        </div>
      </div>
    </div>

    <template #footer-left>
      <UButton :text="i18n.close" @click="onClickCloseButton" />
    </template>
  </UModal>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import I18nServiceDefault from "vueless/service.i18n";

import UModal from "vueless/ui.container-modal";
import UIcon from "vueless/ui.image-icon";
import UButton from "vueless/ui.button";

import layoutMixin from "./mixins";

export default {
  name: "ChangeThemeModal",

  components: {
    UModal,
    UIcon,
    UButton,
  },

  mixins: [layoutMixin],

  setup() {
    const { getTranslation } = new I18nServiceDefault();

    return { getTranslation };
  },

  computed: {
    ...mapState("layout", ["isShownThemeModal", "activeTheme", "defaultTheme"]),

    isShownModal: {
      get() {
        return this.isShownThemeModal;
      },
      set(value) {
        this.SET_SHOWN_THEME_MODAL(value);
      },
    },

    backgroundThemes() {
      const themes = Object.values(
        import.meta.glob(`@/assets/images/themes/*.{png,jpg,jpeg,PNG,JPEG}`, {
          eager: true,
          as: "url",
        }),
      );

      const themePreviews = Object.values(
        import.meta.glob(`@/assets/images/themes/*_preview.{png,jpg,jpeg,PNG,JPEG}`, {
          eager: true,
          as: "url",
        }),
      );

      if (!themes.length) {
        return [this.defaultTheme];
      }

      const images = [];

      themePreviews.forEach((preview) => {
        const [themePath] = preview.split("_");
        const full = themes.find((theme) => theme.includes(themePath));

        images.push({ preview, full });
      });

      return images;
    },

    i18n() {
      return {
        themeSettings: this.getTranslation("themeSettings"),
        close: this.getTranslation("close"),
      };
    },
  },

  watch: {
    isShownModal: "onChangeShownModal",
  },

  methods: {
    ...mapMutations("layout", ["SET_SHOWN_THEME_MODAL", "SET_ACTIVE_THEME", "SAVE_ACTIVE_THEME"]),

    bgImage(image) {
      return `background-image: url(${image});`;
    },

    activeThemeClass(theme) {
      return theme === this.activeTheme ? "active-theme" : "";
    },

    onClickTheme(theme) {
      this.SET_ACTIVE_THEME(theme);
    },

    onClickCloseButton() {
      this.isShownModal = false;
    },

    onChangeShownModal() {
      if (!this.isShownModal) this.SAVE_ACTIVE_THEME();
    },
  },
};
</script>

<i18n>
en:
  themeSettings: Theme settings
  close: Close
ru:
  themeSettings: Настройки темы
  close: Закрыть
ua:
  themeSettings: Налаштування теми
  close: Закрити
</i18n>

<style lang="postcss" scoped>
.change-theme-modal {
  .themes {
    @apply grid grid-cols-4 gap-6;

    .theme {
      @apply h-[17.125rem] w-[10rem];
      @apply rounded-lg border border-solid border-gray-200 bg-cover bg-center bg-gray-200;
      @apply relative;
      @apply cursor-pointer;

      &:hover {
        @apply border-gray-400;
      }

      &.active-theme {
        @apply border-2 border-gray-600;

        &:hover {
          .icon-wrapper {
            @apply bg-gray-700;
          }
        }
      }

      .icon-wrapper {
        @apply absolute right-4 top-4;
        @apply h-5 w-5;
        @apply rounded-full bg-gray-900;
        @apply flex items-center justify-center;
        @apply cursor-pointer;
      }
    }
  }
}
</style>
