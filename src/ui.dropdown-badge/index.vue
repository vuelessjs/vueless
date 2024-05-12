<template>
  <div v-bind="wrapperAttrs">
    <UBadge
      :id="id"
      ref="badgeRef"
      :label="label"
      :size="size"
      :color="color"
      :weight="weight"
      :variant="variant"
      :data-cy="`${dataCy}-badge`"
      v-bind="badgeAttrs"
      @click.stop="onClickBadge"
      @blur="onBlurBadge"
    >
      <template #right>
        <UIcon
          v-if="!noIcon"
          internal
          :name="config.iconName"
          :size="iconSize"
          :color="color"
          :data-cy="`${dataCy}-caret`"
          v-bind="iconAttrs"
        />
      </template>
    </UBadge>

    <div v-if="isShownOptions && hasSlotContent($slots['default'])" v-bind="listWrapperAttrs">
      <!-- @slot Use it to add dropdown list. -->
      <slot />
    </div>

    <UDropdownList
      v-if="isShownOptions && !hasSlotContent($slots['default'])"
      v-model="selectValue"
      :size="size"
      :options="options"
      :value-key="valueKey"
      :label-key="labelKey"
      :data-cy="`${dataCy}-item`"
      v-bind="listAttrs"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, provide, ref, watch } from "vue";

import UIcon from "../ui.image-icon";
import UBadge from "../ui.text-badge";
import UDropdownList from "../ui.dropdown-list";

import UIService, { getRandomId } from "../service.ui";

import defaultConfig from "./configs/default.config";
import { UDropdownBadge } from "./constants";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDropdownBadge", inheritAttrs: false });

const props = defineProps({
  /**
   * Selected value.
   */
  modelValue: {
    type: [String, Number],
    default: "",
  },

  /**
   * Badge label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Badge variant.
   * @values primary, secondary, thirdary
   */
  variant: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownBadge).default.variant,
  },

  /**
   * Badge color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownBadge).default.color,
  },

  /**
   * Badge size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownBadge).default.size,
  },

  /**
   * Badge font weight.
   * @values regular, medium, bold
   */
  weight: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownBadge).default.weight,
  },

  /**
   * Hide dropdown icon.
   */
  noIcon: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownBadge).default.noIcon,
  },

  /**
   * Options list.
   */
  options: {
    type: Array,
    default: () => [],
  },

  /**
   * Label key in the item object of options.
   */
  labelKey: {
    type: String,
    default: "label",
  },

  /**
   * Value key in the item object of options.
   */
  valueKey: {
    type: String,
    default: "id",
  },

  /**
   * The position of dropdown list on the y-axis.
   * @values top, bottom
   */
  listYPosition: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownBadge).default.listYPosition,
  },

  /**
   * The position of dropdown list on the x-axis.
   * @values left, right
   */
  listXPosition: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownBadge).default.listXPosition,
  },

  /**
   * Generates unique element id.
   * @ignore
   */
  id: {
    type: String,
    default: () => getRandomId(),
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

provide("hideDropdownOptions", () => hideOptions);

const emit = defineEmits(["update:modelValue"]);

const isShownOptions = ref(false);

const badgeRef = ref(null);

const { config, listWrapperAttrs, wrapperAttrs, badgeAttrs, listAttrs, iconAttrs, hasSlotContent } =
  useAttrs(props, { isShownOptions });

const selectValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    isShownOptions.value = false;
    emit("update:modelValue", value);
  },
});

const iconSize = computed(() => {
  const sizes = {
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

watch(() => props.modelValue, hideOptions);

onMounted(() => window.addEventListener("click", onClickOutside));
onUnmounted(() => window.removeEventListener("click", onClickOutside));

function onClickBadge() {
  isShownOptions.value = !isShownOptions.value;
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickOutside(event) {
  if (!badgeRef.value?.wrapperRef?.contains(event.target)) {
    hideOptions();
  }
}

function onBlurBadge(event) {
  setTimeout(() => {
    if (!event.target.isEqualNode(event.relatedTarget) && event.relatedTarget) {
      hideOptions();
    }
  }, 100);
}
</script>
