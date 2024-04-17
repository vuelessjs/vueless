<template>
  <div :data-cy="dataCy" v-bind="wrapperAttrs" @click="onClickItem">
    <div v-bind="infoAttrs">
      <div v-bind="titleAttrs">
        <div v-text="title" />

        <UIcon :name="isOpened ? 'remove' : 'add'" :size="size" color="gray" v-bind="iconAttrs" />
      </div>

      <div :id="`description-${id}`" v-bind="descriptionAttrs" v-text="description" />
    </div>

    <div v-bind="separatorAttrs" />
  </div>
</template>

<script setup>
import { ref } from "vue";

import UIcon from "../ui.image-icon";
import UIService, { getRandomId } from "../service.ui";

import { UAccordion } from "./constants/index";
import defaultConfig from "./configs/default.config";
import { useAttrs } from "./composables/attrs.composable";

/* Should be a string for correct web-types gen */
defineOptions({ name: "UAccordion", inheritAttrs: false });

const props = defineProps({
  /**
   * Set component title.
   */
  title: {
    type: String,
    required: true,
  },

  /**
   * Set component description.
   */
  description: {
    type: String,
    required: true,
  },

  /**
   * Set unique block name.
   * @ignore
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * The size of component.
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
   * Sets data-cy attribute for automated testing.
   */
  dataCy: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["itemClicked"]);

const isOpened = ref(false);

const { wrapperAttrs, descriptionAttrs, infoAttrs, titleAttrs, iconAttrs, separatorAttrs } =
  useAttrs(props, { isOpened });

function onClickItem() {
  isOpened.value = !isOpened.value;

  emit("itemClicked", props.name);
}
</script>
