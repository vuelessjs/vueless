<template>
  <div v-bind="wrapperAttrs" ref="wrapperRef" tabindex="-1">
    <div v-if="hasSlotContent(slots['left'])" v-bind="leftSlotAttrs">
      <!-- @slot Use it to add something before text. -->
      <slot name="left" />
    </div>

    <router-link
      v-if="isPresentRoute"
      :to="route"
      :target="targetValue"
      :data-cy="dataCy"
      :active-class="activeClass"
      :exact-active-class="exactActiveClass"
      v-bind="linkAttrs"
      @blur="onBlur"
      @click="onClick"
      @focus="onFocus"
      @keydown="onKeydown"
      @mouseover="onMouseover"
    >
      <!-- @slot Use it replace the text. -->
      <slot>
        <span v-if="!hasSlotContent(slots['default'])" v-bind="textAttrs" v-text="label" />
      </slot>
    </router-link>

    <a
      v-else
      :href="href"
      :target="targetValue"
      :data-cy="dataCy"
      v-bind="linkAttrs"
      @blur="onBlur"
      @focus="onFocus"
      @keydown="onKeydown"
      @mouseover="onMouseover"
      @click.prevent="onClick"
    >
      <!-- @slot Use it replace the text. -->
      <slot>
        <span v-if="!hasSlotContent(slots['default'])" v-bind="textAttrs" v-text="label" />
      </slot>
    </a>

    <div v-if="hasSlotContent(slots['right'])" v-bind="rightSlotAttrs">
      <!-- @slot Use it to add something after text. -->
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots, ref } from "vue";
import UIService from "../service.ui";

import { useAttrs } from "./composables/attrs.composable";
import defaultConfig from "./configs/default.config";
import { ULink } from "./constants";

/* Should be a string for correct web-types gen */
defineOptions({ name: "ULink", inheritAttrs: false });

const emit = defineEmits(["click", "mouseover", "focus", "blur", "keydown"]);

const props = defineProps({
  /**
   * Button label.
   */
  label: {
    type: String,
    default: "",
  },

  /**
   * Link url.
   */
  url: {
    type: String,
    default: "",
  },

  /**
   * Vue route object.
   */
  route: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Link size.
   * @values xs, sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, ULink).default.size,
  },

  /**
   * Link color.
   * @values brand, grayscale, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, white
   */
  color: {
    type: String,
    default: UIService.get(defaultConfig, ULink).default.color,
  },

  /**
   * Link open type behaviour.
   * @values phone, email, link
   */
  type: {
    type: String,
    default: UIService.get(defaultConfig, ULink).default.type,
  },

  /**
   * Open link in new window.
   */
  targetBlank: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULink).default.targetBlank,
  },

  /**
   * Apply classes to the link when its route is active or when it matches any parent route.
   */
  activeClass: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULink).default.activeClass,
  },

  /**
   * Apply classes to the link when its route is active.
   */
  exactActiveClass: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULink).default.exactActiveClass,
  },

  /**
   * Show underline.
   */
  underlined: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULink).default.underlined,
  },

  /**
   * Set link underline style as dashed.
   */
  dashed: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULink).default.dashed,
  },

  /**
   * Disable the link.
   */
  disabled: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULink).default.disabled,
  },

  /**
   * Make the Button fill the width with its container.
   */
  block: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULink).default.block,
  },

  /**
   * Remove outline ring on focus.
   */
  noRing: {
    type: Boolean,
    default: UIService.get(defaultConfig, ULink).default.noRing,
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

const slots = useSlots();

const wrapperRef = ref(null);

defineExpose({ wrapperRef });

const { wrapperAttrs, linkAttrs, rightSlotAttrs, leftSlotAttrs, textAttrs, hasSlotContent } =
  useAttrs(props);

const targetValue = computed(() => {
  return props.targetBlank ? "_blank" : "_self";
});

const href = computed(() => {
  const types = {
    phone: "tel:",
    email: "mailto:",
    link: "",
  };

  return `${types[props.type]}${props.url}`;
});

const isPresentRoute = computed(() => {
  for (let key in props.route) return true;

  return false;
});

function onClick(event) {
  !props.url || props.disabled ? emit("click", event) : window.open(href.value, props.targetValue);
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
