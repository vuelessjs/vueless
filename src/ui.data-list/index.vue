<template>
  <div v-bind="wrapperAttrs">
    <UDivider v-if="upperlined" size="xl" no-top-padding v-bind="dividerAttrs" />

    <UEmpty
      v-if="!hideEmptyStateForNesting && !list?.length"
      :description="emptyDescription"
      :title="emptyTitle"
      v-bind="emptyAttrs"
    />

    <draggable
      v-else
      :list="list"
      item-key="id"
      :group="{ name: group }"
      handle=".icon-drag"
      :ghost-class="config.draggableGhost"
      :drag-class="config.draggableDrag"
      :data-cy="dataCy"
      v-bind="draggableAttrs"
      :move="onDragMove"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <div :id="element.id" :data-cy="`${dataCy}-item`" v-bind="itemWrapperAttrs">
          <div :data-cy="`${dataCy}-item-${element.id}`" v-bind="itemAttrs">
            <UIcon internal :name="config.dragIconName" color="gray" v-bind="dragIconAttrs" />

            <div v-bind="titleAttrs(element.isActive)">
              <slot :item="element">
                {{ element.name }}
              </slot>
            </div>

            <template v-if="!element.isHiddenAction">
              <div
                v-if="hasSlotContent($slots['icons']) && !element.isHiddenCustomActions"
                v-bind="customActionsAttrs"
              >
                <!-- @slot Use it to add icons. -->
                <slot name="icons" :item="element" />
              </div>

              <UIcon
                v-if="!element.isHiddenDelete"
                internal
                interactive
                color="gray"
                :name="config.deleteIconName"
                :data-cy="`${dataCy}-delete`"
                :tooltip="currentLocale.delete"
                v-bind="deleteIconAttrs"
                @click="onClickDelete(element.id, element.name)"
              />

              <UIcon
                v-if="!element.isHiddenEdit"
                internal
                interactive
                color="gray"
                :name="config.editIconName"
                :data-cy="`${dataCy}-edit`"
                :tooltip="currentLocale.edit"
                v-bind="editIconAttrs"
                @click="onClickEdit(element.id)"
              />
            </template>
          </div>

          <UDataList
            v-if="nesting && !element.isDisabledNesting"
            :nesting="nesting"
            hide-empty-state-for-nesting
            :list="element.children"
            :group="group"
            :data-cy="`${dataCy}-table`"
            v-bind="nestedAttrs"
            @click-delete="onClickDelete"
            @click-edit="onClickEdit"
            @drag-sort="onDragEnd"
          >
            <template #default="{ item }">
              <slot :item="item">
                <div v-bind="titleAttrs" v-text="item.name" />
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

<script setup>
import { computed } from "vue";
import draggable from "vuedraggable";
import { merge } from "lodash-es";

import UIcon from "../ui.image-icon";
import UEmpty from "../ui.text-empty";
import UDivider from "../ui.container-divider";
import UIService from "../service.ui";

import { UDataListName } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";
import { useLocale } from "../composable.locale";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDataList", inheritAttrs: true });

const props = defineProps({
  /**
   * Data list array.
   */
  list: {
    type: Array,
    default: () => [],
  },

  /**
   * Group name.
   */
  group: {
    type: String,
    default: "",
  },

  /**
   * Enables nesting.
   */
  nesting: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDataListName).default.nesting,
  },

  /**
   * Empty state title.
   */
  emptyTitle: {
    type: String,
    default: "",
  },

  /**
   * Empty state description.
   */
  emptyDescription: {
    type: String,
    default: "",
  },

  /**
   * Drag animation duration.
   */
  animationDuration: {
    type: Number,
    default: UIService.get(defaultConfig, UDataListName).default.animationDuration,
  },

  /**
   * Add line divider above the list.
   */
  upperlined: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDataListName).default.upperlined,
  },

  /**
   * @ignore
   * Disable empty state for nested elements if empty (internal prorps).
   */
  hideEmptyStateForNesting: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDataListName).default.hideEmptyStateForNesting,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["dragSort", "clickEdit", "clickDelete"]);

const {
  config,
  wrapperAttrs,
  dividerAttrs,
  emptyAttrs,
  draggableAttrs,
  nestedAttrs,
  itemWrapperAttrs,
  itemAttrs,
  titleAttrs,
  customActionsAttrs,
  deleteIconAttrs,
  editIconAttrs,
  dragIconAttrs,
  hasSlotContent,
} = useAttrs(props);
const { tm } = useLocale();

const i18nGlobal = tm(UDataListName);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

function onDragMove(event) {
  const isDisabledNestingItem = event.draggedContext.element.isDisabledNesting;
  const isNestingAction = !event.relatedContext.element?.isDisabledNesting;

  if (isDisabledNestingItem && isNestingAction) {
    return false;
  }
}

function onDragEnd() {
  const sortData = prepareSortData(props.list);

  emit("dragSort", sortData);
}

function onClickEdit(id) {
  emit("clickEdit", id);
}

function onClickDelete(id, title) {
  emit("clickDelete", id, title);
}

function prepareSortData(list, parentId) {
  let sortData = [];

  list.forEach((item) => {
    let hasItemChildren = item?.children?.length;

    if (hasItemChildren) {
      let childrenItem = prepareSortData(item.children, item.id);

      childrenItem.forEach((item) => {
        sortData.push(item);
      });
    }

    let parentItem = { ...item, parentId: 0 || parentId };

    sortData.push(parentItem);
  });

  return sortData;
}
</script>
