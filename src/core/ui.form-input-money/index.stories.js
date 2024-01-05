import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UInputMoney from "vueless/ui.form-input-money";
import URow from "vueless/ui.container-row";

export default {
  title: "Form Inputs & Controls / Input Money",
  component: UInputMoney,
  args: {
    value: "",
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
      v-model="args.value"
    >
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UInputMoney>
  `,
});

const VariantsTemplate = (args, { argTypes }) => ({
  components: { UInputMoney, URow },
  setup() {
    return {
      args,
      variants: argTypes.type.options,
    };
  },
  template: `
    <URow>
      <div v-for="(variant, index) in variants" :key="index">
        <UInputMoney
          :type="variant"
          v-bind="args"
        />
      </div>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  type: "convertible",
  baseCurrencySymbol: "₴",
  value: {
    initialCurrency: {
      symbol: "₴",
      sum: "",
      placeholder: "",
      label: "UAH",
    },
    convertibleCurrency: {
      symbol: "$",
      sum: "",
      placeholder: "",
      label: "",
    },
    firstRate: {
      symbol: "$",
      sum: "29",
      placeholder: "",
      label: "USD",
    },
  },
};

export const type = VariantsTemplate.bind({});
type.args = {};

export const separatedInitialCurrency = DefaultTemplate.bind({});
separatedInitialCurrency.args = { type: "convertible", separatedInitialCurrency: true };

export const hideLabel = DefaultTemplate.bind({});
hideLabel.args = { hideLabel: true };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error" };

export const positiveOnly = DefaultTemplate.bind({});
positiveOnly.args = { positiveOnly: true };

export const withMinus = DefaultTemplate.bind({});
withMinus.args = { withMinus: true };
