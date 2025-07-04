<script setup lang="ts">
import { ref, computed, nextTick, watch, useSlots, onMounted, useId, useTemplateRef } from "vue";

import UIcon from "../ui.image-icon/UIcon.vue";
import ULabel from "../ui.form-label/ULabel.vue";
import UListbox from "../ui.form-listbox/UListbox.vue";
import UBadge from "../ui.text-badge/UBadge.vue";
import ULink from "../ui.button-link/ULink.vue";

import { vClickOutside } from "../directives";

import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";
import { isMac } from "../utils/platform.ts";
import { useMutationObserver } from "../composables/useMutationObserver.ts";
import { getCurrentOption } from "./utilSelect.ts";
import { useComponentLocaleMessages } from "../composables/useComponentLocaleMassages.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME, DIRECTION, KEYS, MULTIPLE_VARIANTS } from "./constants.ts";

import type { Option, Config as UListboxConfig } from "../ui.form-listbox/types.ts";
import type { Props, Config } from "./types.ts";
import type { KeyAttrsWithConfig } from "../types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  options: () => [],
  modelValue: "",
  label: "",
  placeholder: "",
});

const emit = defineEmits([
  /**
   * Triggers when a dropdown list is opened.
   * @property {string} elementId
   */
  "open",

  /**
   * Triggers when a dropdown list is closed.
   * @property {string} elementId
   */
  "close",

  /**
   * Triggers when the search value is changed.
   * @property {string} query
   */
  "searchChange",

  /**
   * Triggers when the option is removed.
   * @property {string} option
   */
  "remove",

  /**
   * Triggers when an option is selected.
   * @property {string} value
   * @property {number} value
   * @property {Option} value
   */
  "update:modelValue",

  /**
   * Triggers on click on add new option button in the dropdown.
   */
  "add",

  /**
   * Triggers when the user commits the change to options or selected value explicitly.
   * @property {string} value
   * @property {number} value
   * @property {Option} value
   * @property {Option[]} options
   */
  "change",
]);

const slots = useSlots();

const isOpen = ref(false);
const preferredOpenDirection = ref(DIRECTION.bottom);

const listboxRef = useTemplateRef<InstanceType<typeof UListbox>>("listbox");
const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const labelComponentRef = useTemplateRef<InstanceType<typeof ULabel>>("labelComponent");
const leftSlotWrapperRef = useTemplateRef<HTMLDivElement>("leftSlotWrapper");
const innerWrapperRef = useTemplateRef<HTMLDivElement>("innerWrapper");

const elementId = props.id || useId();

const { localeMessages } = useComponentLocaleMessages<typeof defaultConfig.i18n>(
  COMPONENT_NAME,
  defaultConfig.i18n,
  props?.config?.i18n,
);

const isTop = computed(() => {
  if (props.openDirection === DIRECTION.top) return true;
  if (props.openDirection === DIRECTION.bottom) return false;

  return preferredOpenDirection.value === DIRECTION.top;
});

const dropdownValue = computed({
  get: () => {
    if (props.multiple && !Array.isArray(props.modelValue)) {
      return props.modelValue ? [props.modelValue] : [];
    }

    return props.modelValue;
  },
  set: (value) => {
    emit("update:modelValue", value);
    emit("change", { value, options: props.options });

    if (!props.multiple) deactivate();
  },
});

const isMultipleInlineVariant = computed(
  () => props.multiple && props.multipleVariant === MULTIPLE_VARIANTS.inline,
);

const isMultipleListVariant = computed(
  () => props.multiple && props.multipleVariant === MULTIPLE_VARIANTS.list,
);

const isMultipleBadgeVariant = computed(
  () => props.multiple && props.multipleVariant === MULTIPLE_VARIANTS.badge,
);

const localValue = computed<Option | Option[]>(() => {
  if (!props.multiple) {
    const [singleValue] = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];

    return getCurrentOption(props.options, singleValue, props.valueKey, props.groupValueKey);
  }

  return props.modelValue && Array.isArray(props.modelValue)
    ? (props.modelValue
        .map((value) => getCurrentOption(props.options, value, props.valueKey, props.groupValueKey))
        .filter(Boolean) as Option[])
    : [];
});

const selectedOption = computed(() => {
  return !props.multiple && !Array.isArray(localValue.value) ? localValue.value : {};
});

const selectedOptions = computed(() => {
  const options = props.multiple && Array.isArray(localValue.value) ? localValue.value : [];

  return {
    full: options,
    visible: options.slice(0, props.labelDisplayCount),
    hidden: options.slice(props.labelDisplayCount),
  };
});

const selectedOptionsLabel = computed(() => {
  return {
    full: selectedOptions.value.full.map((item) => item[props.labelKey]).join(", "),
    visible: selectedOptions.value.visible.map((item) => item[props.labelKey]).join(", "),
    hidden: selectedOptions.value.hidden.map((item) => item[props.labelKey]).join(", "),
  };
});

const hiddenSelectedOptionsCount = computed(() => {
  return selectedOptions.value.hidden.length;
});

const isLocalValue = computed(() => {
  const value = localValue.value;

  if (Array.isArray(value)) {
    return !!value.length;
  }

  if (typeof value === "object") {
    return !!Object.keys(value).length;
  }

  return !!String(value);
});

const toggleIconName = computed(() => {
  if (typeof props.toggleIcon === "string") {
    return props.toggleIcon;
  }

  return props.toggleIcon ? config.value.defaults.toggleIcon : "";
});

const clickOutsideOptions = computed(() => ({
  ignore: [labelComponentRef.value?.wrapperElement, labelComponentRef.value?.labelElement],
}));

watch(localValue, setLabelPosition, { deep: true });

onMounted(() => {
  setLabelPosition();

  if (props.addOption) {
    document.addEventListener("keydown", onKeydownAddOption);
  }
});

function onSearchChange(query: string) {
  emit("searchChange", query);
}

function onListboxInteraction(event: MouseEvent) {
  const target = event.target as HTMLElement;

  if (target.closest("input")) {
    return;
  }

  event.preventDefault();
}

function onKeydownAddOption(event: KeyboardEvent) {
  if (!isOpen.value) return;

  const isEnter = event.key === KEYS.enter;
  const isCtrl = event.ctrlKey;
  const isMeta = event.metaKey;

  if (isMeta && isEnter && isMac) {
    emit("add");
    emit("change", { value: dropdownValue.value, options: props.options });
  }

  if (isEnter && isCtrl && !isMac) {
    emit("add");
    emit("change", { value: dropdownValue.value, options: props.options });
  }
}

function onAddOption() {
  emit("add");
}

function toggle() {
  isOpen.value ? deactivate() : activate();
}

function deactivate() {
  if (!isOpen.value || props.disabled) {
    return;
  }

  if (props.searchable) wrapperRef.value?.blur();

  isOpen.value = false;

  nextTick(() => emit("close", localValue.value, elementId));
}

function activate() {
  if (isOpen.value || props.disabled) {
    return;
  }

  adjustPosition();

  isOpen.value = true;

  wrapperRef.value?.focus();

  nextTick(() => {
    listboxRef.value?.listboxInputRef?.input.focus();
  });

  emit("open", elementId);
}

function adjustPosition() {
  if (typeof window === "undefined" || !listboxRef.value || !wrapperRef.value) return;

  const dropdownHeight = listboxRef.value.wrapperRef?.getBoundingClientRect().height || 0;
  const spaceAbove = wrapperRef.value.getBoundingClientRect().top;
  const spaceBelow = window.innerHeight - wrapperRef.value.getBoundingClientRect().bottom;
  const hasEnoughSpaceBelow = spaceBelow > dropdownHeight;

  if (hasEnoughSpaceBelow || spaceBelow > spaceAbove || props.openDirection === DIRECTION.bottom) {
    preferredOpenDirection.value = DIRECTION.bottom;
  } else {
    preferredOpenDirection.value = DIRECTION.top;
  }
}

