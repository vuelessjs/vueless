import { getArgTypes } from "../service.storybook";

import UCheckboxMultiState from "../ui.form-checkbox-multi-state";
import URow from "../ui.container-row";

export default {
  id: "3120",
  title: "Form Inputs & Controls / Checkbox Multistate",
  component: UCheckboxMultiState,
  args: {
    modelValue: false,
    options: [
      { value: false, label: "empty", icon: "", description: "checkbox empty" },
      { value: true, label: "selected", icon: "check", description: "checkbox selected" },
      { value: null, label: "not selected", icon: "remove", description: "checkbox unselected" },
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

const SizesTemplate = (args, { argTypes } = {}) => ({
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
        v-bind="args"
        :size="size"
        v-model="args.value"
        :label="size"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};
