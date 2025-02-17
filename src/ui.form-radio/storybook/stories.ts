import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import URadio from "../../ui.form-radio/URadio.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface URadioArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "labelAlign" | "color";
}

export default {
  id: "3140",
  title: "Form Inputs & Controls / Radio",
  component: URadio,
  args: {
    name: "radio1",
    label: "Payment Method",
    value: "1",
    color: "brand",
  },
  argTypes: {
    ...getArgTypes(URadio.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(URadio.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<URadioArgs> = (args: URadioArgs) => ({
  components: { URadio, UBadge },
  setup() {
    const slots = getSlotNames(URadio.__name);

    return { args, slots };
  },
  template: `
    <URadio v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </URadio>
  `,
});

const EnumVariantTemplate: StoryFn<URadioArgs> = (args: URadioArgs, { argTypes }) => ({
  components: { URadio, URow },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow :class="{ '!flex-col': args.enum === 'labelAlign' }">
      <URadio
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

export const Description = DefaultTemplate.bind({});
Description.args = {
  name: "radio3",
  label: "Subscription Plan",
  description: "Choose your preferred plan. You can change it anytime.",
};

export const Error = DefaultTemplate.bind({});
Error.args = {
  description: "Please select a payment method.",
  error: "This field is required. Please make a selection.",
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true, name: "radio2" };

export const Checked = DefaultTemplate.bind({});
Checked.args = { checked: true, name: "radio4" };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };

export const SlotLabel = DefaultTemplate.bind({});
SlotLabel.args = {
  slotTemplate: `
    <template #label="{ label }">
      <UBadge :label="label" color="green" />
    </template>
  `,
};

export const SlotBottom = DefaultTemplate.bind({});
SlotBottom.args = {
  name: "radio5",
  value: "radio",
  slotTemplate: `
    <template #bottom>
      <UBadge label="Add to favorite" color="green" size="sm" />
    </template>
  `,
};
