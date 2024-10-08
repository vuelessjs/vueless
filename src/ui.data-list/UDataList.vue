<template>
  <div v-bind="wrapperAttrs">
    <!--
      @slot Use it to add something instead of the drag icon.
      @binding {string} empty-title
      @binding {string} empty-description
    -->
    <slot
      v-if="!hideEmptyStateForNesting && !list?.length"
      name="empty"
      :empty-title="emptyTitle"
      :empty-description="emptyDescription"
    >
      <UEmpty
        :title="emptyTitle || currentLocale.emptyTitle"
        :description="emptyDescription || currentLocale.emptyDescription"
        v-bind="emptyAttrs"
      />
    </slot>

    <draggable
      v-else
      :list="list"
      :item-key="valueKey"
      :group="{ name: group }"
      handle=".icon-drag"
      :ghost-class="config.draggableGhost"
      :drag-class="config.draggableDrag"
      :data-test="dataTest"
      v-bind="draggableAttrs"
      :move="onDragMove"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <div :id="element[valueKey]" :data-test="`${dataTest}-item`" v-bind="itemWrapperAttrs">
          <div :data-test="`${dataTest}-item-${element[valueKey]}`" v-bind="itemAttrs">
            <!--
              @slot Use it to add something instead of the drag icon.
              @binding {object} item
              @binding {string} icon-name
              @binding {string} icon-size
            -->
            <slot
              name="drag"
              :item="element"
              :icon-name="config.defaults.dragIcon"
              :icon-size="iconSize"
            >
              <UIcon
                internal
                color="gray"
                :size="iconSize"
                :name="config.defaults.dragIcon"
                v-bind="dragIconAttrs"
              />
            </slot>

            <div v-bind="isActive(element) ? labelAttrs : labelCrossedAttrs">
              <!--
                @slot Use it to modify label.
                @binding {object} item
                @binding {boolean} active
              -->
              <slot name="label" :item="element" :active="isActive(element)">
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

              <!--
                @slot Use it to add something instead of the delete icon.
                @binding {object} item
                @binding {string} icon-name
                @binding {string} icon-size
              -->
              <slot
                name="delete"
                :item="element"
                :icon-name="config.defaults.deleteIcon"
                :icon-size="iconSize"
              >
                <UIcon
                  v-if="!element.isHiddenDelete"
                  internal
                  interactive
                  color="red"
                  :size="iconSize"
                  :name="config.defaults.deleteIcon"
                  :data-test="`${dataTest}-delete`"
                  :tooltip="currentLocale.delete"
                  v-bind="deleteIconAttrs"
                  @click="onClickDelete(element[valueKey], element[labelKey])"
                />
              </slot>

              <!--
                @slot Use it to add something instead of the edit icon.
                @binding {object} item
                @binding {string} icon-name
                @binding {string} icon-size
              -->
              <slot
                name="edit"
                :item="element"
                :icon-name="config.defaults.editIcon"
                :icon-size="iconSize"
              >
                <UIcon
                  v-if="!element.isHiddenEdit"
                  internal
                  interactive
                  color="gray"
                  :size="iconSize"
                  :name="config.defaults.editIcon"
                  :data-test="`${dataTest}-edit`"
                  :tooltip="currentLocale.edit"
                  v-bind="editIconAttrs"
                  @click="onClickEdit(element[valueKey], element[labelKey])"
                />
              </slot>
            </template>
          </div>

          <UDataList
            v-if="nesting && !element.isDisabledNesting"
            :nesting="nesting"
            hide-empty-state-for-nesting
            :list="element.children"
            :group="group"
            :data-test="`${dataTest}-table`"
            v-bind="nestedAttrs"
            @click-delete="onClickDelete"
            @click-edit="onClickEdit"
            @drag-sort="onDragEnd"
          >
            <template #label="{ item, active }">
              <!--
                @slot Use it to modify label.
                @binding {object} item
                @binding {boolean} active
              -->
              <slot name="label" :item="item" :active="active">
                <div v-bind="active ? labelCrossedAttrs : labelAttrs" v-text="item[labelKey]" />
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

import UIcon from "../ui.image-icon/UIcon.vue";
import UEmpty from "../ui.text-empty/UEmpty.vue";
import UDivider from "../ui.container-divider/UDivider.vue";
import { getDefault } from "../utils/utilUI.js";

import { UDataList as UDataListName } from "./constants.js";
import defaultConfig from "./config.js";
import useAttrs from "./useAttrs.js";
import { useLocale } from "../composables/useLocale.js";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  /**
   * Data item options.
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
    default: getDefault(defaultConfig, UDataListName).size,
  },

  /**
   * Label key in the item object of options.
   */
  labelKey: {
    type: String,
    default: getDefault(defaultConfig, UDataListName).labelKey,
  },

  /**
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: getDefault(defaultConfig, UDataListName).valueKey,
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
    default: getDefault(defaultConfig, UDataListName).animationDuration,
  },

  /**
   * Enable nesting.
   */
  nesting: {
    type: Boolean,
    default: getDefault(defaultConfig, UDataListName).nesting,
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
   * Component config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
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
  emptyAttrs,
  draggableAttrs,
  nestedAttrs,
  itemWrapperAttrs,
  itemAttrs,
  labelAttrs,
  labelCrossedAttrs,
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

function isActive(element) {
  return element.isActive === undefined || element.isActive;
}

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
