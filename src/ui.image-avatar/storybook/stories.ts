import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import URow from "../../ui.container-row/URow.vue";
import ULoader from "../../ui.loader/ULoader.vue";
import tooltip from "../../directives/tooltip/vTooltip.ts";

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
  components: { URow, UAvatar },
  directives: { tooltip },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <UAvatar
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
        v-tooltip="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { size: "3xl" };

export const Src = DefaultTemplate.bind({});
Src.args = {
  src: "https://i.pravatar.cc/300?img=67",
  size: "3xl",
};

export const PlaceholderIcon = DefaultTemplate.bind({});
PlaceholderIcon.args = {
  placeholderIcon: "account_circle",
  size: "3xl",
};

export const Label = DefaultTemplate.bind({});
Label.args = { label: "Name Surname", size: "3xl" };

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size" };
Size.parameters = {
  docs: {
    description: {
      story: "Hold cursor above an avatar to see the value.",
    },
  },
};

export const Rounded = EnumVariantTemplate.bind({});
Rounded.args = { enum: "rounded", label: "John Doe", color: "warning" };
Rounded.parameters = {
  docs: {
    description: {
      story: "Hold cursor above an avatar to see the value.",
    },
  },
};

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };
Color.parameters = {
  docs: {
    description: {
      story: "Hold cursor above an avatar to see the value.",
    },
  },
};

export const Bordered = EnumVariantTemplate.bind({});
Bordered.args = { enum: "color", bordered: true };
Bordered.parameters = {
  docs: {
    description: {
      story: "Hold cursor above an avatar to see the value.",
    },
  },
};

export const SlotPlaceholder = DefaultTemplate.bind({});
SlotPlaceholder.args = {
  color: "success",
  size: "3xl",
  slotTemplate: `
    <template #placeholder="{ iconColor }">
      <ULoader loading :color="iconColor" />
    </template>
  `,
};
