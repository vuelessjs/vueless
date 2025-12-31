import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UAvatarGroup from "../../ui.image-avatar-group/UAvatarGroup.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import UCol from "../../ui.container-col/UCol.vue";
import ULink from "../../ui.button-link/ULink.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types.ts";

interface UAvatarGroupArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "variant" | "rounded";
}

export default {
  id: "6030",
  title: "Images & Icons / Avatar Group",
  component: UAvatarGroup,
  args: {
    avatars: [
      { src: "https://i.pravatar.cc/300?img=1" },
      { src: "https://i.pravatar.cc/300?img=2" },
      { src: "https://i.pravatar.cc/300?img=3" },
      { src: "https://i.pravatar.cc/300?img=4" },
    ],
    rounded: "full",
  },
  argTypes: {
    ...getArgTypes(UAvatarGroup.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UAvatarGroup.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UAvatarGroupArgs> = (args: UAvatarGroupArgs) => ({
  components: { UAvatarGroup, UAvatar, ULink },
  setup: () => ({
    args,
    slots: getSlotNames(UAvatarGroup.__name),
  }),
  template: `
    <UAvatarGroup v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UAvatarGroup>
  `,
});

const EnumTemplate: StoryFn<UAvatarGroupArgs> = (args: UAvatarGroupArgs, { argTypes }) => ({
  components: { UCol, UAvatarGroup, UAvatar },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UAvatarGroup
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      >
        ${args.slotTemplate}
      </UAvatarGroup>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Max = DefaultTemplate.bind({});
Max.args = { max: 2 };
Max.parameters = {
  docs: {
    description: {
      story:
        "When the number of avatars is greater than the max, the remaining count avatar is displayed.",
    },
  },
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = {
  enum: "size",
  slotTemplate: `
    <template #remaining>
      <UAvatar :label="option" />
    </template>
  `,
};

export const Variants = EnumTemplate.bind({});
Variants.args = {
  enum: "variant",
  avatars: [{ label: "John Doe" }],
  config: { avatar: "ring-0" },
};

export const AvatarConfig = DefaultTemplate.bind({});
AvatarConfig.args = {
  avatars: [
    { src: "https://i.pravatar.cc/300?img=1", label: "John Doe", chip: { color: "primary" } },
    { color: "warning", placeholderIcon: "person" },
    {
      src: "https://i.pravatar.cc/300?img=9",
      label: "Jane Smith",
      color: "info",
      chip: { color: "grayscale" },
    },
  ],
};
AvatarConfig.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "You can customize the `label`, `color`, `placeholderIcon` and `chip` of a specific avatar by passing the corresponding props to its object.",
    },
  },
};

export const AvatarSlot = DefaultTemplate.bind({});
AvatarSlot.args = {
  slotTemplate: `
    <template #avatar-2="{ avatar }">
      <UAvatar
        :src="avatar.src"
        class="ring-3 ring-primary"
      />
    </template>
  `,
};

export const RemainingSlot = DefaultTemplate.bind({});
RemainingSlot.args = {
  slotTemplate: `
    <template #remaining="{ remainingCount }">
      <ULink :label="'+' + remainingCount" size="lg" color="info" underlined />
    </template>
  `,
};
