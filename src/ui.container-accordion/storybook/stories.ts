import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  trimText,
} from "../../utils/storybook";

import UAccordion from "../../ui.container-accordion/UAccordion.vue";
import UButton from "../../ui.button/UButton.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UAccordionArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "5050",
  title: "Containers / Accordion",
  component: UAccordion,
  args: {
    title: "Committed to Quality and Performance",
    description: trimText(
      `We take pride in delivering high-quality solutions tailored to your needs.
      Our expertise ensures that your project is built with efficiency, scalability, and reliability in mind.`,
    ),
  },
  argTypes: {
    ...getArgTypes(UAccordion.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UAccordion.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UAccordionArgs> = (args: UAccordionArgs) => ({
  components: { UAccordion, ULink, UButton, UCol, URow, UIcon },
  setup: () => ({ args, slots: getSlotNames(UAccordion.__name) }),
  template: `
    <UAccordion v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UAccordion>
  `,
});

const AccordionsTemplate: StoryFn<UAccordionArgs> = (args: UAccordionArgs) => ({
  components: { UAccordion, UButton },
  setup() {
    const slots = getSlotNames(UAccordion.__name);

    const accordions = [
      {
        title: "Committed to Quality and Performance",
        description: `
          We take pride in delivering high-quality solutions tailored to your needs.
          Our expertise ensures that your project is built with efficiency, scalability, and reliability in mind.
        `,
      },
      {
        title: "Pioneering Cutting-Edge Solutions",
        description: `
          Our team stays ahead of the curve, integrating the latest technologies and best practices
          to drive innovation and create future-ready applications for your business.
        `,
      },
      {
        title: "Building Together for Long-Term Success",
        description: `
          We work closely with you to understand your goals, ensuring seamless communication
          and a collaborative approach that leads to sustainable, impactful results.
        `,
      },
    ];

    return { args, slots, accordions };
  },
  template: `
    <UAccordion
      v-for="(accordion, index) in accordions"
      :key="index"
      v-bind="accordion"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UAccordion>
  `,
});

const EnumTemplate: StoryFn<UAccordionArgs> = (args: UAccordionArgs, { argTypes }) => ({
  components: { UAccordion },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UAccordion
      v-for="option in argTypes?.[args.enum]?.options"
      v-bind="getArgs(args, option)"
      :key="option"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Accordions = AccordionsTemplate.bind({});
Accordions.args = {};

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
