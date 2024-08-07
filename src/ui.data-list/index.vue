<template>
  <div v-bind="wrapperAttrs">
    <UDivider v-if="upperlined" size="xl" no-top-padding v-bind="dividerAttrs" />

    <UEmpty
      v-if="!hideEmptyStateForNesting && !list?.length"
      :title="emptyTitle || currentLocale.emptyTitle"
      :description="emptyDescription || currentLocale.emptyDescription"
      v-bind="emptyAttrs"
    />

    <draggable
      v-else
      :list="list"
      :item-key="valueKey"
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
        <div :id="element[valueKey]" :data-cy="`${dataCy}-item`" v-bind="itemWrapperAttrs">
          <div :data-cy="`${dataCy}-item-${element[valueKey]}`" v-bind="itemAttrs">
            <UIcon
              internal
              color="gray"
              :size="iconSize"
              :name="config.dragIconName"
              v-bind="dragIconAttrs"
            />

            <div v-bind="labelAttrs(element.isActive)">
              <!--
                @slot Use it to modify label.
                @binding {object} item
              -->
              <slot name="label" :item="element">
                {{ element[labelKey] }}
              </slot>
            </div>

            <template v-if="!element.isHiddenActions">
              <div
                v-if="hasSlotContent($slots['actions']) && !element.isHiddenCustomActions"
                v-bind="customActionsAttrs"
              >
                <!--
                  @slot Use it to add custom actions.
                  @binding {object} item
                -->
                <slot name="actions" :item="element" />
              </div>

              <UIcon
                v-if="!element.isHiddenDelete"
                internal
                interactive
                color="gray"
                :size="iconSize"
                :name="config.deleteIconName"
                :data-cy="`${dataCy}-delete`"
                :tooltip="currentLocale.delete"
                v-bind="deleteIconAttrs"
                @click="onClickDelete(element[valueKey], element[labelKey])"
              />

              <UIcon
                v-if="!element.isHiddenEdit"
                internal
                interactive
                color="gray"
                :size="iconSize"
                :name="config.editIconName"
                :data-cy="`${dataCy}-edit`"
                :tooltip="currentLocale.edit"
                v-bind="editIconAttrs"
                @click="onClickEdit(element[valueKey], element[labelKey])"
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
            <template #label="{ item }">
              <slot name="label" :item="item">
                <div v-bind="labelAttrs" v-text="item[labelKey]" />
              </slot>
            </template>

            <template #actions="{ item }">
              <!--
                @slot Use it to add custom actions.
                @binding {object} item
              -->
              <slot name="actions" :item="item" />
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

import { UDataList as UDataListName } from "./constants";
import defaultConfig from "./configs/default.config";
import useAttrs from "./composables/attrs.composable";
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
   * Data list size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UDataListName).default.size,
  },

  /**
   * Label key in the item object of options.
   */
  labelKey: {
    type: String,
    default: UIService.get(defaultConfig, UDataListName).default.labelKey,
  },

  /**
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: UIService.get(defaultConfig, UDataListName).default.valueKey,
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
   * Enables nesting.
   */
  nesting: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDataListName).default.nesting,
  },

  /**
   * Add line divider above the list.
   */
  upperlined: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDataListName).default.upperlined,
  },

  /**
   * Disable empty state for nested elements if empty (internal props).
   * @ignore
   */
  hideEmptyStateForNesting: {
    type: Boolean,
    default: false,
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

const emit = defineEmits([
  /**
   * Triggers when item is sorted (after drag).
   * @property {array} sortData
   */
  "dragSort",

  /**
   * Triggers when edit button is clicked.
   * @property {number} value
   * @property {string} label
   */
  "clickEdit",

  /**
   * Triggers when delete button is clicked.
   * @property {number} value
   * @property {string} label
   */
  "clickDelete",
]);

const {
  config,
  wrapperAttrs,
  dividerAttrs,
  emptyAttrs,
  draggableAttrs,
  nestedAttrs,
  itemWrapperAttrs,
  itemAttrs,
  labelAttrs,
  customActionsAttrs,
  deleteIconAttrs,
  editIconAttrs,
  dragIconAttrs,
  hasSlotContent,
} = useAttrs(props);
const { tm } = useLocale();

const i18nGlobal = tm(UDataListName);
const currentLocale = computed(() => merge(defaultConfig.i18n, i18nGlobal, props.config.i18n));

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

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

function onClickEdit(value, label) {
  emit("clickEdit", value, label);
}

function onClickDelete(value, label) {
  emit("clickDelete", value, label);
}

function prepareSortData(list, parentId) {
  let sortData = [];

  list.forEach((item) => {
    let hasItemChildren = item?.children?.length;

    if (hasItemChildren) {
      let childrenItem = prepareSortData(item.children, item[props.valueKey]);

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
