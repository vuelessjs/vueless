import { getArgs, getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UChip from "../UChip.vue";
import UButton from "../../ui.button/UButton.vue";
import ULink from "../../ui.button-link/ULink.vue";
import URow from "../../ui.container-row/URow.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

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
  components: { UChip, UButton, ULink, UAvatar, UBadge },
  setup: () => ({ args, slots: getSlotNames(UChip.__name) }),
  template: `
    <UChip v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UChip>
  `,
});

const EnumTemplate: StoryFn<UChipArgs> = (args: UChipArgs, { argTypes }) => ({
  components: { URow, UChip, UButton },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UChip
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
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
  size: "3xs",
  slotTemplate: `
    <ULink label="Releases" class="mr-2" />
  `,
};

export const Text = DefaultTemplate.bind({});
Text.args = {
  slotTemplate: `
    <template #default>
      ${defaultTemplate}
    </template>

    <template #chip>
      <UBadge label="3" class="py-px px-1 outline-solid outline-small outline-(--vl-bg)" />
    </template>
  `,
};

export const Inset = DefaultTemplate.bind({});
Inset.args = {
  inset: true,
  slotTemplate: `<UAvatar src="https://avatar.iran.liara.run/public/11" rounded="full" />`,
};

export const Size = EnumTemplate.bind({});
Size.args = { enum: "size" };

export const Color = EnumTemplate.bind({});
Color.args = { enum: "color" };

export const XPosition = EnumTemplate.bind({});
XPosition.args = { enum: "xPosition" };

export const YPosition = EnumTemplate.bind({});
YPosition.args = { enum: "yPosition" };
