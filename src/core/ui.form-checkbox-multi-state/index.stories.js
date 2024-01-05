import { getArgTypes } from "vueless/service.storybook";

import UCheckboxMultiState from "vueless/ui.form-checkbox-multi-state";
import URow from "vueless/ui.container-row";

export default {
  title: "Form Inputs & Controls / Checkbox Multistate",
  component: UCheckboxMultiState,
  args: {
    label: "Label",
    value: false,
    optionsData: [
      { code: false, label: "checkbox 1" },
      { code: true, label: "checkbox 2" },
      { code: null, label: "checkbox 3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UCheckboxMultiState.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UCheckboxMultiState },
  setup() {
    return { args };
  },
  template: `
    <UCheckboxMultiState v-bind="args" v-model="args.value" />
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { UCheckboxMultiState, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UCheckboxMultiState
        v-for="(size, index) in sizes"
        :size="size"
        v-model="args.value"
        :label="size"
        :key="index"
        v-bind="args"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const value = DefaultTemplate.bind({});
value.args = { value: null };
