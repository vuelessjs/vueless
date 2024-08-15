import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

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
    const slots = getSlotNames(USwitch.name);

    return { args, slots };
  },
  template: `
    <USwitch v-bind="args" v-model="args.value">
      ${args.slotTemplate || getSlotsFragment()}
    </USwitch>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { USwitch, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <USwitch
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
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

export const colors = EnumVariantTemplate.bind({});
colors.args = { enum: "color", modelValue: true };

export const toggleLabel = DefaultTemplate.bind({});
toggleLabel.args = { toggleLabel: true };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size", color: "yellow" };

export const icon = DefaultTemplate.bind({});
icon.args = { toggleIcon: true, color: "yellow" };

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };
