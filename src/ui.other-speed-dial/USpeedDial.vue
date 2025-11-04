<script setup lang="ts">
import { computed, ref, useId, useTemplateRef, watch } from "vue";

import { useUI } from "../composables/useUI";
import { getDefaults } from "../utils/ui";

import UIcon from "../ui.image-icon/UIcon.vue";
import vClickOutside from "../v.click-outside/vClickOutside";

import { COMPONENT_NAME } from "./constants";
import defaultConfig from "./config";

import type { Props, Config, USpeedDialItem } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  items: () => [],
});

const emit = defineEmits([
  /**
   * Triggers when the open/close state changes.
   * @property {boolean} value
   */
  "update:modelValue",

  /**
   * Triggers when the speed dial is opened.
   */
  "open",

  /**
   * Triggers when the speed dial is closed.
   */
  "close",

  /**
   * Triggers when an action item is selected.
   * @property {USpeedDialItem} item
   */
  "select",
]);

const elementId = props.id || useId();

const wrapperRef = useTemplateRef<HTMLDivElement>("wrapper");
const mainButtonRef = useTemplateRef<HTMLButtonElement>("mainButton");

const internalOpen = ref(false);
const hoveredItemIndex = ref<number | null>(null);

const isOpen = computed({
  get: () => props.modelValue !== undefined ? props.modelValue : internalOpen.value,
  set: (value) => {
    internalOpen.value = value;
    emit("update:modelValue", value);
  },
});

watch(isOpen, (newValue) => {
  if (newValue) {
    emit("open");
  } else {
    emit("close");
    hoveredItemIndex.value = null;
  }
});

function toggle() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
}

function open() {
  if (props.disabled) return;
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function handleClickOutside() {
  if (isOpen.value) {
    close();
  }
}

function onSelectItem(item: USpeedDialItem, index: number) {
  if (item.disabled) return;

  emit("select", item);

  if (item.command) {
    item.command();
  }

  close();
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return;

  if (event.key === "Escape") {
    event.preventDefault();
    close();
    mainButtonRef.value?.focus();
  }
}

function onMainButtonKeydown(event: KeyboardEvent) {
  if (props.disabled) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggle();
  }
}

function onItemKeydown(event: KeyboardEvent, item: USpeedDialItem, index: number) {
  if (item.disabled) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onSelectItem(item, index);
  }
}

function getItemStyle(index: number) {
  if (!isOpen.value) return {};

  const delay = index * 30;
  const duration = props.transitionDuration || 150;

  if (props.direction === "circle") {
    const totalItems = props.items.length;
    const angle = (180 / (totalItems + 1)) * (index + 1);
    const radius = 80;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = -Math.sin((angle * Math.PI) / 180) * radius;

    return {
      transitionDelay: `${delay}ms`,
      transitionDuration: `${duration}ms`,
      transform: isOpen.value ? `translate(${x}px, ${y}px)` : "translate(0, 0)",
    };
  }

  return {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };
}

function getButtonColor(item: USpeedDialItem) {
  return item.color || "default";
}

defineExpose({
  /**
   * A reference to the wrapper element for direct DOM manipulation.
   * @property {HTMLDivElement}
   */
  wrapperRef,

  /**
   * A reference to the main button element for direct DOM manipulation.
   * @property {HTMLButtonElement}
   */
  mainButtonRef,

  /**
   * Opens the speed dial.
   * @property {function}
   */
  open,

  /**
   * Closes the speed dial.
   * @property {function}
   */
  close,

  /**
   * Toggles the speed dial open/close state.
   * @property {function}
   */
  toggle,
});

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  opened: isOpen.value,
}));

const { config, getDataTest, wrapperAttrs, maskAttrs, actionsWrapperAttrs, actionButtonAttrs, actionIconAttrs, actionLabelAttrs, mainButtonAttrs, mainIconAttrs } =
  useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <div
    :id="elementId"
    ref="wrapper"
    v-click-outside="handleClickOutside"
    v-bind="wrapperAttrs"
    :data-test="getDataTest()"
    @keydown="onKeydown"
  >
    <Transition v-bind="config.maskTransition">
      <div
        v-if="mask && isOpen"
        v-bind="maskAttrs"
        :data-test="getDataTest('mask')"
        @click="close"
      />
    </Transition>

    <div
      v-bind="actionsWrapperAttrs"
      role="menu"
      :aria-expanded="isOpen"
      :data-test="getDataTest('actions')"
    >
      <TransitionGroup v-bind="config.itemTransition">
        <div
          v-for="(item, index) in items"
          v-show="isOpen"
          :key="index"
          class="relative"
          :style="getItemStyle(index)"
        >
          <button
            role="menuitem"
            :aria-label="item.label || item.icon"
            :disabled="item.disabled"
            :tabindex="isOpen ? 0 : -1"
            v-bind="actionButtonAttrs"
            :data-test="getDataTest(`action-${index}`)"
            @click="onSelectItem(item, index)"
            @keydown="onItemKeydown($event, item, index)"
            @mouseenter="hoveredItemIndex = index"
            @mouseleave="hoveredItemIndex = null"
          >
            <UIcon
              :name="item.icon"
              :color="getButtonColor(item)"
              v-bind="actionIconAttrs"
              :data-test="getDataTest(`action-icon-${index}`)"
            />
          </button>

          <div
            v-if="item.label"
            v-bind="actionLabelAttrs"
            :class="{ 'opacity-100': hoveredItemIndex === index }"
            :data-test="getDataTest(`action-label-${index}`)"
          >
            {{ item.label }}
          </div>
        </div>
      </TransitionGroup>
    </div>

    <button
      ref="mainButton"
      :aria-haspopup="true"
      :aria-expanded="isOpen"
      :aria-controls="`${elementId}-menu`"
      :disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      v-bind="mainButtonAttrs"
      :data-test="getDataTest('main-button')"
      @click="toggle"
      @keydown="onMainButtonKeydown"
      @mouseenter="trigger === 'hover' && open()"
      @mouseleave="trigger === 'hover' && close()"
    >
      <UIcon
        :name="icon || config.defaults.icon"
        color="inherit"
        v-bind="mainIconAttrs"
        :data-test="getDataTest('main-icon')"
      />
    </button>
  </div>
</template>