function onWrapperBlur(event: FocusEvent) {
  const related = event.relatedTarget as HTMLElement | null;

  const isInsideWrapper = related && wrapperRef.value?.contains(related);
  const isInsideListbox = related && listboxRef.value?.$el?.contains(related);

  const shouldIgnoreBlur = isInsideWrapper || isInsideListbox;

  if (shouldIgnoreBlur) {
    return;
  }

  deactivate();
}

function onMouseDownClearItem(event: MouseEvent, option: Option) {
  if (props.disabled) return;

  const value = Array.isArray(props.modelValue)
    ? [...props.modelValue].filter((item) => {
        if (typeof item === "object") {
          return item[props.valueKey] !== option[props.valueKey];
        }

        return item !== option[props.valueKey];
      })
    : [];

  emit("update:modelValue", value);
  emit("change", { value, options: props.options });
  emit("remove", option);
}

function onMouseDownClear() {
  if (props.disabled) return;

  if (!props.clearable && !props.multiple) {
    deactivate();

    return;
  }

  const value = props.multiple ? [] : "";

  emit("update:modelValue", value);
  emit("change", { value, options: props.options });
  emit("remove", props.options);
}

useMutationObserver(leftSlotWrapperRef, (mutations) => mutations.forEach(setLabelPosition), {
  childList: true,
  characterData: true,
  subtree: true,
});

function setLabelPosition() {
  if (props.labelAlign === "top" || (!hasSlotContent(slots["left"]) && !props.leftIcon)) {
    return;
  }

  if (!leftSlotWrapperRef.value || !innerWrapperRef.value || !labelComponentRef.value) {
    return;
  }

  const leftSlotWidth = leftSlotWrapperRef.value.getBoundingClientRect().width;

  const innerWrapperPaddingLeft = parseInt(
    window.getComputedStyle(innerWrapperRef.value).paddingLeft,
  );

  const nestedLabel = labelComponentRef.value.labelElement;

  if (props.multiple && isLocalValue.value) {
    if (nestedLabel) {
      nestedLabel.style.left = `${leftSlotWidth - innerWrapperPaddingLeft}px`;
    }

    leftSlotWrapperRef.value.classList.remove("group-[*]/placement-inside:-mt-4");
  } else {
    if (nestedLabel) {
      nestedLabel.style.left = `${leftSlotWidth + innerWrapperPaddingLeft}px`;
    }
  }
}

defineExpose({
  /**
   * A reference to the UListbox instance for direct DOM manipulation.
   * @property {InstanceType<typeof UListbox>}
   */
  listboxRef,

  /**
   * A reference to the wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,

  /**
   * A reference to the ULabel instance for direct DOM manipulation.
   * @property {InstanceType<typeof ULabel>}
   */
  labelComponentRef,

  /**
   * A reference to the left slot wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  leftSlotWrapperRef,

  /**
   * A reference to the inner wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  innerWrapperRef,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  error: Boolean(props.error) && !props.disabled,
  label: Boolean(props.label),
  /* component state, not a props */
  selected: Boolean(isLocalValue.value),
  opened: isOpen.value,
  openedTop: isTop.value,
  placeholder: Boolean(props.placeholder),
}));

const {
  config,
  getDataTest,
  selectLabelAttrs,
  selectedLabelTextAttrs,
  counterAttrs,
  wrapperAttrs,
  innerWrapperAttrs,
  leftSlotAttrs,
  rightSlotAttrs,
  leftIconAttrs,
  rightIconAttrs,
  beforeToggleAttrs,
  afterToggleAttrs,
  toggleWrapperAttrs,
  clearAttrs,
  listClearAllAttrs,
  listFooterAttrs,
  listFooterCounterAttrs,
  placeholderAttrs,
  listAddMoreAttrs,
  selectedLabelsAttrs,
  selectedLabelAttrs,
  listboxAttrs,
  toggleIconAttrs,
  clearIconAttrs,
  listClearIconAttrs,
  badgeLabelAttrs,
  badgeClearIconAttrs,
} = useUI(defaultConfig, mutatedProps);
</script>

