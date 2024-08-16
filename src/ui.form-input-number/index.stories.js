import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UInputNumber from "../ui.form-input-number";
import UCol from "../ui.container-col";

/**
 * The `UInputNumber` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-input-number)
 */
export default {
  id: "3050",
  title: "Form Inputs & Controls / Input Number",
  component: UInputNumber,
  argTypes: {
    ...getArgTypes(UInputNumber.name),
    value: 1,
  },
};

const DefaultTemplate = (args) => ({
  components: { UInputNumber },
  setup() {
    const slots = getSlotNames(UInputNumber.name);

    return { args, slots };
  },
  data() {
    return {
      count: 1,
    };
  },
  template: `
    <UInputNumber v-bind="args" v-model="count">
      ${args.slotTemplate || getSlotsFragment()}
    </UInputNumber>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UInputNumber, UCol },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
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
Default.args = {
  value: 1,
  step: 1,
  min: 1,
  max: 100,
};

export const label = DefaultTemplate.bind({});
label.args = {
  value: 1,
  step: 1,
  min: 1,
  max: 100,
  label: "Year",
};

export const sizes = EnumVariantTemplate.bind({});
sizes.args = {
  enum: "size",
  value: 1,
  step: 1,
  min: 1,
  max: 100,
};

export const valueLimit = DefaultTemplate.bind({});
valueLimit.args = {
  value: 1,
  step: 1,
  min: 5,
  max: 10,
  label: "Min is 5 | Max is 10",
};

export const step = DefaultTemplate.bind({});
step.args = {
  value: 1,
  step: 5,
  min: 1,
  max: 100,
  label: "Step is 5",
};
