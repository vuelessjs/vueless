import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UInputNumber from "../../ui.form-input-number/UInputNumber.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UInputNumberProps } from "../types.ts";

interface UInputNumberArgs extends UInputNumberProps {
  slotTemplate?: string;
  enum: "size";
}

/**
 * The `UInputNumber` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-input-number)
 */
export default {
  id: "3050",
  title: "Form Inputs & Controls / Input Number",
  component: UInputNumber,
  args: {
    modelValue: 1,
  },
  argTypes: {
    ...getArgTypes(UInputNumber.__name),
    modelValue: { control: { type: "number" } },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputNumberArgs> = (args: UInputNumberArgs) => ({
  components: { UInputNumber },
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
  data() {
    return {
      sizeValues: [
        { count: 1, label: "sm" },
        { count: 1, label: "md" },
        { count: 1, label: "lg" },
      ],
    };
  },
  template: `
    <UCol gap="xl">
      <UInputNumber
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="sizeValues[index].count"
        :[args.enum]="option"
        :label="sizeValues[index].label"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { step: 1, min: 1, max: 100 };

export const Label = DefaultTemplate.bind({});
Label.args = {
  modelValue: 1,
  step: 1,
  min: 1,
  max: 100,
  label: "Year",
};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = {
  enum: "size",
  modelValue: 1,
  step: 1,
  min: 1,
  max: 100,
};

export const ValueLimit = DefaultTemplate.bind({});
ValueLimit.args = {
  modelValue: 1,
  step: 1,
  min: 5,
  max: 10,
  label: "Min is 5 | Max is 10",
};

export const Step = DefaultTemplate.bind({});
Step.args = {
  modelValue: 1,
  step: 5,
  min: 1,
  max: 100,
  label: "Step is 5",
};
