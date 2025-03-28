import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputNumber from "../../ui.form-input-number/UInputNumber.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputNumberArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
}

export default {
  id: "3050",
  title: "Form Inputs & Controls / Input Number",
  component: UInputNumber,
  args: {
    modelValue: 1,
    label: "Choose the number of items",
  },
  argTypes: {
    ...getArgTypes(UInputNumber.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputNumber.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputNumberArgs> = (args: UInputNumberArgs) => ({
  components: { UInputNumber, UBadge },
  setup() {
    const slots = getSlotNames(UInputNumber.__name);

    return { args, slots };
  },
  template: `
    <UInputNumber v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputNumber>
  `,
});

const EnumVariantTemplate: StoryFn<UInputNumberArgs> = (args: UInputNumberArgs, { argTypes }) => ({
  components: { UInputNumber, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol gap="xl">
      <UInputNumber
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :label="option"
        :[args.enum]="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { step: 1, min: 1, max: 100 };

export const Description = DefaultTemplate.bind({});
Description.args = {
  label: "Choose your storage capacity (in GB)",
  description: "Storage capacity may not exceed 40 GB.",
  max: 40,
};

export const Error = DefaultTemplate.bind({});
Error.args = { modelValue: NaN, error: "Passed value has incorrect format." };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = {
  enum: "size",
  modelValue: 1,
  step: 1,
  min: 1,
  max: 100,
};

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign", description: "You may configure step value." };

export const ValueLimit = DefaultTemplate.bind({});
ValueLimit.args = {
  modelValue: 7,
  step: 1,
  min: 5,
  max: 10,
  label: "Min is 5 | Max is 10",
};
ValueLimit.parameters = {
  docs: {
    description: {
      story: "To set the minimum and maximum values, use the `min` and `max` props.",
    },
  },
};

export const Step = DefaultTemplate.bind({});
Step.args = {
  modelValue: 1,
  step: 5,
  min: 1,
  max: 100,
  label: "Step is 5",
};
Step.parameters = {
  docs: {
    description: {
      story: "`step` prop determines the increment/decrement value.",
    },
  },
};

export const SlotLabel = DefaultTemplate.bind({});
SlotLabel.args = {
  slotTemplate: `
    <template #label="{ label }">
      <UBadge :label="label" />
    </template>
  `,
};
