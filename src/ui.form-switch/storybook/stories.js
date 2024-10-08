import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import USwitch from "../../ui.form-switch/USwitch.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

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
    ...getArgTypes(USwitch.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { USwitch, UIcon },
  setup() {
    const slots = getSlotNames(USwitch.__name);

    return { args, slots };
  },
  template: `
    <USwitch v-bind="args" v-model="args.modelValue">
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

export const Label = DefaultTemplate.bind({});
Label.args = { label: "Some label" };

export const Description = DefaultTemplate.bind({});
Description.args = { label: "Label", description: "Some description" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color", modelValue: true };

export const ToggleLabel = DefaultTemplate.bind({});
ToggleLabel.args = { toggleLabel: true };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", color: "yellow" };

export const Icon = DefaultTemplate.bind({});
Icon.args = { toggleIcon: true, color: "yellow" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };
