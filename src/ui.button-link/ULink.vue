<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useLink } from "vue-router";
import { getDefaults } from "../utils/ui.ts";

import useAttrs from "./useAttrs.ts";
import defaultConfig from "./config.ts";
import { ULink } from "./constants.ts";

import type { ULinkProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ULinkProps>(), {
  ...getDefaults<ULinkProps>(defaultConfig, ULink),
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

const isPresentRoute = computed(() => {
  return typeof props.to === "string" || typeof props.to === "object";
});

const safeTo = computed(() => {
  if (!props.to) {
    return "/";
  }

  return typeof props.to === "function" ? props.to() : props.to;
});

const useLinkOptions = {
  activeClass: props.activeClass,
  ariaCurrentValue: props.ariaCurrentValue,
  exactActiveClass: props.exactActiveClass,
  custom: props.custom,
  replace: props.replace,
  to: safeTo.value,
};

const { route, isActive, isExactActive } = useLink(useLinkOptions);

const wrapperRef = ref(null);

const { wrapperAttrs, linkAttrs } = useAttrs(props);

const wrapperActiveClasses = computed(() => [
  isActive.value && props.wrapperActiveClass,
  isExactActive.value && props.wrapperExactActiveClass,
]);

const linkActiveClasses = computed(() => [
  isActive.value && props.activeClass,
  isExactActive.value && props.exactActiveClass,
]);

const targetValue = computed(() => {
  return props.targetBlank ? "_blank" : "_self";
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

defineExpose({
  /**
   * A reference to the link wrapper element for direct DOM manipulation.
   * @property {HTMLElement}
   */
  wrapperRef,
});
</script>

<template>
  <div v-bind="wrapperAttrs" ref="wrapperRef" :class="wrapperActiveClasses" tabindex="-1">
    <!-- @slot Use it to add something before the label. -->
    <slot name="left" />

    <router-link
      v-if="isPresentRoute"
      :to="route"
      :target="targetValue"
      v-bind="linkAttrs"
      :class="linkActiveClasses"
      :data-test="dataTest"
      tabindex="0"
      @blur="onBlur"
      @focus="onFocus"
      @click="onClick"
      @keydown="onKeydown"
      @mouseover="onMouseover"
    >
      <!-- @slot Use it replace the label. -->
      <slot>
        {{ label }}
      </slot>
    </router-link>

    <a
      v-else
      :href="prefixedHref"
      :target="targetValue"
      v-bind="linkAttrs"
      :class="linkActiveClasses"
      :data-test="dataTest"
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

    <!-- @slot Use it to add something after the label. -->
    <slot name="right" />
  </div>
</template>
