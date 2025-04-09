import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import UHeader from "../../ui.text-header/UHeader.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

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
  directives: { tooltip },
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
        v-tooltip="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

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

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size" };
Size.parameters = getEnumVariantDescription();

export const Underlined = EnumVariantTemplate.bind({});
Underlined.args = { enum: "size", underlined: true };
Underlined.parameters = getEnumVariantDescription();

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };
Color.parameters = getEnumVariantDescription();

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <UBadge v-bind="args" size="lg" color="success" />
  `,
};
