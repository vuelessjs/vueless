import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UIconArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size" | "variant";
}

export default {
  id: "6010",
  title: "Images & Icons / Icon",
  component: UIcon,
  args: {
    icon: "favorite", // added for icon auto-caching reason, please keep it.
    name: "favorite",
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
  directives: { tooltip },
  setup: () => ({ args, slots: getSlotNames(UIcon.__name) }),
  template: `
    <UIcon v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UIcon>
  `,
});

const EnumTemplate: StoryFn<UIconArgs> = (args: UIconArgs, { argTypes }) => ({
  components: { UIcon, URow },
  directives: { tooltip },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UIcon
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-tooltip="option"
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
        "To use a custom icon, import it with the suffix `?component` and pass the imported component in the `src` prop, like this: <br/> `import Beverage from './src/assets/icons/beverage.svg'`",
    },
  },
};

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };
Colors.parameters = getEnumVariantDescription();

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant", color: "success" };
Variants.parameters = getEnumVariantDescription();

export const Interactive = DefaultTemplate.bind({});
Interactive.args = { interactive: true };
