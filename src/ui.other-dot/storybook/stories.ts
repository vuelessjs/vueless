import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import UDot from "../../ui.other-dot/UDot.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

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
  setup: () => ({ args, slots: getSlotNames(UDot.__name) }),
  template: `
    <UDot v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDot>
  `,
});

const EnumTemplate: StoryFn<UDotArgs> = (args: UDotArgs, { argTypes }) => ({
  components: { URow, UDot, UBadge },
  directives: { tooltip },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UDot
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-tooltip="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };
Colors.parameters = getEnumVariantDescription();

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();
