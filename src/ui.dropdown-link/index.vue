<template>
  <div v-bind="wrapperAttrs">
    <div v-bind="triggerAttrs">
      <ULink
        :id="id"
        ref="linkRef"
        :label="label"
        :size="size"
        :color="color"
        :dashed="dashed"
        :underlined="underlined"
        :disabled="disabled"
        :no-ring="noRing"
        :data-cy="`${dataCy}-link`"
        v-bind="linkAttrs"
        @click.stop="onClickLink"
        @blur="onBlurLink"
      >
        <template #right>
          <UIcon
            v-if="!noIcon"
            :name="config.iconName"
            :size="iconSize"
            :color="color"
            :data-cy="`${dataCy}-caret`"
            v-bind="iconAttrs"
          />
        </template>
      </ULink>
    </div>

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
import ULink from "../ui.button-link";
import UDropdownList from "../ui.dropdown-list";

import UIService, { getRandomId } from "../service.ui";

import { UDropdownLink } from "./constants";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UDropdownLink", inheritAttrs: false });

const props = defineProps({
  /**
   * Selected value.
   */
  modelValue: {
    type: [String, Number],
    default: "",
  },

  /**
   * Link label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Link color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownLink).default.color,
  },

  /**
   * Link size.
   * @values xs, sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownLink).default.size,
  },

  /**
   * Add underline.
   */
  underlined: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownLink).default.underlined,
  },

  /**
   * Set dashed underline style.
   */
  dashed: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownLink).default.dashed,
  },

  /**
   * Disable the link.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownLink).default.disabled,
  },

  /**
   * Hide focus ring.
   */
  noRing: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownLink).default.noRing,
  },

  /**
   * Hide dropdown icon.
   */
  noIcon: {
    type: Boolean,
    default: UIService.get(defaultConfig, UDropdownLink).default.noIcon,
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
    default: UIService.get(defaultConfig, UDropdownLink).default.listYPosition,
  },

  /**
   * The position of dropdown list on the x-axis.
   * @values left, right
   */
  listXPosition: {
    type: String,
    default: UIService.get(defaultConfig, UDropdownLink).default.listXPosition,
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

provide("hideDropdownOptions", () => hideOptions());

const emit = defineEmits(["update:modelValue"]);

const isShownOptions = ref(false);

const linkRef = ref(null);

const {
  config,
  listWrapperAttrs,
  wrapperAttrs,
  linkAttrs,
  listAttrs,
  iconAttrs,
  triggerAttrs,
  hasSlotContent,
} = useAttrs(props, { isShownOptions });

const selectValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    isShownOptions.value = false;
    emit("update:modelValue", value);
  },
});

const iconSize = computed(() => {
  const sizes = {
    xs: "2xs",
    sm: "xs",
    md: "sm",
    lg: "md",
  };

  return sizes[props.size];
});

watch(() => props.modelValue, hideOptions);

onMounted(() => window.addEventListener("click", onClickOutside));
onUnmounted(() => window.removeEventListener("click", onClickOutside));

function onClickLink() {
  isShownOptions.value = !isShownOptions.value;
}

function hideOptions() {
  isShownOptions.value = false;
}

function onClickOutside(event) {
  if (!linkRef.value?.wrapperRef?.contains(event.target)) {
    hideOptions();
  }
}

function onBlurLink(event) {
  if (!event.target.isEqualNode(event.relatedTarget) && event.relatedTarget) {
    hideOptions();
  }
}
</script>
