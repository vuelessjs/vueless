<template>
  <div class="info-block">
    <div v-if="configs?.translate?.title" class="title">{{ $t(configs?.translate.title) }}</div>
    <UText
      v-if="configs?.translate?.content"
      class="content"
      :html="$t(configs?.translate.content)"
    />
    <ULink
      v-if="isShownLink"
      :url="configs.link.url"
      :text="configs.link.text"
      size="sm"
      no-focus-ring
    >
      <template v-if="configs.link.isButton">
        <UButton class="button" :text="configs.link.text" size="sm" filled>
          <template #left>
            <UIcon class="icon" name="straight-fill" color="white" size="xs" />
          </template>
        </UButton>
      </template>
    </ULink>
  </div>
</template>

<script>
import { mapState } from "vuex";

import UText from "vueless/ui.text-block";
import ULink from "vueless/ui.button-link";
import UButton from "vueless/ui.button";
import UIcon from "vueless/ui.image-icon";

export default {
  name: "AsideInfoBlock",

  components: {
    UText,
    ULink,
    UButton,
    UIcon,
  },

  computed: {
    ...mapState("layout", ["asideInfoBlockConfigs"]),

    configs() {
      return this.asideInfoBlockConfigs;
    },

    isShownLink() {
      const { link } = this.configs;

      return link?.url && (link?.isButton || link?.text);
    },
  },
};
</script>

<style lang="postcss" scoped>
.info-block {
  @apply h-auto w-full;
  @apply pt-4;
  @apply border-t border-gray-200;

  .title {
    @apply mb-4;
    @apply font-bold;
  }

  .content {
    @apply text-sm leading-5;
    @apply mb-4;
  }

  .button {
    @apply w-full;

    .icon {
      @apply -rotate-90;
    }
  }
}
</style>
