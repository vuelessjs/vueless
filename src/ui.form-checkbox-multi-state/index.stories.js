import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UCheckboxMultiState from "../ui.form-checkbox-multi-state";
import URow from "../ui.container-row";

/**
 * The `UCheckboxMultiState` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-checkbox-multi-state)
 */
export default {
  id: "3120",
  title: "Form Inputs & Controls / Checkbox Multistate",
  component: UCheckboxMultiState,
  args: {
    options: [
      { value: false, label: "empty", icon: "", description: "checkbox empty" },
      { value: true, label: "selected", icon: "check", description: "checkbox selected" },
      { value: null, label: "not selected", icon: "remove", description: "checkbox unselected" },
    ],
  },
  argTypes: {
    ...getArgTypes(UCheckboxMultiState.name),
    modelValue: { control: { type: "boolean" } },
  },
};

const DefaultTemplate = (args) => ({
  components: { UCheckboxMultiState },
  setup() {
    const slots = getSlotNames(UCheckboxMultiState.name);

    return { args, slots };
  },
  template: `
    <UCheckboxMultiState v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </UCheckboxMultiState>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UCheckboxMultiState, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <UCheckboxMultiState
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
        :label="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };
