import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UEmpty from "../../ui.text-empty/UEmpty.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UEmptyArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "4090",
  title: "Text & Content / Empty",
  component: UEmpty,
  args: {
    title: "No contacts",
  },
  argTypes: {
    ...getArgTypes(UEmpty.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UEmpty.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UEmptyArgs> = (args: UEmptyArgs) => ({
  components: { UEmpty, UIcon, UButton, UBadge },
  setup: () => ({ args, slots: getSlotNames(UEmpty.__name) }),
  template: `
    <UEmpty v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UEmpty>
  `,
});

const EnumTemplate: StoryFn<UEmptyArgs> = (args: UEmptyArgs, { argTypes }) => ({
  components: { UEmpty, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UEmpty
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = { description: "There are no contacts in the list." };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", title: "{enumValue}" };

export const HeaderSlot = DefaultTemplate.bind({});
HeaderSlot.args = {
  slotTemplate: `
    <template #header>
      <UIcon
        name="person"
        color="info"
        size="2xl"
      />
    </template>
  `,
};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      <UBadge label="There are no contacts in the list." />
    </template>
  `,
};

export const FooterSlot = DefaultTemplate.bind({});
FooterSlot.args = {
  slotTemplate: `
    <template #footer>
      <UButton label="Add new one" size="sm" variant="soft" />
    </template>
  `,
};
