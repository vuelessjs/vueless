import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UDatePickerRange from "vueless/ui.form-date-picker-range";
import URow from "vueless/ui.container-row";

export default {
  title: "Form Inputs & Controls / Date Picker Range",
  component: UDatePickerRange,
  args: {
    value: {
      from: 1651813634,
      to: 1654492034,
    },
  },
  argTypes: {
    ...getArgTypes(UDatePickerRange.name),
  },
  parameters: {
    docs: {
      story: {
        height: "580px",
      },
    },
  },
};

const DefaultTemplate = (args) => ({
  components: { UDatePickerRange },
  setup() {
    const slots = getSlotNames(UDatePickerRange.name);

    return { args, slots };
  },
  template: `
    <UDatePickerRange v-bind="args" v-model="args.value">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UDatePickerRange>
  `,
});

const SlotTemplate = (args) => ({
  components: { UDatePickerRange },
  setup() {
    return { args };
  },
  template: `
    <UDatePickerRange v-bind="args" v-model="args.value">
      ${args.slotTemplate}
    </UDatePickerRange>
  `,
});

const VariantsTemplate = (args, { argTypes }) => ({
  components: { UDatePickerRange, URow },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
    };
  },
  template: `
    <URow>
      <UDatePickerRange
        v-for="(variant, index) in variants"
        :variant="variant"
        v-bind="args"
        v-model="args.value"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const variants = VariantsTemplate.bind({});
variants.args = {};

export const label = DefaultTemplate.bind({});
label.args = { variant: "input", label: "some label" };

export const slotRight = SlotTemplate.bind({});
slotRight.args = {
  variant: "input",
  slotTemplate: `
    <template #right>
      🤘
    </template>
  `,
};
