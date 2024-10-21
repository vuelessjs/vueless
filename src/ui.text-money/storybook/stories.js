import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UMoney from "../../ui.text-money/UMoney.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import DebitIcon from "../../ui.text-money/assets/debit.svg?component";
import CreditIcon from "../../ui.text-money/assets/credit.svg?component";

const COMPONENT_CLASSES = "flex justify-center w-1/6";

/**
 * The `UMoney` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-money)
 */
export default {
  id: "4040",
  title: "Text & Content / Money",
  component: UMoney,
  args: {
    value: 10,
    symbol: "$",
    sign: "positive",
  },
  argTypes: {
    ...getArgTypes(UMoney.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UMoney, UIcon },
  setup() {
    const slots = getSlotNames(UMoney.__name);

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
    const slots = getSlotNames(UMoney.__name);

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

export const OtherValues = DefaultTemplate.bind({});
OtherValues.args = { value: 10, symbol: "$", sign: "negative" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = {
  enum: "color",
  value: 0,
  symbol: "$",
  sign: "default",
};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Sign = EnumVariantTemplate.bind({});
Sign.args = { enum: "sign" };

export const SymbolAlign = EnumVariantTemplate.bind({});
SymbolAlign.args = { enum: "symbolAlign" };

export const Planned = DefaultTemplate.bind({});
Planned.args = { planned: true };

export const MinFractionDigits3 = DefaultTemplate.bind({});
MinFractionDigits3.args = { value: 25.67, minFractionDigits: 3, maxFractionDigits: 3 };

export const Align = EnumVariantTemplate.bind({});
Align.args = { enum: "align" };

export const SlotLeft = DefaultTemplate.bind({});
SlotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon :src="icons.Debit" size="3xs" />
    </template>
  `,
};

export const SlotRight = DefaultTemplate.bind({});
SlotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon :src="icons.Credit" size="3xs" />
    </template>
  `,
};
