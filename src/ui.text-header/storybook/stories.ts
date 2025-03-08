import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UHeader from "../../ui.text-header/UHeader.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UHeaderArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color";
}

export default {
  id: "4010",
  title: "Text & Content / Header",
  component: UHeader,
  args: {
    label: "Dashboard",
  },
  argTypes: {
    ...getArgTypes(UHeader.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UHeader.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UHeaderArgs> = (args: UHeaderArgs) => ({
  components: { UHeader, UBadge },
  setup() {
    const slots = getSlotNames(UHeader.__name);

    return { args, slots };
  },
  template: `
    <UHeader v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UHeader>
  `,
});

const EnumVariantTemplate: StoryFn<UHeaderArgs> = (args: UHeaderArgs, { argTypes }) => ({
  components: { UHeader, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UHeader
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="args.label + ' (' + option + ')'"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Underlined = EnumVariantTemplate.bind({});
Underlined.args = { enum: "size", underlined: true };

export const Line = DefaultTemplate.bind({});
Line.args = {
  size: "xl",
  line: true,
  label: "Detailed Analysis of User Engagement Metrics",
};
Line.parameters = {
  docs: {
    description: {
      story: "Removes text line height (useful for 1-line text).",
    },
  },
};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <UBadge v-bind="args" size="lg" color="success" />
  `,
};
