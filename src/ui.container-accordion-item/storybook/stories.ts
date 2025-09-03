import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  trimText,
} from "../../utils/storybook";

import UAccordionItem from "../../ui.container-accordion-item/UAccordionItem.vue";
import UButton from "../../ui.button/UButton.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UAccordionItemArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "5050",
  title: "Containers / Accordion Item",
  component: UAccordionItem,
  args: {
    title: "Committed to Quality and Performance",
    description: trimText(
      `We take pride in delivering high-quality solutions tailored to your needs.
      Our expertise ensures that your project is built with efficiency, scalability, and reliability in mind.`,
    ),
  },
  argTypes: {
    ...getArgTypes(UAccordionItem.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UAccordionItem.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UAccordionItemArgs> = (args: UAccordionItemArgs) => ({
  components: { UAccordionItem, ULink, UButton, UCol, URow, UIcon },
  setup: () => ({ args, slots: getSlotNames(UAccordionItem.__name) }),
  template: `
    <UAccordionItem v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UAccordionItem>
  `,
});

const EnumTemplate: StoryFn<UAccordionItemArgs> = (args: UAccordionItemArgs, { argTypes }) => ({
  components: { UAccordionItem, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="xl">
      <UAccordionItem
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Opened = DefaultTemplate.bind({});
Opened.args = { opened: true };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", description: "{enumValue}" };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      <UCol gap="sm">
        <URow gap="xs" align="end">
          <UIcon name="contact_mail" size="xs" color="primary" />
          <ULink label="Email services" />
        </URow>

        <URow gap="xs" align="end">
          <UIcon name="vpn_key" size="xs" color="primary" />
          <ULink label="VPN" />
        </URow>

        <URow gap="xs" align="end">
          <UIcon name="web_traffic" size="xs" color="primary" />
          <ULink label="SEO Tools" />
        </URow>
      </UCol>
    </template>
  `,
};

export const ToggleSlot = DefaultTemplate.bind({});
ToggleSlot.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <ULink :label="opened ? 'Collapse' : 'Expand'" color="grayscale" />
    </template>
  `,
};
