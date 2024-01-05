<template>
  <div :class="ui.wrapper" :data-cy="dataCy">
    <div :class="ui.header">
      <!-- @slot Use it to add something to the header. -->
      <slot name="header">
        <UIcon name="emoji_food_beverage" color="gray" :size="iconSize" pill />
      </slot>
    </div>

    <!-- @slot Use it to add something inside. -->
    <slot>
      <div v-if="title" :class="titleVariants({ size })">
        {{ title }}
      </div>
      <div v-if="description" :class="descriptionVariants({ size })">
        {{ description }}
      </div>
    </slot>

    <div :class="ui.footer">
      <!-- @slot Use it to add something to the footer. -->
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import UIService from "vueless/service.ui";
import { useUI } from "vueless/composable.ui";
import { UEmpty } from "vueless/constant.component-names";

import VariantService from "./services/variant.service";
import defaultConfig from "./configs/default.config";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UEmpty" });

const props = defineProps({
  /**
   * Sets title.
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * Sets description.
   */
  description: {
    type: String,
    default: "",
  },

  /**
   * Sets component size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UEmpty).default.size,
  },

  /**
   * Sets component ui config object.
   */
  config: {
    type: Object,
    default: () => ({}),
  },

  /**
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const iconSize = computed(() => {
  const sizes = {
    sm: "xl",
    md: "2xl",
    lg: "3xl",
  };

  return sizes[props.size];
});

const { ui } = useUI(defaultConfig, props.config);

const { titleVariants, descriptionVariants } = VariantService.get(ui);
</script>
