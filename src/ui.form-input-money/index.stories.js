import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UInputMoney from "../ui.form-input-money";
import UCol from "../ui.container-col";

/**
 * The `UInputMoney` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-input-money)
 */
export default {
  id: "3030",
  title: "Form Inputs & Controls / Input Money",
  component: UInputMoney,
  args: {
    label: "Label",
    inputValue: 245000.42,
  },
  argTypes: {
    ...getArgTypes(UInputMoney.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UInputMoney },
  setup() {
    const slots = getSlotNames(UInputMoney.name);

    return { args, slots };
  },
  template: `
    <UInputMoney
      v-bind="args"
      v-model="args.inputValue"
    >
      ${args.slotTemplate || getSlotsFragment()}
    </UInputMoney>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UInputMoney, UCol },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UCol>
      <UInputMoney
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const symbol = DefaultTemplate.bind({});
symbol.args = { symbol: "€" };

export const labelAlign = EnumVariantTemplate.bind({});
labelAlign.args = { enum: "labelAlign" };

export const placeholder = DefaultTemplate.bind({});
placeholder.args = { placeholder: "Placeholder" };

export const error = DefaultTemplate.bind({});
error.args = { error: "Some error." };

export const description = DefaultTemplate.bind({});
description.args = { description: "Some description." };

export const decimalScale = DefaultTemplate.bind({});
decimalScale.args = { decimalScale: 4 };

export const decimalSeparator = DefaultTemplate.bind({});
decimalSeparator.args = { decimalSeparator: "." };

export const thousandsSeparator = DefaultTemplate.bind({});
thousandsSeparator.args = { thousandsSeparator: "-" };

export const rawValuePrefix = DefaultTemplate.bind({});
rawValuePrefix.args = { rawValuePrefix: true };

export const positiveOnly = DefaultTemplate.bind({});
positiveOnly.args = { positiveOnly: true };

export const minus = DefaultTemplate.bind({});
minus.args = { minus: true };

export const readOnly = DefaultTemplate.bind({});
readOnly.args = { readOnly: true };

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };
