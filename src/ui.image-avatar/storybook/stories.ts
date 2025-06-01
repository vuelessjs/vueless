import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import URow from "../../ui.container-row/URow.vue";
import ULoader from "../../ui.loader/ULoader.vue";
import tooltip from "../../directives/tooltip/vTooltip.ts";

import johnDoeImg from "./assets/john-doe.png";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UAvatarArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "rounded" | "color";
}

export default {
  id: "6030",
  title: "Images & Icons / Avatar",
  component: UAvatar,
  args: {
    label: "John Doe",
    size: "xl",
  },
  argTypes: {
    ...getArgTypes(UAvatar.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UAvatar.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UAvatarArgs> = (args: UAvatarArgs) => ({
  components: { UAvatar, ULoader },
  setup: () => ({ args, slots: getSlotNames(UAvatar.__name) }),
  template: `
    <UAvatar v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UAvatar>
  `,
});

const EnumTemplate: StoryFn<UAvatarArgs> = (args: UAvatarArgs, { argTypes }) => ({
  components: { URow, UAvatar },
  directives: { tooltip },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UAvatar
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Src: StoryFn<UAvatarArgs> = (args: UAvatarArgs) => ({
  components: { UAvatar, URow },
  setup: () => ({ args, slots: getSlotNames(UAvatar.__name), johnDoeImg }),
  template: `
    <URow>
      <UAvatar v-bind="args" src="https://i.pravatar.cc/300?img=67" />
      <UAvatar v-bind="args" :src="johnDoeImg" />
    </URow>
  `,
});
Src.parameters = {
  docs: {
    description: {
      story:
        "The `src` prop can be used to display an image avatar. You can use a URL or a local image.",
    },
    source: {
      code: `
<script setup>
import johnDoeImg from "./assets/john-doe.png";
</script>

<template>
  <URow>
    <UAvatar src="https://i.pravatar.cc/300?img=67" />
    <UAvatar :src="johnDoeImg" />
  </URow>
</template>
      `,
    },
  },
};

export const PlaceholderIcon = DefaultTemplate.bind({});
PlaceholderIcon.args = {
  label: undefined,
  placeholderIcon: "account_circle",
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

export const Rounded = EnumTemplate.bind({});
Rounded.args = { enum: "rounded" };
Rounded.parameters = getEnumVariantDescription();

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };
Colors.parameters = getEnumVariantDescription();

export const Bordered = EnumTemplate.bind({});
Bordered.args = { enum: "color", bordered: true };
Bordered.parameters = getEnumVariantDescription();

export const PlaceholderSlot = DefaultTemplate.bind({});
PlaceholderSlot.args = {
  color: "primary",
  slotTemplate: `
    <template #placeholder="{ iconColor }">
      <ULoader loading size="sm" :color="iconColor" />
    </template>
  `,
};
