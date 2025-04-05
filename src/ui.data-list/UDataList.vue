<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
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
]);

const { tm } = useLocale();

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");

const i18nGlobal = tm(COMPONENT_NAME);
const currentLocale = computed(() => merge({}, defaultConfig.i18n, i18nGlobal, props.config.i18n));

function isCrossed(element: DataListItem) {
  return Boolean(element.crossed);
}

function onDragMove(event: DragMoveEvent): boolean | void {
  const isDisabledNestingItem = !Boolean(event.draggedContext.element.nesting);
  const isNestingAction = Boolean(event.relatedContext?.element?.nesting);

  if (isDisabledNestingItem && isNestingAction) {
    return false;
  }
}

function onDragEnd() {
  const sortData = prepareSortData(props.list);

  emit("dragSort", sortData);
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

defineExpose({
  /**
   * A reference to the component's wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,
});

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
  dragIconAttrs,
  dragAttrs,
} = useUI<Config>(defaultConfig);
</script>

<template>
  <div ref="wrapper" v-bind="wrapperAttrs">
    <!--
      @slot Use it to add custom empty state.
      @binding {string} empty-title
      @binding {string} empty-description
    -->
    <slot
      v-if="!hideEmptyStateForNesting && !list?.length"
      name="empty"
      :empty-title="currentLocale.emptyTitle"
      :empty-description="currentLocale.emptyDescription"
    >
      <UEmpty
        :title="currentLocale.emptyTitle"
        :description="currentLocale.emptyDescription"
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
            <div v-bind="dragAttrs">
              <!--
                @slot Use it to add something instead of the drag icon.
                @binding {object} item
                @binding {string} icon-name
              -->
              <slot name="drag" :item="element" :icon-name="config.defaults.dragIcon">
                <UIcon
                  internal
                  color="neutral"
                  variant="light"
                  :name="config.defaults.dragIcon"
                  v-bind="dragIconAttrs"
                />
              </slot>
            </div>

            <div v-bind="isCrossed(element) ? labelCrossedAttrs : labelAttrs">
              <!--
                @slot Use it to modify label.
                @binding {object} item
                @binding {boolean} crossed
              -->
              <slot name="label" :item="element" :crossed="isCrossed(element)">
                {{ element[labelKey] }}
              </slot>
            </div>

            <template v-if="element.actions !== false">
              <div v-if="hasSlotContent($slots['actions'])" v-bind="customActionsAttrs">
                <!--
                  @slot Use it to add custom actions.
                  @binding {object} item
                -->
                <slot name="actions" :item="element" />
              </div>
            </template>
          </div>

          <UDataList
            v-if="nesting && element.nesting"
            :nesting="nesting"
            hide-empty-state-for-nesting
            :list="element.children"
            :group="group"
            v-bind="nestedAttrs"
            :data-test="getDataTest('table')"
            @drag-sort="onDragEnd"
          >
            <template #label="slotProps: { item: DataListItem; crossed: boolean }">
              <!--
                @slot Use it to modify label.
                @binding {object} item
                @binding {boolean} crossed
              -->
              <slot name="label" :item="slotProps.item" :crossed="slotProps.crossed">
                <div
                  v-bind="slotProps.crossed ? labelCrossedAttrs : labelAttrs"
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
