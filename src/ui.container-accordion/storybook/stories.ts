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
  class?: string;
}

export default {
  id: "5040",
  title: "Containers / Accordion",
  component: UAccordion,
  args: {
    modelValue: null,
    options: [
      {
        value: "1",
        title: "Committed to Quality and Performance",
        description:
          trimText(`We take pride in delivering high-quality solutions tailored to your needs.
          Our expertise ensures that your project is built with efficiency, scalability, and reliability in mind.
        `),
      },
      {
        value: "2",
        opened: true,
        title: "Pioneering Cutting-Edge Solutions",
        description:
          trimText(`Our team stays ahead of the curve, integrating the latest technologies
          and best practices to drive innovation and create future-ready applications for your business.
          `),
      },
      {
        value: "3",
        title: "Building Together for Long-Term Success",
        description:
          trimText(`We work closely with you to understand your goals, ensuring seamless communication
          and a collaborative approach that leads to sustainable, impactful results.
          `),
      },
    ],
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
    <UAccordion v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UAccordion>
  `,
});

const EnumTemplate: StoryFn<UAccordionArgs> = (args: UAccordionArgs, { argTypes }) => ({
  components: { UAccordion, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="xl" block>
      <UAccordion
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        v-model="args.modelValue"
        :key="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Sizes = EnumTemplate.bind({});
Sizes.args = {
  enum: "size",
  class: "w-full",
  options: [
    {
      value: "1",
      title: "Committed to Quality and Performance",
      description: "{enumValue}",
    },
  ],
};
