import { getArgTypes, getSlotNames } from "../service.storybook";

import UInputMoney from "../ui.form-input-money";
import URow from "../ui.container-row";
// import UGroup from "../ui.container-group";

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
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UInputMoney>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UInputMoney, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UInputMoney
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
      />
    </URow>
  `,
});

// TODO: Rewrite to labelAlign
// const LabelPlacementTemplate = (args) => ({
//   components: { UInputMoney, UGroup },
//   setup() {
//     return {
//       args,
//     };
//   },
//   template: `
//     <UGroup size="lg">
//       <UInputMoney
//         v-bind="args"
//         :label-outside="true"
//         label="top"
//       />
//
//       <UInputMoney
//         v-bind="args"
//         :label-outside="false"
//         label="topInside"
//       />
//     </UGroup>
//   `,
// });

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const symbol = DefaultTemplate.bind({});
symbol.args = { symbol: "€" };

// export const labelOutside = LabelPlacementTemplate.bind({});
// labelOutside.args = {};

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
