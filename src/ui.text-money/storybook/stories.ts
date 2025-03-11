import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UMoney from "../../ui.text-money/UMoney.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UText from "../../ui.text-block/UText.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";

import DebitIcon from "../../ui.text-money/assets/debit.svg?component";
import CreditIcon from "../../ui.text-money/assets/credit.svg?component";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UMoneyArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size" | "sign" | "align" | "symbolAlign";
}

export default {
  id: "4060",
  title: "Text & Content / Money",
  component: UMoney,
  args: {
    value: -14.24,
    symbol: "$",
    sign: "auto",
  },
  argTypes: {
    ...getArgTypes(UMoney.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UMoney.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UMoneyArgs> = (args: UMoneyArgs) => ({
  components: { UMoney, UIcon },
  setup() {
    const slots = getSlotNames(UMoney.__name);

    return { args, slots };
  },
  template: `
    <UMoney v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UMoney>
  `,
});

const EnumVariantTemplate: StoryFn<UMoneyArgs> = (args: UMoneyArgs, { argTypes }) => ({
  components: { UMoney, URow, UText, UDivider },
  setup() {
    const slots = getSlotNames(UMoney.__name);

    return {
      args,
      slots,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow :class="{ '!flex-col items-stretch': args.enum === 'align' }">
      <UMoney
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
      >
        <template #right v-if="args.enum === 'sign'">
          <UText size="lg" class="ml-1">{{ option }}</UText>
          <UDivider vertical variant="dark" class="h-5" />
        </template>
      </UMoney>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sign = EnumVariantTemplate.bind({});
Sign.args = { enum: "sign" };

export const Align = EnumVariantTemplate.bind({});
Align.args = { enum: "align" };

export const SymbolAlign = EnumVariantTemplate.bind({});
SymbolAlign.args = { enum: "symbolAlign" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

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

export const Planned = DefaultTemplate.bind({});
Planned.args = { planned: true };

export const Slots: StoryFn<UMoneyArgs> = (args) => ({
  components: { UMoney, UIcon, URow },
  setup() {
    const icons = {
      Debit: DebitIcon,
      Credit: CreditIcon,
    };

    return { args, icons };
  },
  template: `
    <URow>
      <UMoney v-bind="args">
        <template #left>
          <UIcon :src="icons.Debit" size="3xs" />
        </template>
      </UMoney>

      <UMoney v-bind="args">
        <template #right>
          <UIcon :src="icons.Credit" size="3xs" />
        </template>
      </UMoney>
    </URow>
  `,
});
