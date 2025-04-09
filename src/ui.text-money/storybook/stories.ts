import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
  getEnumVariantDescription,
} from "../../utils/storybook.ts";

import UMoney from "../../ui.text-money/UMoney.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

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
  components: { UMoney, URow },
  directives: { tooltip },
  setup() {
    const slots = getSlotNames(UMoney.__name);

    return {
      args,
      slots,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <UMoney
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        v-tooltip="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sign = EnumVariantTemplate.bind({});
Sign.args = { enum: "sign" };
Sign.parameters = getEnumVariantDescription();

export const Align: StoryFn<UMoneyArgs> = (args: UMoneyArgs) => ({
  components: { UMoney, URow, UCol },
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
        <UMoney
          v-bind="args"
          :align="option"
          v-tooltip="option"
        />
      </URow>
    </UCol>
  `,
});
Align.parameters = getEnumVariantDescription();

export const SymbolAlign = EnumVariantTemplate.bind({});
SymbolAlign.args = { enum: "symbolAlign" };
SymbolAlign.parameters = getEnumVariantDescription();

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };
Color.parameters = getEnumVariantDescription();

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size" };
Size.parameters = getEnumVariantDescription();

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
