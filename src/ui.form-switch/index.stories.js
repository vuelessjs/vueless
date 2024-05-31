import { getArgTypes } from "../service.storybook";

import USwitch from "../ui.form-switch";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";

/**
 * The `USwitch` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-switch)
 */
export default {
  id: "3130",
  title: "Form Inputs & Controls / Switch",
  component: USwitch,
  args: {
    modelValue: false,
  },
  argTypes: {
    ...getArgTypes(USwitch.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { USwitch, UIcon },
  setup() {
    return { args };
  },
  template: `
    <USwitch v-bind="args" v-model="args.value" />
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { USwitch, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <USwitch
        v-for="(color, index) in colors"
        v-bind="args"
        :color="color"
        v-model="args.value"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { USwitch, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <USwitch
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        v-model="args.value"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const label = DefaultTemplate.bind({});
label.args = { label: "Some label" };

export const description = DefaultTemplate.bind({});
description.args = { label: "Label", description: "Some description" };

export const colors = ColorsTemplate.bind({});
colors.args = { modelValue: true };

export const toggleLabel = DefaultTemplate.bind({});
toggleLabel.args = { toggleLabel: true };

export const sizes = SizesTemplate.bind({});
sizes.args = { color: "yellow" };

export const icon = DefaultTemplate.bind({});
icon.args = { toggleIcon: true, color: "yellow" };

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };
