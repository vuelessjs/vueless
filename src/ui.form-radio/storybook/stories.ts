import {
  getArgs,
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
    color: "primary",
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
  setup: () => ({ args, slots: getSlotNames(URadio.__name) }),
  template: `
    <URadio v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </URadio>
  `,
});

const EnumTemplate: StoryFn<URadioArgs> = (args: URadioArgs, { argTypes }) => ({
  components: { URadio, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <URadio
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
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

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign", label: "{enumValue}" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", label: "{enumValue}" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", label: "{enumValue}" };

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  slotTemplate: `
    <template #label="{ label }">
      <UBadge :label="label" color="success" />
    </template>
  `,
};

export const BottomSlot = DefaultTemplate.bind({});
BottomSlot.args = {
  name: "radio5",
  value: "radio",
  slotTemplate: `
    <template #bottom>
      <UBadge label="Add to favorite" color="success" size="sm" />
    </template>
  `,
};
