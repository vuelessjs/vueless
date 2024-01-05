<template>
  <tbody>
    <tr>
      <td :colspan="colspan">
        <slot>
          <UEmpty class="my-8" :description="emptyTableMsg" size="sm" data-cy="empty-table-msg" />
        </slot>
      </td>
    </tr>
  </tbody>
</template>

<script>
import UEmpty from "vueless/ui.text-empty";

export default {
  name: "EmptyTableMsg",

  components: { UEmpty },

  props: {
    colspan: {
      type: Number,
      default: 1,
    },

    filters: {
      type: Object,
      default: () => ({}),
    },

    i18n: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    emptyTableMsg() {
      const isFiltersApplied = !!Object.keys(this.filters).length;

      return isFiltersApplied ? this.i18n.noResultsForFilters : this.i18n.noItems;
    },
  },
};
</script>
