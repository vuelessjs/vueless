import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UChip from "../UChip.vue";
import UButton from "../../ui.button/UButton.vue";
import ULink from "../../ui.button-link/ULink.vue";
import URow from "../../ui.container-row/URow.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UChipArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color" | "xPosition" | "yPosition";
}

export default {
  id: "100020",
  title: "Other / Chip",
  component: UChip,
  args: {
    /* predefine prop values here */
  },
  argTypes: {
    ...getArgTypes(UChip.__name),
  },
} as Meta;

const defaultTemplate = `
  <UButton
    icon="mail"
    color="neutral"
    variant="subtle"
    square
    size="sm"
  />
`;

const DefaultTemplate: StoryFn<UChipArgs> = (args: UChipArgs) => ({
  components: { UChip, UButton, ULink, UAvatar },
  setup() {
    const slots = getSlotNames(UChip.__name);

    return { args, slots };
  },
  template: `
    <UChip v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UChip>
  `,
});

const EnumVariantTemplate: StoryFn<UChipArgs> = (args: UChipArgs, { argTypes }) => ({
  components: { URow, UChip, UButton },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <UChip
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
      >
        <UButton
          :label="option"
          color="neutral"
          variant="subtle"
          size="sm"
        />
      </UChip>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Icon = DefaultTemplate.bind({});
Icon.args = {
  icon: "arrow_outward",
  size: "sm",
  slotTemplate: `
    <ULink label="Releases" />
  `,
};

export const Text = DefaultTemplate.bind({});
Text.args = { text: "2" };

export const Inset = DefaultTemplate.bind({});
Inset.args = {
  inset: true,
  slotTemplate: `<UAvatar src="https://avatar.iran.liara.run/public/11" rounded="full" />`,
};

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size" };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };

export const XPosition = EnumVariantTemplate.bind({});
XPosition.args = { enum: "xPosition" };

export const YPosition = EnumVariantTemplate.bind({});
YPosition.args = { enum: "yPosition" };
