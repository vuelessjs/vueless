import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UEmpty from "../../ui.text-empty/UEmpty.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UText from "../../ui.text-block/UText.vue";

import emptyInbox from "./assets/empty-inbox.png";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UEmptyArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "5055",
  title: "Containers / Empty",
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
  components: { UEmpty, UIcon, UButton, UBadge, ULink, UText },
  setup: () => ({ args, slots: getSlotNames(UEmpty.__name), emptyInbox }),
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
Sizes.args = { enum: "size" };

export const HeaderSlot = DefaultTemplate.bind({});
HeaderSlot.args = {
  slotTemplate: `
    <template #header>
      <img :src="emptyInbox" alt="empty" width="300" />
    </template>
  `,
};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      <UText>
        <i>Nothing to display here yet</i>. You can <ULink class="inline">add your own</ULink> <b>content</b>
        or include custom <b>components</b> to enhance the view.
      </UText>
    </template>
  `,
};

export const FooterSlot = DefaultTemplate.bind({});
FooterSlot.args = {
  slotTemplate: `
    <template #footer>
      <UButton
        label="Add new one"
        size="sm"
        color="grayscale"
        variant="soft"
      />
    </template>
  `,
};
