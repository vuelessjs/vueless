import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UIconArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size" | "variant";
}

/*
 * This needs for icon auto-caching, please keep it,
 * an object key which contains the `icon` word is required.
 */
const icons = {
  defaultIcon: "favorite",
};

export default {
  id: "6010",
  title: "Images & Icons / Icon",
  component: UIcon,
  args: {
    name: icons.defaultIcon,
  },
  argTypes: {
    ...getArgTypes(UIcon.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UIcon.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UIconArgs> = (args: UIconArgs) => ({
  components: { UIcon },
  setup: () => ({ args, slots: getSlotNames(UIcon.__name) }),
  template: `
    <UIcon v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UIcon>
  `,
});

const EnumTemplate: StoryFn<UIconArgs> = (args: UIconArgs, { argTypes }) => ({
  components: { UIcon, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UIcon
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Src = DefaultTemplate.bind({});
Src.args = { name: "emoji_food_beverage" };
Src.parameters = {
  docs: {
    source: {
      code: `
<script setup>
import Beverage from "./src/assets/icons/beverage.svg?component";
</script>

<template>
  <UIcon :src="Beverage" />
</template>
      `,
    },
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "To use a custom icon, import it with the `?component` suffix and pass the resulting component to the `src` prop.",
    },
  },
};

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant", color: "success" };

export const Interactive = DefaultTemplate.bind({});
Interactive.args = { interactive: true };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };
