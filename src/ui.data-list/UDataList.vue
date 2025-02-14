<script setup lang="ts">
import { computed } from "vue";
import draggable from "vuedraggable";
import { merge } from "lodash-es";

import useUI from "../composables/useUI.ts";
import { getDefaults } from "../utils/ui.ts";
import { hasSlotContent } from "../utils/helper.ts";

import UIcon from "../ui.image-icon/UIcon.vue";
import UEmpty from "../ui.text-empty/UEmpty.vue";

import { COMPONENT_NAME } from "./constants.ts";
import defaultConfig from "./config.ts";
import { useLocale } from "../composables/useLocale.ts";

import type { Props, DragMoveEvent, DataListItem, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  list: () => [],
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

const { tm } = useLocale();

const i18nGlobal = tm(COMPONENT_NAME);
const currentLocale = computed(() => merge({}, defaultConfig.i18n, i18nGlobal, props.config.i18n));

function isActive(element: DataListItem) {
  return element.isActive === undefined || element.isActive;
}

function onDragMove(event: DragMoveEvent): boolean | void {
  const isDisabledNestingItem = event.draggedContext.element.isDisabledNesting;
  const isNestingAction = !event.relatedContext?.element?.isDisabledNesting;

  if (isDisabledNestingItem && isNestingAction) {
    return false;
  }
}

function onDragEnd() {
  const sortData = prepareSortData(props.list);

  emit("dragSort", sortData);
}

function onClickEdit(value: number, label: string) {
  emit("clickEdit", value, label);
}

function onClickDelete(value: number, label: string) {
  emit("clickDelete", value, label);
}

function prepareSortData(list: DataListItem[] = [], parentValue: string | number | null = null) {
  const sortData: DataListItem[] = [];

  list.forEach((item: DataListItem) => {
    const hasItemChildren = item?.children?.length;

    if (hasItemChildren) {
      const childrenItem = prepareSortData(
        item.children,
        item[props.valueKey] as string | number | null,
      );

      childrenItem.forEach((item) => sortData.push(item));
    }

    const parentItem = { ...item, parentValue };

    sortData.push(parentItem);
  });

  return sortData;
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const {
  getDataTest,
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
} = useUI<Config>(defaultConfig);
</script>

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
      :animation="animationDuration"
      :ghost-class="config.draggableGhost"
      :drag-class="config.draggableDrag"
      v-bind="draggableAttrs"
      :data-test="getDataTest()"
      :move="onDragMove"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <div :id="element[valueKey]" v-bind="itemWrapperAttrs" :data-test="getDataTest('item')">
          <div v-bind="itemAttrs" :data-test="getDataTest(`item-${element[valueKey]}`)">
            <!--
              @slot Use it to add something instead of the drag icon.
              @binding {object} item
              @binding {string} icon-name
            -->
            <slot name="drag" :item="element" :icon-name="config.defaults.dragIcon">
              <UIcon
                internal
                color="gray"
                variant="light"
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
              -->
              <slot name="delete" :item="element" :icon-name="config.defaults.deleteIcon">
                <UIcon
                  v-if="!element.isHiddenDelete"
                  internal
                  interactive
                  color="red"
                  :name="config.defaults.deleteIcon"
                  :tooltip="currentLocale.delete"
                  v-bind="deleteIconAttrs"
                  :data-test="getDataTest('delete')"
                  @click="onClickDelete(element[valueKey], element[labelKey])"
                />
              </slot>

              <!--
                @slot Use it to add something instead of the edit icon.
                @binding {object} item
                @binding {string} icon-name
              -->
              <slot name="edit" :item="element" :icon-name="config.defaults.editIcon">
                <UIcon
                  v-if="!element.isHiddenEdit"
                  internal
                  interactive
                  color="gray"
                  :name="config.defaults.editIcon"
                  :tooltip="currentLocale.edit"
                  v-bind="editIconAttrs"
                  :data-test="getDataTest('edit')"
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
            v-bind="nestedAttrs"
            :data-test="getDataTest('table')"
            @click-delete="onClickDelete"
            @click-edit="onClickEdit"
            @drag-sort="onDragEnd"
          >
            <template #label="slotProps: { item: DataListItem; active: boolean }">
              <!--
                @slot Use it to modify label.
                @binding {object} item
                @binding {boolean} active
              -->
              <slot name="label" :item="slotProps.item" :active="slotProps.active">
                <div
                  v-bind="slotProps.active ? labelAttrs : labelCrossedAttrs"
                  v-text="slotProps.item[labelKey]"
                />
              </slot>
            </template>

            <template #actions="slotProps: { item: DataListItem }">
              <!--
                @slot Use it to add custom actions.
                @binding {object} item
              -->
              <slot name="actions" :item="slotProps.item" />
            </template>
          </UDataList>
        </div>
      </template>
    </draggable>
  </div>
</template>