<template>
  <ULabel
    ref="labelComponent"
    :for="elementId"
    :size="size"
    :label="label"
    :error="error"
    :description="description"
    :align="labelAlign"
    :disabled="disabled"
    centred
    interactive
    v-bind="selectLabelAttrs"
    :data-test="getDataTest()"
    :tabindex="-1"
    @click="toggle"
  >
    <template #label>
      <!--
        @slot Use this to add custom content instead of the label.
        @binding {string} label
      -->
      <slot name="label" :label="label" />
    </template>

    <div
      ref="wrapper"
      v-click-outside="[deactivate, clickOutsideOptions]"
      :tabindex="searchable || disabled ? -1 : 0"
      role="combobox"
      :aria-owns="'listbox-' + elementId"
      v-bind="wrapperAttrs"
      @focus="activate"
      @blur="onWrapperBlur"
      @keydown.self.down.prevent="listboxRef?.pointerForward"
      @keydown.self.up.prevent="listboxRef?.pointerBackward"
      @keydown.enter.tab.stop.self="listboxRef?.addPointerElement()"
      @keyup.esc="deactivate"
    >
      <div
        v-if="hasSlotContent($slots['right'], { iconName: rightIcon }) || rightIcon"
        v-bind="rightSlotAttrs"
      >
        <!--
            @slot Use it to add something to the right of input.
            @binding {string} icon-name
          -->
        <slot name="right" :icon-name="rightIcon">
          <UIcon v-if="rightIcon" :name="rightIcon" v-bind="rightIconAttrs" />
        </slot>
      </div>

      <div
        v-if="hasSlotContent($slots['after-toggle']) && (!multiple || !isLocalValue)"
        v-bind="afterToggleAttrs"
        :tabindex="-1"
      >
        <!-- @slot Use it to add something after toggle. -->
        <slot name="after-toggle" />
      </div>

      <div
        v-if="!isMultipleListVariant || !isLocalValue"
        v-bind="toggleWrapperAttrs"
        :tabindex="-1"
        :data-test="getDataTest('toggle')"
        @mousedown.prevent.stop="toggle"
      >
        <!--
          @slot Use it to add something instead of the toggle icon.
          @binding {string} icon-name
          @binding {boolean} opened
        -->
        <slot name="toggle" :icon-name="toggleIconName" :opened="isOpen">
          <UIcon
            v-if="toggleIconName"
            interactive
            color="neutral"
            :disabled="disabled"
            :name="toggleIconName"
            v-bind="toggleIconAttrs"
            :tabindex="-1"
          />
        </slot>
      </div>

      <div
        v-if="!isMultipleListVariant && isLocalValue && clearable"
        v-bind="clearAttrs"
        :data-test="getDataTest('clear')"
        @mousedown="onMouseDownClear"
      >
        <!--
          @slot Use it to add something instead of the clear icon.
          @binding {string} icon-name
        -->
        <slot name="clear" :icon-name="config.defaults.clearIcon">
          <UIcon
            interactive
            color="neutral"
            :disabled="disabled"
            :name="config.defaults.clearIcon"
            v-bind="clearIconAttrs"
          />
        </slot>
      </div>

      <div
        v-if="hasSlotContent($slots['before-toggle']) && (!multiple || !isLocalValue)"
        v-bind="beforeToggleAttrs"
      >
        <!-- @slot Use it to add something before toggle. -->
        <slot name="before-toggle" />
      </div>

      <div ref="innerWrapper" v-bind="innerWrapperAttrs">
        <div v-if="!isLocalValue" v-bind="placeholderAttrs">
          <!-- Used invisible symbol to keep same height of the div. -->
          {{ placeholder || "‎" }}
        </div>

        <template v-else>
          <!--
            @slot Use it to customize selected options.
            @binding {array} options
            @binding {object} options
          -->
          <slot name="selected-options" :options="multiple ? selectedOptions.full : selectedOption">
            <span v-if="!multiple" v-bind="selectedLabelsAttrs" @mousedown.prevent="toggle">
              <!--
                @slot Use it to customize selected option.
                @binding {string} label
                @binding {modelValue} value
                @binding {object} option
              -->
              <slot
                name="selected-option"
                :label="selectedOption[labelKey]"
                :value="selectedOption[valueKey]"
                :option="localValue"
              >
                <div
                  :title="(selectedOption[labelKey] || '') as string"
                  v-bind="selectedLabelAttrs"
                  v-text="selectedOption[labelKey]"
                />
              </slot>
            </span>

            <div v-else v-bind="selectedLabelsAttrs">
              <template v-if="isMultipleInlineVariant">
                <div :title="selectedOptionsLabel.full" v-bind="selectedLabelAttrs">
                  <template v-for="(option, index) in selectedOptions.visible" :key="index">
                    <!--
                      @slot Use it to customize selected option.
                      @binding {string} label
                      @binding {modelValue} value
                      @binding {object} option
                    -->
                    <slot
                      name="selected-option"
                      :label="option[labelKey]"
                      :value="option[valueKey]"
                      :option="option"
                    >
                      {{
                        option[labelKey] +
                        (index === selectedOptions.visible.length - 1 ? "" : ", ")
                      }}
                    </slot>
                  </template>
                </div>

                <!--
                  @slot Use it to customize selected options counter.
                  @binding {number} count
                -->
                <slot name="selected-counter" :count="hiddenSelectedOptionsCount">
                  <span
                    v-if="hiddenSelectedOptionsCount"
                    v-bind="counterAttrs"
                    v-text="`&nbsp;+${hiddenSelectedOptionsCount}`"
                  />
                </slot>
              </template>

              <template v-if="isMultipleBadgeVariant">
                <div
                  v-for="(option, index) in selectedOptions.visible"
                  :key="index"
                  v-bind="selectedLabelAttrs"
                >
                  <!--
                    @slot Use it to customize selected option.
                    @binding {string} label
                    @binding {modelValue} value
                    @binding {object} option
                  -->
                  <slot
                    name="selected-option"
                    :label="option[labelKey]"
                    :value="option[valueKey]"
                    :option="option"
                  >
                    <UBadge
                      :title="option[labelKey]"
                      :size="size"
                      variant="subtle"
                      v-bind="badgeLabelAttrs"
                      @click="toggle"
                    >
                      <div v-bind="selectedLabelTextAttrs">
                        {{ option[labelKey] }}
                      </div>

                      <template #right>
                        <UIcon
                          interactive
                          color="inherit"
                          :disabled="disabled"
                          :name="config.defaults.badgeClearIcon"
                          v-bind="badgeClearIconAttrs"
                          @click="onMouseDownClearItem($event, option)"
                        />
                      </template>
                    </UBadge>
                  </slot>
                </div>

                <!--
                  @slot Use it to customize selected options counter.
                  @binding {number} count
                -->
                <slot name="selected-counter" :count="hiddenSelectedOptionsCount">
                  <UBadge
                    v-if="hiddenSelectedOptionsCount"
                    :label="`+${hiddenSelectedOptionsCount}`"
                    :title="selectedOptionsLabel.hidden"
                    :size="size"
                    variant="subtle"
                    v-bind="badgeLabelAttrs"
                  />
                </slot>
              </template>

              <template v-if="isMultipleListVariant">
                <div
                  v-for="(option, index) in selectedOptions.visible"
                  :key="index"
                  :title="option[labelKey] as string"
                  v-bind="selectedLabelAttrs"
                >
                  <!--
                    @slot Use it to customize selected option.
                    @binding {string} label
                    @binding {modelValue} value
                    @binding {object} option
                  -->
                  <slot
                    name="selected-option"
                    :label="option[labelKey]"
                    :value="option[valueKey]"
                    :option="option"
                  >
                    <div v-bind="selectedLabelTextAttrs">
                      {{ option[labelKey] }}
                    </div>

                    <UIcon
                      v-if="!disabled"
                      interactive
                      color="neutral"
                      :name="config.defaults.listClearIcon"
                      :data-test="getDataTest('clear-item')"
                      v-bind="listClearIconAttrs"
                      @mousedown.prevent.capture
                      @click.prevent.capture
                      @mousedown="onMouseDownClearItem($event, option)"
                    />
                  </slot>
                </div>

                <div v-bind="listFooterAttrs">
                  <div v-bind="listFooterCounterAttrs">
                    <!--
                      @slot Use it to customize selected options counter.
                      @binding {number} count
                    -->
                    <slot name="selected-counter" :count="hiddenSelectedOptionsCount">
                      <span
                        v-if="hiddenSelectedOptionsCount"
                        :title="selectedOptionsLabel.hidden"
                        v-bind="counterAttrs"
                        v-text="`+${hiddenSelectedOptionsCount}`"
                      />
                    </slot>
                    <div v-bind="listAddMoreAttrs" v-text="localeMessages.addMore" />
                  </div>

                  <ULink
                    v-if="clearable && !disabled"
                    :label="localeMessages.clear"
                    :size="size"
                    color="neutral"
                    :underlined="false"
                    v-bind="listClearAllAttrs"
                    :data-test="getDataTest('clear-all')"
                    @mousedown.prevent.capture="onMouseDownClear"
                    @click.prevent.capture
                  />
                </div>
              </template>
            </div>
          </slot>
        </template>
      </div>

      <UListbox
        v-if="isOpen"
        ref="listbox"
        v-model="dropdownValue as string | number"
        :searchable="searchable"
        :multiple="multiple"
        :options="options"
        :disabled="disabled"
        :size="size"
        :debounce="debounce"
        :visible-options="visibleOptions"
        :value-key="valueKey"
        :label-key="labelKey"
        :add-option="addOption"
        tabindex="-1"
        v-bind="listboxAttrs as KeyAttrsWithConfig<UListboxConfig>"
        :data-test="getDataTest()"
        @add="onAddOption"
        @focus="activate"
        @update:model-value="onSearchChange"
        @mousedown.capture="onListboxInteraction"
        @click.capture="onListboxInteraction"
      >
        <template #before-option="{ option, index }">
          <!--
            @slot Use it to add something before option.
            @binding {object} option
            @binding {number} index
          -->
          <slot name="before-option" :option="option" :index="index" />
        </template>

        <template #option="{ option, index }">
          <!--
            @slot Use it to customize the option.
            @binding {object} option
            @binding {number} index
          -->
          <slot name="option" :option="option" :index="index" />
        </template>

        <template #after-option="{ option, index }">
          <!--
            @slot Use it to add something after option.
            @binding {object} option
            @binding {number} index
          -->
          <slot name="after-option" :option="option" :index="index" />
        </template>
      </UListbox>

      <div
        v-if="hasSlotContent($slots['left']) || leftIcon"
        ref="leftSlotWrapper"
        v-bind="leftSlotAttrs"
      >
        <!--
            @slot Use it to add something to the left of input.
            @binding {string} icon-name
          -->
        <slot name="left" :icon-name="leftIcon">
          <UIcon v-if="leftIcon" :name="leftIcon" v-bind="leftIconAttrs" />
        </slot>
      </div>
    </div>
  </ULabel>
</template>
