import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDot from "../../ui.other-dot/UDot.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UDotArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color";
}

export default {
  id: "100010",
  title: "Other / Dot",
  component: UDot,
  argTypes: {
    ...getArgTypes(UDot.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDot.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UDotArgs> = (args: UDotArgs) => ({
  components: { UDot },
  setup() {
    const slots = getSlotNames(UDot.__name);

    return { args, slots };
  },
  template: `
    <UDot v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDot>
  `,
});

const EnumVariantTemplate: StoryFn<UDotArgs> = (args: UDotArgs, { argTypes }) => ({
  components: { UCol, URow, UDot, UBadge },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <URow
        v-for="(option, index) in options"
        :key="index"
        align="center"
      >
        <UDot v-bind="args" :[args.enum]="option"/>
        <UBadge :label="option" :[args.enum]="option" variant="subtle" size="md"/>
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };
