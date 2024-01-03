<template>
  <div class="languages">
    <h5
      v-for="(language, index) in languages"
      :key="index"
      class="title"
      :class="[titleClass, getActiveLanguageClass(language.code)]"
      @click="onChangeLanguage(language.code)"
    >
      {{ language.slug }}
    </h5>
  </div>
</template>

<script>
import { mapState } from "vuex";
import I18nServiceDefault from "vueless/service.i18n";

const I18nService = new I18nServiceDefault();

export default {
  name: "LanguageSwitcher",

  props: {
    /**
     * Set component variant.
     * @values light, dark
     */
    variant: {
      type: String,
      default: "light",
    },
  },

  computed: {
    ...mapState("user", ["languages"]),

    titleClass() {
      return `title-${this.variant}`;
    },
  },

  methods: {
    getActiveLanguageClass(language) {
      const isActiveLanguage = I18nService.getActiveLanguage() === language;
      const activeClass = `language-active-${this.variant}`;

      return {
        [activeClass]: isActiveLanguage,
      };
    },

    onChangeLanguage(language) {
      I18nService.setActiveLanguage(language);

      window.location.reload();
    },
  },
};
</script>

<style lang="postcss" scoped>
.languages {
  @apply flex;
  @apply space-x-3 divide-x divide-gray-500;

  .title {
    @apply text-sm font-medium text-gray-500;
    @apply cursor-pointer pl-3;

    &-light:hover {
      @apply text-white;
    }

    &-dark:hover {
      @apply text-gray-900;
    }
  }

  .language-active {
    &-light {
      @apply text-white;
    }

    &-dark {
      @apply text-gray-900;
    }
  }
}
</style>
