import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UAccordion from "../../ui.container-accordion/UAccordion.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

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
    description: `We take pride in delivering high-quality solutions tailored to your needs. Our expertise ensures that your project is built with efficiency, scalability, and reliability in mind.`,
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
  components: { UAccordion, UButton },
  setup() {
    const slots = getSlotNames(UAccordion.__name);

    return { args, slots };
  },
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

const EnumVariantTemplate: StoryFn<UAccordionArgs> = (args: UAccordionArgs, { argTypes }) => ({
  components: { UAccordion },
  setup() {
    return { args, options: argTypes?.[args.enum]?.options };
  },
  template: `
    <UAccordion
      v-for="(option, index) in options"
      :key="index"
      v-bind="args"
      :[args.enum]="option"
      :description="option"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Accordions = AccordionsTemplate.bind({});
Accordions.args = {};

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size" };

export const SlotToggle = DefaultTemplate.bind({});
SlotToggle.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <UButton
        :label="opened ? 'Close' : 'Open'"
        color="grayscale"
        variant="outlined"
        size="sm"
      />
    </template>
  `,
};
