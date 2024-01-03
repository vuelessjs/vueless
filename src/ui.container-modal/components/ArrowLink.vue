<template>
  <router-link
    :to="{ name: backRoute.name, params: backRoute.params }"
    class="arrow-link"
    :data-cy="dataCy"
  >
    <t-button class="arrow-button" @click="onClick">
      <UIcon class="icon" name="arrow_back" size="xs" color="gray" />

      <div class="title">
        {{ backRoute.title }}
      </div>
    </t-button>
  </router-link>
</template>

<script>
import UIcon from "vueless/ui.image-icon";
import TButton from "vueless/library.vue-tailwind-3/t-button";

export default {
  name: "ArrowLink",

  components: {
    UIcon,
    TButton,
  },

  props: {
    backRoute: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        title: "",
        params: {},
      }),
      validator(backRoute) {
        const isExistName = "name" in backRoute;
        const isExistTitle = "title" in backRoute;

        return isExistName && isExistTitle;
      },
    },

    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["click"],

  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="postcss" scoped>
.arrow {
  &-link {
    @apply block h-3.5;
  }

  &-button {
    @apply inline-flex items-center;
    @apply border-0 bg-transparent p-0 shadow-none;
    @apply cursor-pointer;

    &:hover {
      @apply bg-transparent;
    }

    .title {
      @apply text-xs font-normal text-gray-500;
      @apply ml-0.5;
    }

    .icon:deep(g rect) {
      @apply opacity-100;
    }
  }
}
</style>
