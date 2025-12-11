import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UHeader from "../../ui.text-header/UHeader.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UHeaderArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color" | "variant" | "weight";
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
    <UHeader v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UHeader>
  `,
});

const EnumTemplate: StoryFn<UHeaderArgs> = (args: UHeaderArgs, { argTypes }) => ({
  components: { UHeader, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UHeader
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Line: StoryFn<UHeaderArgs> = (args: UHeaderArgs) => ({
  components: { UHeader, UCol },
  setup: () => ({ args }),
  template: `
    <UCol>
      <UHeader :line="false">
        <div class="rounded-medium border border-primary border-dashed w-fit">
          Text with default library line height.
        </div>
      </UHeader>

      <UHeader line>
        <div class="rounded-medium border border-primary border-dashed w-fit">
          Text with line height equal to its font size.
        </div>
      </UHeader>
    </UCol>
  `,
});
Line.args = {};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const Weights = EnumTemplate.bind({});
Weights.args = { enum: "weight" };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <span class="dark:text-red-400 text-red-600">Detailed Analysis</span> of User Engagement Metrics
  `,
};
