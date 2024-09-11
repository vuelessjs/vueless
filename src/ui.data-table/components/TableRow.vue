<template>
  <tr v-bind="$attrs" @click="onClick(props.row)">
    <td
      v-if="selectable"
      :style="getNestedCheckboxShift()"
      v-bind="attrs.bodyCellAttrs(config.bodyCellCheckbox)"
    >
      <UCheckbox
        v-model="selectedRows"
        :data-id="row.id"
        :value="row.id"
        size="sm"
        :data-test="`${dataTest}-body-checkbox`"
        v-bind="attrs.bodyCheckboxAttrs"
      />
    </td>

    <td
      v-for="(value, key, index) in getFilteredRow(row, columns)"
      :key="index"
      v-bind="attrs.bodyCellAttrs(getCellClasses(key, row, index))"
    >
      <div
        v-if="(row.row || nestedLevel) && index === 0"
        :style="getNestedShift()"
        v-bind="attrs.bodyCellNestedAttrs"
      >
        <UIcon
          v-if="row.row"
          size="xs"
          internal
          interactive
          :name="
            row?.row?.isHidden
              ? config.defaults.bodyCellNestedExpandIcon
              : config.defaults.bodyCellNestedCollapseIcon
          "
          color="brand"
          v-bind="toggleIconConfig"
          @click="onClickToggleRowChild(row.row.id)"
        />
      </div>

      <div v-if="value?.hasOwnProperty('secondary')">
        <slot :name="`cell-${key}`" :value="value" :row="row">
          <div
            v-bind="attrs.bodyCellPrimaryAttrs"
            ref="cellRef"
            :data-test="`${dataTest}-${key}-cell`"
          >
            {{ value.primary || HYPHEN_SYMBOL }}
          </div>

          <div v-bind="attrs.bodyCellSecondaryAttrs">
            <template v-if="Array.isArray(value.secondary)">
              <div v-for="(secondary, idx) in value.secondary" ref="cellRef" :key="idx">
                <span v-bind="attrs.bodyCellSecondaryEmptyAttrs">
                  {{ secondary }}
                </span>
              </div>
            </template>

            <div v-else ref="cellRef">
              {{ value.secondary }}
            </div>
          </div>
        </slot>
      </div>

      <template v-else>
        <slot :name="`cell-${key}`" :value="value" :row="row">
          <div
            v-bind="attrs.bodyCellPrimaryAttrs"
            ref="cellRef"
            :data-test="`${dataTest}-${key}-cell`"
          >
            {{ value || value === 0 ? value : HYPHEN_SYMBOL }}
          </div>
        </slot>
      </template>
    </td>
  </tr>

  <TableRow
    v-if="row.row && !row.row.isHidden"
    v-bind="$attrs"
    v-model:selected-rows="selectedRows"
    :attrs="attrs"
    :columns="columns"
    :row="row.row"
    :data-test="dataTest"
    :nested-level="nestedLevel + 1"
    :config="config"
    :selectable="selectable"
    @toggle-row-visibility="onClickToggleRowChild"
    @click="onClick"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { HYPHEN_SYMBOL } from "../../constants";
import { getFilteredRow } from "../services/table.service.js";

import { useMutationObserver } from "../../composable.mutationObserver/index.js";

import UIcon from "../../ui.image-icon";
import UCheckbox from "../../ui.form-checkbox";

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  tag: {
    type: String,
    default: "tr",
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  nestedLevel: {
    type: Number,
    default: 0,
  },
  dataTest: {
    type: String,
    required: true,
  },
  attrs: {
    type: Object,
    required: true,
  },
  config: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["toggleRowVisibility", "click"]);

const selectedRows = defineModel("selectedRows", { type: Array, default: () => [] });

const cellRef = ref([]);

useMutationObserver(cellRef, setCellTitle, { childList: true });

const toggleIconConfig = computed(() =>
  props.row?.row?.isHidden
    ? props.attrs.bodyCellNestedExpandIconAttrs
    : props.attrs.bodyCellNestedCollapseIconAttrs,
);

const shift = computed(() => (props.row.row ? 1.5 : 2));

onMounted(() => {
  cellRef.value.forEach(setElementTitle);
});

function getCellClasses(key, row, cellIndex) {
  const isNestedRow = (row.row || props.nestedLevel) && cellIndex === 0;

  return [props.columns.find((column) => column.key === key)?.tdClass, isNestedRow && "flex"];
}

function getNestedShift() {
  return { marginLeft: `${props.nestedLevel * shift.value}rem` };
}

function getNestedCheckboxShift() {
  return { transform: `translateX(${props.nestedLevel * shift.value}rem)` };
}

function onClickToggleRowChild(rowId) {
  emit("toggleRowVisibility", rowId);
}

function onClick(row) {
  emit("click", row);
}

function setCellTitle(mutations) {
  mutations.forEach((mutation) => {
    const { target } = mutation;

    setElementTitle(target);
  });
}

function isElementOverflown(element) {
  return element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight;
}

function setElementTitle(element) {
  const isOverflown = isElementOverflown(element);

  if (isOverflown) {
    element.setAttribute("title", element.textContent);
  }

  if (!isOverflown && element.hasAttribute("title")) {
    element.removeAttribute("title");
  }
}
</script>
