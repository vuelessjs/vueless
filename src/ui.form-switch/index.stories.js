import { getArgTypes } from "vueless/service.storybook";

import USwitch from "vueless/ui.form-switch";
import UIcon from "vueless/ui.image-icon";
import URow from "vueless/ui.container-row";

export default {
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

const ColorsTemplate = (args, { argTypes }) => ({
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
        :color="color"
        v-bind="args"
        v-model="args.value"
        :key="index"
      />
    </URow>
  `,
});

const LabelVariantsTemplate = (args, { argTypes }) => ({
  components: { USwitch, URow },
  setup() {
    return {
      args,
      labelVariants: argTypes.labelVariant.options,
    };
  },
  template: `
    <URow>
      <USwitch
        v-for="(labelVariant, index) in labelVariants"
        :labelVariant="labelVariant"
        v-bind="args"
        v-model="args.value"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
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
        :size="size"
        v-bind="args"
        v-model="args.value"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { color: "blue" };

export const label = DefaultTemplate.bind({});
label.args = { label: "Some label" };

export const description = DefaultTemplate.bind({});
description.args = { label: "Label", description: "Some description" };

export const colors = ColorsTemplate.bind({});
colors.args = { modelValue: true };

export const labelVariants = LabelVariantsTemplate.bind({});
labelVariants.args = { modelValue: true, color: "yellow" };

export const sizes = SizesTemplate.bind({});
sizes.args = { color: "yellow" };

export const icon = DefaultTemplate.bind({});
icon.args = { withIcon: true, color: "yellow" };

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const slotLabel = DefaultTemplate.bind({});
slotLabel.args = {
  slotTemplate: `
    <template #label>
      <UIcon
        name="Close"
        color="brand"
        pill-filled
       />
    </template>
  `,
};
