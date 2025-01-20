<script setup lang="ts">
import { computed, useSlots } from "vue";
import { RouterLink } from "vue-router";

import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  ...getDefaults<Props, Config>(defaultConfig, COMPONENT_NAME),
  label: "",
  to: undefined,
});

const emit = defineEmits([
  /**
   * Triggers when link is clicked.
   */
  "click",

  /**
   * Triggers when cursor is on the link.
   */
  "mouseover",

  /**
   * Triggers when link is focused.
   */
  "focus",

  /**
   * Triggers when link loses focus.
   */
  "blur",

  /**
   * Triggers when link is clicked.
   */
  "keydown",
]);

defineSlots<{
  default: (props: { isActive: boolean; isExactActive: boolean }) => void;
}>();

const slots = useSlots();

const isPresentRoute = computed(() => {
  return typeof props.to === "string" || typeof props.to === "object";
});

const safeTo = computed(() => {
  return props.to || "/";
});

const prefixedHref = computed(() => {
  const types = {
    phone: "tel:",
    email: "mailto:",
    link: "",
  };

  return props.href ? `${types[props.type]}${props.href}` : undefined;
});

function onClick(event: MouseEvent) {
  emit("click", event);
}

function onMouseover(event: MouseEvent) {
  emit("mouseover", event);
}

function onFocus(event: FocusEvent) {
  emit("focus", event);
}

function onKeydown(event: KeyboardEvent) {
  emit("keydown", event);
}

function onBlur(event: FocusEvent) {
  emit("blur", event);
}

/**
 * Get element / nested component attributes for each config token ✨
 * Applies: `class`, `config`, redefined default `props` and dev `vl-...` attributes.
 */
const mutatedProps = computed(() => ({
  /* component state, not a props */
  defaultSlot: hasSlotContent(slots["default"]),
}));

const { getDataTest, linkAttrs } = useUI<Config>(defaultConfig, mutatedProps);
</script>

<template>
  <router-link
    v-if="isPresentRoute"
    v-slot="{ isActive, isExactActive }"
    :to="safeTo"
    :custom="custom"
    :replace="replace"
    :target="target"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :aria-current-value="ariaCurrentValue"
    :view-transition="viewTransition"
    v-bind="linkAttrs"
    :data-test="getDataTest()"
    tabindex="0"
    @blur="onBlur"
    @focus="onFocus"
    @click="onClick"
    @keydown="onKeydown"
    @mouseover="onMouseover"
  >
    <!-- @slot Use it replace the label. -->
    <slot :is-active="isActive" :is-exact-active="isExactActive">{{ label }}</slot>
  </router-link>

  <a
    v-else
    :rel="rel"
    :href="prefixedHref"
    :target="target"
    v-bind="linkAttrs"
    :data-test="getDataTest()"
    tabindex="0"
    @blur="onBlur"
    @focus="onFocus"
    @click="onClick"
    @keydown="onKeydown"
    @mouseover="onMouseover"
  >
    <!-- @slot Use it replace the label. -->
    <slot>{{ label }}</slot>
  </a>
</template>
