<template>
  <div class="mono-pagination-wrapper">
    <t-pagination
      v-model="currentPageModel"
      class="mono-pagination"
      :classes="paginationClasses"
      :per-page="perPage"
      :total-items="total"
      :data-cy="dataCy"
    />
  </div>
</template>

<script>
import TPagination from "vueless/library.vue-tailwind-3/t-pagination";

export default {
  name: "UPagination",

  components: { TPagination },

  props: {
    /**
     * Сurrent page number.
     */
    currentPage: {
      type: Number,
      default: 1,
    },

    /**
     * Set number of items per page..
     */
    perPage: {
      type: Number,
      default: 20,
    },

    /**
     * Set total number of items.
     */
    total: {
      type: Number,
      default: 0,
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },
  },

  emits: ["pageChange"],

  computed: {
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(page) {
        this.$emit("pageChange", page);
      },
    },

    paginationClasses() {
      return {
        wrapper: "table border-collapse text-center mx-auto",
        element: `pagination-element table-cell`,
        activeElement: `pagination-active-element table-cell`,
        disabledElement: `pagination-disabled-element table-cell`,
        ellipsisElement: `pagination-ellipsis-element hidden md:table-cell`,
        activeButton: `pagination-active-button w-full h-full transition duration-100 ease-in-out`,
        disabledButton: "opacity-25 cursor-not-allowed transition duration-100 ease-in-out",
        button: `pagination-button w-full h-full transition duration-100 ease-in-out`,
        ellipsis: "",
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
.mono-pagination {
  &-wrapper {
    @apply mt-4 flex justify-center;
  }

  :deep(.pagination) {
    &-element,
    &-active-element,
    &-disabled-element,
    &-ellipsis-element {
      @apply inline-flex justify-center items-center;
      @apply h-9 w-9;
    }

    &-active-button {
      @apply bg-gray-900/15 hover:bg-gray-900/5;
      @apply rounded;
    }

    &-button {
      @apply hover:bg-gray-900/5;
      @apply rounded;

      &:active {
        @apply bg-gray-900/10;
      }
    }
  }
}
</style>
