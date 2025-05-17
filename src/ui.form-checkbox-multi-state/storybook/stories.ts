import {
  getArgs,
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
  setup: () => ({ args, slots: getSlotNames(UCheckboxMultiState.__name) }),
  template: `
    <UCheckboxMultiState v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UCheckboxMultiState>
  `,
});

const EnumTemplate: StoryFn<UCheckboxMultiStateArgs> = (
  args: UCheckboxMultiStateArgs,
  { argTypes },
) => ({
  components: { UCheckboxMultiState, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UCheckboxMultiState
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelPlacement = EnumTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };
