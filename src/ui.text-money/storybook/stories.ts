import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UMoney from "../../ui.text-money/UMoney.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import DebitIcon from "../../ui.text-money/assets/debit.svg?component";
import CreditIcon from "../../ui.text-money/assets/credit.svg?component";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UMoneyArgs extends Props {
  slotTemplate?: string;
  enum: "color" | "size" | "sign" | "symbolAlign";
}

export default {
  id: "4040",
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
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Sign = EnumVariantTemplate.bind({});
Sign.args = { enum: "sign" };

export const SymbolAlign = EnumVariantTemplate.bind({});
SymbolAlign.args = { enum: "symbolAlign" };

export const Planned = DefaultTemplate.bind({});
Planned.args = { planned: true };

export const MinFractionDigits4 = DefaultTemplate.bind({});
MinFractionDigits4.args = { minFractionDigits: 4, maxFractionDigits: 4 };

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
