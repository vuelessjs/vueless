<script setup lang="ts">
import { computed, useSlots, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";

import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";
import { getDefaults } from "../utils/ui.ts";

import defaultConfig from "./config.ts";
import { COMPONENT_NAME } from "./constants.ts";

import type { Props, Config, ULinkSlotProps } from "./types.ts";

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

const slots = useSlots();

const linkRef = useTemplateRef<HTMLLinkElement>("link");

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

  return props.href && !props.disabled ? `${types[props.type]}${props.href}` : undefined;
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

defineExpose({
  /**
   * A reference to the link element for direct DOM manipulation.
   * @property {HTMLLinkElement}
   */
  linkRef,
});

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
    ref="link"
    v-slot="slotProps: ULinkSlotProps"
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
    <!--
      @slot Use it replace the label.
      @binding {boolean} is-active
      @binding {boolean} is-exact-active
    -->
    <slot :is-active="slotProps.isActive" :is-exact-active="slotProps.isExactActive">
      {{ label }}
    </slot>
  </router-link>

  <a
    v-else
    ref="link"
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
