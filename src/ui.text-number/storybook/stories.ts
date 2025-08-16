import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UNumber from "../../ui.text-number/UNumber.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types.ts";

interface UNumberArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size" | "sign" | "align" | "currencyAlign";
}

export default {
  id: "4050",
  title: "Text & Content / Number",
  component: UNumber,
  args: {
    value: -14.24,
  },
  argTypes: {
    ...getArgTypes(UNumber.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UNumber.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UNumberArgs> = (args: UNumberArgs) => ({
  components: { UNumber, UIcon },
  setup: () => ({ args, slots: getSlotNames(UNumber.__name) }),
  template: `
    <UNumber v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UNumber>
  `,
});

const EnumTemplate: StoryFn<UNumberArgs> = (args: UNumberArgs, { argTypes }) => ({
  components: { UNumber, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UNumber
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Currency = DefaultTemplate.bind({});
Currency.args = { currency: "$" };

export const CurrencySpace = DefaultTemplate.bind({});
CurrencySpace.args = { currency: "EUR", currencySpace: true };

export const Sign = EnumTemplate.bind({});
Sign.args = { enum: "sign" };

export const Align: StoryFn<UNumberArgs> = (args: UNumberArgs) => ({
  components: { UNumber, URow, UCol },
  setup: () => ({ args }),
  template: `
    <UCol block align="stretch" class="p-2 rounded-medium border border-primary border-dashed">
      <UNumber v-bind="args" align="left" />
      <UNumber v-bind="args" align="right" />
    </UCol>
  `,
});

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const CurrencyAlign = EnumTemplate.bind({});
CurrencyAlign.args = { enum: "currencyAlign", currency: "USD", currencySpace: true };

export const LimitFractionDigits: StoryFn<UNumberArgs> = (args: UNumberArgs) => ({
  components: { UNumber, UCol },
  setup: () => ({ args }),
  template: `
    <UCol>
      <UNumber :value="-14.24" :minFractionDigits="4" :maxFractionDigits="6" />
      <UNumber :value="-14.123456789" :minFractionDigits="4" :maxFractionDigits="6" />
    </UCol>
  `,
});
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
ThousandsSeparator.args = { value: -1400000.24, thousandsSeparator: "." };
ThousandsSeparator.parameters = {
  docs: {
    description: {
      story: "A symbol used to separate the thousand parts of a number.",
    },
  },
};

export const Slots: StoryFn<UNumberArgs> = (args) => ({
  components: { UNumber, UIcon, URow },
  setup() {
    return { args };
  },
  template: `
    <URow align="center">
      <UNumber v-bind="args" value="29.99" currency="$">
        <template #left>
          <UIcon name="payments" color="success" size="sm" class="mr-1" />
        </template>
      </UNumber>

      <UNumber v-bind="args" value="156.78" currency="$">
        <template #right>
          <UIcon name="trending_up" color="success" size="sm" class="ml-1" />
        </template>
      </UNumber>
    </URow>
  `,
});
