<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs" @click="onClickItem">
    <div v-bind="bodyAttrs">
      <div v-bind="titleAttrs">
        {{ title }}
        <UIcon
          :name="isOpened ? config.collapseIconName : config.expandIconName"
          :size="size"
          color="gray"
          internal
          v-bind="iconAttrs"
        />
      </div>

      <div :id="`description-${id}`" v-bind="descriptionAttrs" v-text="description" />
    </div>

    <UDivider :size="dividerSize" v-bind="dividerAttrs" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import UIcon from "../ui.image-icon";
import UDivider from "../ui.container-divider";
import UIService, { getRandomId } from "../service.ui";

import { UAccordion } from "./constants/index";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UAccordion", inheritAttrs: false });

const props = defineProps({
  /**
   * Accordion title.
   */
  title: {
    type: String,
    required: true,
  },

  /**
   * Accordion description.
   */
  description: {
    type: String,
    required: true,
  },

  /**
   * Unique block name.
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Accordion size.
   * @values sm, md, lg
   */
  size: {
    type: String,
    default: UIService.get(defaultConfig, UAccordion).default.size,
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
   * Data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const isOpened = ref(false);

const { config, wrapperAttrs, descriptionAttrs, bodyAttrs, titleAttrs, iconAttrs, dividerAttrs } =
  useAttrs(props, { isOpened });

const dividerSize = computed(() => {
  const sizes = {
    sm: "md",
    md: "lg",
    lg: "xl",
  };

  return sizes[props.size];
});

function onClickItem() {
  isOpened.value = !isOpened.value;

  emit("click", props.name);
}
</script>
