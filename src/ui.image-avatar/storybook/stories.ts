import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import ULoader from "../../ui.loader/ULoader.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UAvatarProps } from "../types.ts";

interface UAvatarArgs extends UAvatarProps {
  slotTemplate?: string;
  enum: "size" | "rounded" | "color";
}

export default {
  id: "6030",
  title: "Images & Icons / Avatar",
  component: UAvatar,
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
  setup() {
    const slots = getSlotNames(UAvatar.__name);

    return { args, slots };
  },
  template: `
    <UAvatar v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UAvatar>
  `,
});

const EnumVariantTemplate: StoryFn<UAvatarArgs> = (args: UAvatarArgs, { argTypes }) => ({
  components: { UCol, URow, UAvatar },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol gap="xl">
      <URow>
        <UAvatar
          v-for="(option, index) in options"
          :key="index"
          v-bind="args"
          :[args.enum]="option"
          :label="option"
        />
      </URow>
      <URow>
        <UAvatar
          v-for="(option, index) in options"
          :key="index"
          v-bind="args"
          :[args.enum]="option"
          :label="''"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { size: "3xl" };

export const Src = DefaultTemplate.bind({});
Src.args = {
  src: "https://avatars.githubusercontent.com/u/16276298?v=4",
  size: "3xl",
};

export const Label = DefaultTemplate.bind({});
Label.args = { label: "Name Surname", size: "3xl" };

/**
 * Hold cursor above an avatar to see value.
 */
export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

/**
 * Hold cursor above an avatar to see value.
 */
export const Rounded = EnumVariantTemplate.bind({});
Rounded.args = { enum: "rounded", label: "John Doe", color: "orange" };

/**
 * Hold cursor above an avatar to see value.
 */
export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

/**
 * Hold cursor above an avatar to see value.
 */
export const Bordered = EnumVariantTemplate.bind({});
Bordered.args = { enum: "color", bordered: true };

export const SlotPlaceholder = DefaultTemplate.bind({});
SlotPlaceholder.args = {
  size: "3xl",
  slotTemplate: `
    <template #placeholder>
      <ULoader loading />
    </template>
  `,
};
