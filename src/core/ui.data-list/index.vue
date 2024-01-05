<template>
  <div class="mono-table-list-wrapper">
    <UDivider v-if="upperlined" size="xl" no-top-padding />

    <UEmpty
      v-if="!hideEmptyStateForNesting && !list?.length"
      :description="emptyDescription"
      :title="emptyTitle"
    />

    <draggable
      v-else
      v-bind="dragOptions"
      :list="list"
      item-key="id"
      :group="{ name: group }"
      class="mono-table-list"
      handle=".icon-drag"
      drag-class="draggable-item"
      :data-cy="dataCy"
      :move="onDragMove"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <div :id="element.id" class="mono-table-list-items" :data-cy="`${dataCy}-item`">
          <div class="mono-table-list-item-parent" :data-cy="`${dataCy}-item-${element.id}`">
            <div class="mono-table-list-item-left-wrapper">
              <div class="mono-table-list-item-left">
                <UIcon class="icon-drag" name="drag_indicator" color="gray" variant="light" />
              </div>

              <div
                class="mono-table-list-item-left-title"
                :class="getInactiveClass(element.isActive)"
              >
                <slot :item="element">
                  {{ element.name }}
                </slot>
              </div>
            </div>

            <div v-if="!element.isHiddenAction" class="mono-table-list-item-right">
              <div v-if="isShownIconsSlot && !element.isHiddenIconSlot" class="icon-wrapper">
                <!-- @slot Use it to add icons. -->
                <slot name="icons" :item="element" />
              </div>

              <UIcon
                v-if="!element.isHiddenIconRemove"
                interactive
                class="icon-remove"
                name="delete"
                color="gray"
                :data-cy="`${dataCy}-delete`"
                :tooltip="$t('button.delete')"
                @click="onClickDelete(element.id, element.name)"
              />

              <UIcon
                v-if="!element.isHiddenIconEdit"
                interactive
                class="icon-edit"
                name="edit_note"
                color="gray"
                :data-cy="`${dataCy}-edit`"
                :tooltip="$t('button.edit')"
                @click="onClickEdit(element.id)"
              />
            </div>
          </div>

          <UDataList
            v-if="nesting && !element.isDisabledNesting"
            :nesting="nesting"
            hide-empty-state-for-nesting
            class="mono-table-list-nested"
            :list="element.children"
            :group="group"
            :data-cy="`${dataCy}-table`"
            @clickDelete="onClickDelete"
            @clickEdit="onClickEdit"
            @dragSort="onDragEnd"
          >
            <template #default="{ item }">
              <slot :item="item">
                <div class="mono-table-list-item-left-title">{{ item.name }}</div>
              </slot>
            </template>

            <template #icons="{ item }">
              <!-- @slot Use it to add icons. -->
              <slot name="icons" :item="item" />
            </template>
          </UDataList>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

import UIcon from "vueless/ui.image-icon";
import UDivider from "vueless/ui.container-divider";

export default {
  name: "UDataList",

  components: {
    UIcon,
    UDivider,
    draggable,
  },

  props: {
    /**
     * Set data list for component.
     */
    list: {
      type: Array,
      default: () => [],
    },

    /**
     * Set group name.
     */
    group: {
      type: String,
      default: "",
    },

    /**
     * Enable or disable nesting.
     */
    nesting: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets empty state title when no data in a table.
     */
    emptyTitle: {
      type: String,
      default: "",
    },

    /**
     * Sets empty state description when no data in a table.
     */
    emptyDescription: {
      type: String,
      default: "",
    },

    /**
     * Add line divider above the list.
     */
    upperlined: {
      type: Boolean,
      default: false,
    },

    /**
     * Sets data-cy attribute for automated testing.
     */
    dataCy: {
      type: String,
      default: "",
    },

    /**
     * @ignore
     * Disable empty state for nested elements if empty (internal prorps).
     */
    hideEmptyStateForNesting: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["dragSort", "clickEdit", "clickDelete"],

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: this.group,
        disabled: false,
        ghostClass: "ghost",
      };
    },

    isShownIconsSlot() {
      return !!this.$slots["icons"];
    },
  },

  methods: {
    onDragMove(event) {
      const isDisabledNestingItem = event.draggedContext.element.isDisabledNesting;
      const isNestingAction = !event.relatedContext.element?.isDisabledNesting;

      if (isDisabledNestingItem && isNestingAction) {
        return false;
      }
    },

    getInactiveClass(isActive) {
      return isActive !== undefined && !isActive ? "mono-table-list-item-left-title-inactive" : "";
    },

    onDragEnd() {
      const sortData = this.prepareSortData(this.list);

      this.$emit("dragSort", sortData);
    },

    onClickEdit(id) {
      this.$emit("clickEdit", id);
    },

    onClickDelete(id, title) {
      this.$emit("clickDelete", id, title);
    },

    prepareSortData(list, parentId) {
      let sortData = [];

      list.forEach((item) => {
        let hasItemChildren = item?.children?.length;

        if (hasItemChildren) {
          let childrenItem = this.prepareSortData(item.children, item.id);

          childrenItem.forEach((item) => {
            sortData.push(item);
          });
        }

        let parentItem = { ...item, parentId: 0 || parentId };

        sortData.push(parentItem);
      });

      return sortData;
    },
  },
};
</script>

<style lang="postcss" scoped>
.ghost {
  @apply bg-gray-100 bg-opacity-50;
}

.draggable-item {
  @apply bg-gray-100;
  @apply border-b-0;
}

.sortable-chosen {
  .mono-table-list-item-parent {
    @apply border-b-0;
  }
}

.mono-table-list {
  &-nested {
    @apply ml-6;
  }

  &-item {
    &-parent {
      @apply flex flex-auto items-center justify-between;
      @apply py-4 space-x-4;
      @apply border border-l-0 border-r-0 border-t-0 border-solid border-gray-100;

      &:hover {
        :deep(.mono-svg-icon) {
          @apply md:opacity-100;
          @apply md:transition md:duration-100 md:ease-in-out;
        }

        .icon-wrapper,
        .icon-remove {
          @apply md:opacity-100;
        }
      }
    }

    &-left {
      @apply flex items-center;

      &-wrapper {
        @apply flex space-x-4 items-center;
      }

      &-title {
        @apply flex-auto;
        @apply text-base font-normal text-gray-900;
        @apply pt-px;

        &-inactive {
          @apply line-through;
        }
      }
    }

    &-right {
      @apply flex flex-none items-center justify-end;
      @apply w-28 space-x-5;
    }
  }

  &-items {
    &:last-child {
      .mono-table-list-item-parent {
        @apply border-b-0;
      }
    }
  }

  &-nested {
    .mono-table-list-items {
      &:last-child {
        .mono-table-list-item-parent {
          @apply border-b;
        }
      }
    }
  }
}

.icon {
  &-wrapper {
    @apply md:items-center space-x-5 hidden md:flex;
    @apply opacity-50 md:opacity-0;
  }

  &-edit {
    :deep(svg) {
      @apply fill-gray-500 opacity-50;
    }
  }

  &-remove {
    @apply hidden md:block md:opacity-0;
  }

  &-drag {
    @apply cursor-move;

    :deep(svg) {
      @apply fill-gray-400;
      @apply opacity-100;
    }

    &:hover {
      :deep(svg) {
        @apply md:fill-gray-500;
      }
    }
  }
}
</style>
