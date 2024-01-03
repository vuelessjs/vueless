<template>
  <div class="features">
    <h1 class="features-header" v-html="$t('layout.auth.heading')"></h1>

    <div class="features-describe-wrap">
      <div v-for="(feature, index) in features" :key="index" class="features-describe">
        <UIcon class="icon" name="bolt" color="green" />

        <h4 class="features-describe-text">
          {{ feature }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import UIcon from "vueless/ui.image-icon";

export default {
  name: "FeaturesBlock",

  components: {
    UIcon,
  },

  data() {
    return {
      features: this.$tm("layout.auth.feature"),
    };
  },
};
</script>

<style lang="postcss" scoped>
.features {
  &-header {
    @apply mb-10 text-5xl font-bold text-white;

    :deep(span) {
      @apply bg-gradient-to-br from-green-300 to-blue-300 bg-clip-text text-transparent;
    }
  }

  &-describe-wrap {
    @apply space-y-2.5;

    .features-describe {
      @apply flex items-center space-x-1;

      &-text {
        @apply text-base font-normal text-gray-400;
      }
    }
  }
}
</style>
