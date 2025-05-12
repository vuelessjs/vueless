import {
  getArgs,
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
  setup: () => ({ args, slots: getSlotNames(UHeader.__name) }),
  template: `
    <UHeader v-bind="args" class="w-fit">
      ${args.slotTemplate || getSlotsFragment("")}
    </UHeader>
  `,
});

const EnumTemplate: StoryFn<UHeaderArgs> = (args: UHeaderArgs, { argTypes }) => ({
  components: { UHeader, UCol },
  directives: { tooltip },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UHeader
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
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

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

export const Underlined = DefaultTemplate.bind({});
Underlined.args = { underlined: true };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };
Colors.parameters = getEnumVariantDescription();

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <UBadge v-bind="args" size="lg" color="success" />
  `,
};
