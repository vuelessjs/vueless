import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import UNumber from "../../ui.text-number/UNumber.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Meta, StoryFn } from "@storybook/vue3";
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
    sign: "auto",
  },
  argTypes: {
    ...getArgTypes(UNumber.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UNumberArgs> = (args: UNumberArgs) => ({
  components: { UNumber, UIcon, UBadge },
  setup: () => ({ args, slots: getSlotNames(UNumber.__name) }),
  template: `
    <UNumber v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UNumber>
  `,
});

const EnumTemplate: StoryFn<UNumberArgs> = (args: UNumberArgs, { argTypes }) => ({
  components: { UNumber, URow },
  directives: { tooltip },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UNumber
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

export const Sign = EnumTemplate.bind({});
Sign.args = { enum: "sign" };
Sign.parameters = getEnumVariantDescription();

export const Align: StoryFn<UNumberArgs> = (args: UNumberArgs) => ({
  components: { UNumber, URow, UCol },
  directives: { tooltip },
  setup() {
    const options = ["left", "right"];

    return { args, options };
  },
  template: `
    <UCol>
      <URow
        :justify="option === 'right' ? 'end' : 'start'"
        block
        v-for="(option, index) in options"
        :key="index"
      >
        <UNumber
          v-bind="args"
          :align="option"
          v-tooltip="option"
        />
      </URow>
    </UCol>
  `,
});
Align.parameters = getEnumVariantDescription();

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", sign: "auto" };
Colors.parameters = getEnumVariantDescription();

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

export const CurrencyAlign = EnumTemplate.bind({});
CurrencyAlign.args = { enum: "currencyAlign", currency: "USD", currencySpace: true };
CurrencyAlign.parameters = getEnumVariantDescription();

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
          <UIcon name="payments" color="success" class="mr-1" />
        </template>
      </UNumber>

      <UNumber v-bind="args">
        <template #right>
          <UBadge label="Quantity" color="success" class="ml-1" />
        </template>
      </UNumber>
    </URow>
  `,
});
