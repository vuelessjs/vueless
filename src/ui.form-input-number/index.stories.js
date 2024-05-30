import { getArgTypes } from "../service.storybook";

import UInputNumber from "../ui.form-input-number";
import UGroup from "../ui.container-group";

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
    return { args };
  },
  data() {
    return {
      count: 1,
    };
  },
  template: `
    <UInputNumber v-model="count" v-bind="args" />
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UInputNumber, UGroup },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
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
    <UGroup gap="xl">
      <UInputNumber
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
        :label="sizeValues[index].label"
        v-model="sizeValues[index].count"
      />
    </UGroup>
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

export const sizes = SizesTemplate.bind({});
sizes.args = {
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
