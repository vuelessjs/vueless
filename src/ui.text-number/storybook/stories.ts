import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UNumber from "../../ui.text-number/UNumber.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UText from "../../ui.text-block/UText.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UNumberArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size" | "sign" | "align";
}

export default {
  id: "4050",
  title: "Text & Content / Number",
  component: UNumber,
  args: {
    value: -14.24,
    sign: "auto",
  },
  argTypes: {
    ...getArgTypes(UNumber.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UNumberArgs> = (args: UNumberArgs) => ({
  components: { UNumber, UIcon, UBadge },
  setup() {
    const slots = getSlotNames(UNumber.__name);

    return { args, slots };
  },
  template: `
    <UNumber v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UNumber>
  `,
});

const EnumVariantTemplate: StoryFn<UNumberArgs> = (args: UNumberArgs, { argTypes }) => ({
  components: { UNumber, URow, UText, UDivider },
  setup() {
    return { args, options: argTypes?.[args.enum]?.options };
  },
  template: `
    <URow :class="{ '!flex-col items-stretch': args.enum === 'align' }">
      <UNumber
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
      >
        <template #right v-if="args.enum === 'sign'">
          <UText size="lg" class="ml-1">{{ option }}</UText>
          <UDivider vertical variant="dark" class="h-5" />
        </template>
      </UNumber>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sign = EnumVariantTemplate.bind({});
Sign.args = { enum: "sign" };

export const Align = EnumVariantTemplate.bind({});
Align.args = { enum: "align" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = {
  enum: "color",
  sign: "auto",
};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LimitFractionDigits = DefaultTemplate.bind({});
LimitFractionDigits.args = {
  minFractionDigits: 4,
  maxFractionDigits: 6,
};
LimitFractionDigits.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "`minFractionDigits` and `maxFractionDigits` props determine the minimum/maximum number of digits to display after the decimal separator.",
    },
  },
};

export const DecimalSeparator = DefaultTemplate.bind({});
DecimalSeparator.args = { decimalSeparator: "." };
DecimalSeparator.parameters = {
  docs: {
    description: {
      story: "A symbol used to separate the integer part from the fractional part of a number.",
    },
  },
};

export const ThousandsSeparator = DefaultTemplate.bind({});
ThousandsSeparator.args = { value: -1400000.24, thousandsSeparator: "-" };
ThousandsSeparator.parameters = {
  docs: {
    description: {
      story: "A symbol used to separate the thousand parts of a number.",
    },
  },
};

export const Slots: StoryFn<UNumberArgs> = (args) => ({
  components: { UNumber, UIcon, URow, UBadge },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UNumber v-bind="args">
        <template #left>
          <UIcon name="confirmation_number" color="success" />
        </template>
      </UNumber>

      <UNumber v-bind="args">
        <template #right>
          <UBadge label="Quantity" color="success" />
        </template>
      </UNumber>
    </URow>
  `,
});
