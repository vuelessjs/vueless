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

<script setup>
import { computed, ref } from "vue";
import { RouterLink, useLink } from "vue-router";
import { getDefault } from "../service.ui";

import useAttrs from "./composables/attrs.composable";
import defaultConfig from "./configs/default.config";
import { ULink } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "ULink", inheritAttrs: false });

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

const props = defineProps({
  /**
   * Button label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Link href url.
   */
  href: {
    type: String,
    default: "",
  },

  /**
   * Vue-router route object.
   */
  to: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Link size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: getDefault(defaultConfig, ULink).size,
  },

  /**
   * Link color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: getDefault(defaultConfig, ULink).color,
  },

  /**
   * Link open type behaviour.
   * @values phone, email, link
   */
  type: {
    type: String,
    default: getDefault(defaultConfig, ULink).type,
  },

  /**
   * Open link in the new tab.
   */
  targetBlank: {
    type: Boolean,
    default: getDefault(defaultConfig, ULink).targetBlank,
  },

  /**
   * Pass value to the attribute aria-current when the link is exact active.
   */
  ariaCurrentValue: {
    type: String,
    default: getDefault(defaultConfig, ULink).ariaCurrentValue,
  },

  /**
   * Whether RouterLink should not wrap its content in an a tag.
   */
  custom: {
    type: Boolean,
    default: getDefault(defaultConfig, ULink).custom,
  },

  /**
   * Whether RouterLink should not wrap its content in an a tag.
   */
  replace: {
    type: Boolean,
    default: getDefault(defaultConfig, ULink).replace,
  },

  /**
   * Apply classes to the link when its route is active or when it matches any parent route.
   */
  activeClass: {
    type: String,
    default: getDefault(defaultConfig, ULink).activeClass,
  },

  /**
   * Apply classes to the link when its route is active.
   */
  exactActiveClass: {
    type: String,
    default: getDefault(defaultConfig, ULink).exactActiveClass,
  },

  /**
   * Apply classes to the wrapper div when link route is active or when it matches any parent route.
   */
  wrapperActiveClass: {
    type: String,
    default: getDefault(defaultConfig, ULink).wrapperActiveClass,
  },

  /**
   * Apply classes to the wrapper div when link route is active.
   */
  wrapperExactActiveClass: {
    type: String,
    default: getDefault(defaultConfig, ULink).wrapperExactActiveClass,
  },

  /**
   * Show underline.
   */
  underlined: {
    type: Boolean,
    default: getDefault(defaultConfig, ULink).underlined,
  },

  /**
   * Set link underline style as dashed.
   */
  dashed: {
    type: Boolean,
    default: getDefault(defaultConfig, ULink).dashed,
  },

  /**
   * Disable the link.
   */
  disabled: {
    type: Boolean,
    default: getDefault(defaultConfig, ULink).disabled,
  },

  /**
   * Make the Button fill the width with its container.
   */
  block: {
    type: Boolean,
    default: getDefault(defaultConfig, ULink).block,
  },

  /**
   * Remove outline ring on focus.
   */
  noRing: {
    type: Boolean,
    default: getDefault(defaultConfig, ULink).noRing,
  },

  /**
   * Component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Data-test attribute for automated testing.
   */
  dataTest: {
    type: String,
    default: "",
  },
});

const isPresentRoute = computed(() => {
  for (let key in props.to) return true;

  return false;
});

const { route, isActive, isExactActive } = useLink({
  activeClass: props.activeClass,
  ariaCurrentValue: props.ariaCurrentValue,
  exactActiveClass: props.exactActiveClass,
  custom: props.custom,
  replace: props.replace,
  to: isPresentRoute.value ? props.to : "/",
});

const wrapperRef = ref(null);

defineExpose({ wrapperRef });

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

  return props.href ? `${types[props.type]}${props.href}` : null;
});

function onClick(event) {
  emit("click", event);
}

function onMouseover(event) {
  emit("mouseover", event);
}

function onFocus(event) {
  emit("focus", event);
}

function onKeydown(event) {
  emit("keydown", event);
}

function onBlur(event) {
  emit("blur", event);
}
</script>
