import UMoney from "../ui.text-money";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";
import DebitIcon from "../ui.text-money/assets/debit.svg?component";
import CreditIcon from "../ui.text-money/assets/credit.svg?component";

import { getArgTypes, getSlotNames, getSlotsFragment } from "../utils/utilstorybook";

const COMPONENT_CLASSES = "flex justify-center w-1/6";

/**
 * The `UMoney` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-money)
 */
export default {
  id: "4040",
  title: "Text & Content / Money",
  component: UMoney,
  args: {
    sum: 10,
    symbol: "$",
    sign: "positive",
  },
  argTypes: {
    ...getArgTypes(UMoney.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UMoney, UIcon },
  setup() {
    const slots = getSlotNames(UMoney.name);

    const icons = {
      Debit: DebitIcon,
      Credit: CreditIcon,
    };

    return { args, slots, icons };
  },
  template: `
    <div class="${COMPONENT_CLASSES}">
      <UMoney v-bind="args">
        ${args.slotTemplate || getSlotsFragment()}
      </UMoney>
    </div>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UMoney, URow },
  setup() {
    const slots = getSlotNames(UMoney.name);

    return {
      args,
      slots,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <div class="${COMPONENT_CLASSES}" v-for="(option, index) in options" :key="index">
        <UMoney v-bind="args" :[args.enum]="option" />
      </div>
    </URow>
  `,
  created() {
    this.mxArgTypes = argTypes;
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const otherValues = DefaultTemplate.bind({});
otherValues.args = {
  sum: 10,
  symbol: "$",
  sign: "negative",
};

export const colors = EnumVariantTemplate.bind({});
colors.args = {
  enum: "color",
  sum: 0,
  symbol: "$",
  sign: "default",
};

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const sign = EnumVariantTemplate.bind({});
sign.args = { enum: "sign" };

export const symbolAlign = EnumVariantTemplate.bind({});
symbolAlign.args = { enum: "symbolAlign" };

export const planned = DefaultTemplate.bind({});
planned.args = { planned: true };

export const integer = DefaultTemplate.bind({});
integer.args = { integer: true };

export const numeralDecimalScale3 = DefaultTemplate.bind({});
numeralDecimalScale3.args = { numeralDecimalScale: 3 };

export const align = EnumVariantTemplate.bind({});
align.args = { enum: "align" };

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon :src="icons.Debit" size="3xs" />
    </template>
  `,
};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon :src="icons.Credit" size="3xs" />
    </template>
  `,
};
