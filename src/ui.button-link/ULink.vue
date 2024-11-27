<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useLink } from "vue-router";
import { getDefault } from "../utils/ui.ts";

import useAttrs from "./useAttrs.ts";
import defaultConfig from "./config.ts";
import { ULink } from "./constants.ts";

import type { ULinkProps } from "./types.ts";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<ULinkProps>(), {
  size: getDefault<ULinkProps>(defaultConfig, ULink).size,
  color: getDefault<ULinkProps>(defaultConfig, ULink).color,
  type: getDefault<ULinkProps>(defaultConfig, ULink).type,
  targetBlank: getDefault<ULinkProps>(defaultConfig, ULink).targetBlank,
  ariaCurrentValue: getDefault<ULinkProps>(defaultConfig, ULink).ariaCurrentValue,
  custom: getDefault<ULinkProps>(defaultConfig, ULink).custom,
  replace: getDefault<ULinkProps>(defaultConfig, ULink).replace,
  activeClass: getDefault<ULinkProps>(defaultConfig, ULink).activeClass,
  exactActiveClass: getDefault<ULinkProps>(defaultConfig, ULink).exactActiveClass,
  wrapperActiveClass: getDefault<ULinkProps>(defaultConfig, ULink).wrapperActiveClass,
  wrapperExactActiveClass: getDefault<ULinkProps>(defaultConfig, ULink).wrapperExactActiveClass,
  underlined: getDefault<ULinkProps>(defaultConfig, ULink).underlined,
  dashed: getDefault<ULinkProps>(defaultConfig, ULink).dashed,
  disabled: getDefault<ULinkProps>(defaultConfig, ULink).disabled,
  block: getDefault<ULinkProps>(defaultConfig, ULink).block,
  noRing: getDefault<ULinkProps>(defaultConfig, ULink).noRing,
  dataTest: "",
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

  return props.to;
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

const { wrapperAttrs, linkAttrs } = useAttrs(props, { isActive, isExactActive });

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
  <div v-bind="wrapperAttrs" ref="wrapperRef" tabindex="-1">
    <!-- @slot Use it to add something before the label. -->
    <slot name="left" />

    <router-link
      v-if="isPresentRoute"
      :to="route"
      :target="targetValue"
      v-bind="linkAttrs"
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
