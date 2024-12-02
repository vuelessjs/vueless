import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCheckboxMultiState from "../../ui.form-checkbox-multi-state/UCheckboxMultiState.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UCheckboxMultiStateProps } from "../types.ts";

interface UCheckboxMultiStateArgs extends UCheckboxMultiStateProps {
  slotTemplate?: string;
  enum: "size";
}

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
  parameters: {
    ...getDocsDescription(UCheckboxMultiState.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UCheckboxMultiStateArgs> = (args: UCheckboxMultiStateArgs) => ({
  components: { UCheckboxMultiState },
  setup() {
    const slots = getSlotNames(UCheckboxMultiState.__name);

    return { args, slots };
  },
  template: `
    <UCheckboxMultiState v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UCheckboxMultiState>
  `,
});

const EnumVariantTemplate: StoryFn<UCheckboxMultiStateArgs> = (
  args: UCheckboxMultiStateArgs,
  { argTypes },
) => ({
  components: { UCheckboxMultiState, URow },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
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
