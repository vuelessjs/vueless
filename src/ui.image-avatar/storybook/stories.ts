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

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", label: "{enumValue}" };
Sizes.parameters = getEnumVariantDescription();

export const Rounded = EnumTemplate.bind({});
Rounded.args = { enum: "rounded", label: "{enumValue}", color: "warning" };
Rounded.parameters = getEnumVariantDescription();

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", label: "{enumValue}" };
Colors.parameters = getEnumVariantDescription();

export const Bordered = EnumTemplate.bind({});
Bordered.args = { enum: "color", bordered: true };
Bordered.parameters = getEnumVariantDescription();

export const PlaceholderSlot = DefaultTemplate.bind({});
PlaceholderSlot.args = {
  color: "success",
  size: "3xl",
  slotTemplate: `
    <template #placeholder="{ iconColor }">
      <ULoader loading :color="iconColor" />
    </template>
  `,
};
