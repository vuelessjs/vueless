import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCheckboxMultiState from "../../ui.form-checkbox-multi-state/UCheckboxMultiState.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UCheckboxMultiStateArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color" | "labelAlign";
}

export default {
  id: "3120",
  title: "Form Inputs & Controls / Checkbox Multistate",
  component: UCheckboxMultiState,
  args: {
    options: [
      {
        value: false,
        label: "Not Selected",
        icon: "",
        description: "The checkbox is currently not selected.",
      },
      {
        value: true,
        label: "Selected",
        icon: "check",
        description: "The checkbox has been selected.",
      },
      {
        value: null,
        label: "Indeterminate",
        icon: "remove",
        description: "The checkbox is in an indeterminate state.",
      },
    ],
  },
  argTypes: {
    ...getArgTypes(UCheckboxMultiState.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UCheckboxMultiState.__name),
    },
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
  components: { UCheckboxMultiState, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UCheckboxMultiState
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
        :label="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };
