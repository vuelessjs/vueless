import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UAvatarGroup from "../UAvatarGroup.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import URow from "../../ui.container-row/URow.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UChip from "../../ui.other-chip/UChip.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UAvatarGroupArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "variant" | "rounded";
}

export default {
  id: "6040",
  title: "Images & Icons / Avatar Group",
  component: UAvatarGroup,
  args: {
    max: 5,
    variant: "solid",
    rounded: "md",
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
  components: { UAvatarGroup, UAvatar },
  setup: () => ({ args, slots: getSlotNames(UAvatarGroup.__name) }),
  template: `
    <UAvatarGroup v-bind="args">
      <UAvatar src="https://i.pravatar.cc/300?img=1" />
      <UAvatar src="https://i.pravatar.cc/300?img=2" />
      <UAvatar src="https://i.pravatar.cc/300?img=3" />
      <UAvatar label="John Doe" />
      <UAvatar label="Jane Smith" />
      <UAvatar label="Bob Johnson" />
      ${args.slotTemplate || getSlotsFragment("")}
    </UAvatarGroup>
  `,
});

const EnumTemplate: StoryFn<UAvatarGroupArgs> = (args: UAvatarGroupArgs, { argTypes }) => ({
  components: { URow, UAvatarGroup, UAvatar },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UAvatarGroup
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      >
        <UAvatar src="https://i.pravatar.cc/300?img=1" />
        <UAvatar src="https://i.pravatar.cc/300?img=2" />
        <UAvatar src="https://i.pravatar.cc/300?img=3" />
        <UAvatar label="John Doe" />
        <UAvatar label="Jane Smith" />
        <UAvatar label="Bob Johnson" />
      </UAvatarGroup>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Max: StoryFn<UAvatarGroupArgs> = (args: UAvatarGroupArgs) => ({
  components: { URow, UAvatarGroup, UAvatar },
  setup: () => ({ args }),
  template: `
    <URow>
      <UAvatarGroup :max="3">
        <UAvatar src="https://i.pravatar.cc/300?img=1" />
        <UAvatar src="https://i.pravatar.cc/300?img=2" />
        <UAvatar src="https://i.pravatar.cc/300?img=3" />
        <UAvatar label="John Doe" />
        <UAvatar label="Jane Smith" />
        <UAvatar label="Bob Johnson" />
      </UAvatarGroup>
      <UAvatarGroup :max="5">
        <UAvatar src="https://i.pravatar.cc/300?img=1" />
        <UAvatar src="https://i.pravatar.cc/300?img=2" />
        <UAvatar src="https://i.pravatar.cc/300?img=3" />
        <UAvatar label="John Doe" />
        <UAvatar label="Jane Smith" />
        <UAvatar label="Bob Johnson" />
      </UAvatarGroup>
    </URow>
  `,
});
Max.parameters = {
  docs: {
    description: {
      story: "The `max` prop can be used to limit the number of avatars displayed.",
    },
  },
};

export const Overlap: StoryFn<UAvatarGroupArgs> = (args: UAvatarGroupArgs) => ({
  components: { URow, UAvatarGroup, UAvatar },
  setup: () => ({ args }),
  template: `
    <URow>
      <UAvatarGroup :max="args.max" :config="{ defaults: { overlap: 0 } }">
        <UAvatar src="https://i.pravatar.cc/300?img=1" />
        <UAvatar src="https://i.pravatar.cc/300?img=2" />
        <UAvatar src="https://i.pravatar.cc/300?img=3" />
        <UAvatar label="John Doe" />
        <UAvatar label="Jane Smith" />
        <UAvatar label="Bob Johnson" />
      </UAvatarGroup>
      <UAvatarGroup :max="args.max" :config="{ defaults: { overlap: 0.3 } }">
        <UAvatar src="https://i.pravatar.cc/300?img=1" />
        <UAvatar src="https://i.pravatar.cc/300?img=2" />
        <UAvatar src="https://i.pravatar.cc/300?img=3" />
        <UAvatar label="John Doe" />
        <UAvatar label="Jane Smith" />
        <UAvatar label="Bob Johnson" />
      </UAvatarGroup>
      <UAvatarGroup :max="args.max" :config="{ defaults: { overlap: 0.5 } }">
        <UAvatar src="https://i.pravatar.cc/300?img=1" />
        <UAvatar src="https://i.pravatar.cc/300?img=2" />
        <UAvatar src="https://i.pravatar.cc/300?img=3" />
        <UAvatar label="John Doe" />
        <UAvatar label="Jane Smith" />
        <UAvatar label="Bob Johnson" />
      </UAvatarGroup>
    </URow>
  `,
});
Overlap.parameters = {
  docs: {
    description: {
      story:
        "The overlap can be configured using the config object to control how much avatars overlap each other.",
    },
  },
};

export const CustomRemaining = DefaultTemplate.bind({});
CustomRemaining.args = {
  max: 3,
  slotTemplate: `
    <template #remaining="{ remainingCount }">
      <UAvatar color="primary" :label="'+' + remainingCount" />
    </template>
  `,
};
CustomRemaining.parameters = {
  docs: {
    description: {
      story: "You can customize the remaining avatar by using the `remaining` slot.",
    },
    source: {
      code: `
<template>
  <UAvatarGroup :max="3">
    <UAvatar src="https://i.pravatar.cc/300?img=1" />
    <UAvatar src="https://i.pravatar.cc/300?img=2" />
    <UAvatar src="https://i.pravatar.cc/300?img=3" />
    <UAvatar label="John Doe" />
    <UAvatar label="Jane Smith" />
    <UAvatar label="Bob Johnson" />
    <template #remaining="{ remainingCount }">
      <UAvatar color="primary" :label="'+' + remainingCount" />
    </template>
  </UAvatarGroup>
</template>
      `,
    },
  },
};

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant" };
Variants.parameters = {
  docs: {
    description: {
      story: "The `variant` prop can be used to change the appearance of all avatars in the group.",
    },
  },
};

export const Rounded = EnumTemplate.bind({});
Rounded.args = { enum: "rounded" };
Rounded.parameters = {
  docs: {
    description: {
      story:
        "The `rounded` prop can be used to change the corner rounding of all avatars in the group.",
    },
  },
};

export const WithLinks: StoryFn<UAvatarGroupArgs> = (args: UAvatarGroupArgs) => ({
  components: { URow, UAvatarGroup, UAvatar, ULink },
  setup: () => ({ args }),
  template: `
    <URow>
      <UAvatarGroup :max="3" variant="outlined" rounded="lg">
        <ULink to="https://example.com/user1" target="_blank">
          <UAvatar src="https://i.pravatar.cc/300?img=1" />
        </ULink>
        <ULink to="https://example.com/user2" target="_blank">
          <UAvatar src="https://i.pravatar.cc/300?img=2" />
        </ULink>
        <ULink to="https://example.com/user3" target="_blank">
          <UAvatar src="https://i.pravatar.cc/300?img=3" />
        </ULink>
        <ULink to="https://example.com/user4" target="_blank">
          <UAvatar label="John Doe" />
        </ULink>
        <ULink to="https://example.com/user5" target="_blank">
          <UAvatar label="Jane Smith" />
        </ULink>
        <template #remaining="{ remainingCount }">
          <ULink to="https://example.com/all-users" target="_blank">
            <UAvatar color="primary" :label="'+' + remainingCount" />
          </ULink>
        </template>
      </UAvatarGroup>
    </URow>
  `,
});
WithLinks.parameters = {
  docs: {
    description: {
      story: "You can wrap avatars with ULink to make them clickable and navigable.",
    },
  },
};

export const WithChips: StoryFn<UAvatarGroupArgs> = (args: UAvatarGroupArgs) => ({
  components: { URow, UAvatarGroup, UAvatar, UChip },
  setup: () => ({ args }),
  template: `
    <URow>
      <UAvatarGroup :max="3" variant="soft" rounded="full">
        <UChip color="primary" variant="soft">
          <template #avatar>
            <UAvatar src="https://i.pravatar.cc/300?img=1" />
          </template>
          John Doe
        </UChip>
        <UChip color="secondary" variant="soft">
          <template #avatar>
            <UAvatar src="https://i.pravatar.cc/300?img=2" />
          </template>
          Jane Smith
        </UChip>
        <UChip color="success" variant="soft">
          <template #avatar>
            <UAvatar src="https://i.pravatar.cc/300?img=3" />
          </template>
          Bob Johnson
        </UChip>
        <UChip color="info" variant="soft">
          <template #avatar>
            <UAvatar label="Alice Brown" />
          </template>
          Alice Brown
        </UChip>
        <template #remaining="{ remainingCount }">
          <UChip color="neutral" variant="soft">
            <template #avatar>
              <UAvatar color="neutral" :label="'+' + remainingCount" />
            </template>
            +{{ remainingCount }} more
          </UChip>
        </template>
      </UAvatarGroup>
    </URow>
  `,
});
WithChips.parameters = {
  docs: {
    description: {
      story:
        "You can use UChip with UAvatar in the avatar slot to create rich user representations.",
    },
  },
};
