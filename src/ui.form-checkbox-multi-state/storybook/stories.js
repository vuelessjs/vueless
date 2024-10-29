import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UCheckboxMultiState from "../../ui.form-checkbox-multi-state/UCheckboxMultiState.vue";
import URow from "../../ui.container-row/URow.vue";

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
    ...getArgTypes(UCheckboxMultiState.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UCheckboxMultiState },
  setup() {
    const slots = getSlotNames(UCheckboxMultiState.__name);

    return { args, slots };
  },
  template: `
    <UCheckboxMultiState v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </UCheckboxMultiState>
  `,
});

const EnumVariantTemplate = (args, { argTypes }) => ({
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

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };
