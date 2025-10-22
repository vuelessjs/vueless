import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import URadioGroup from "../../ui.form-radio-group/URadioGroup.vue";
import URadio from "../../ui.form-radio/URadio.vue";
import UAlert from "../../ui.text-alert/UAlert.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UText from "../../ui.text-block/UText.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface URadioGroupArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color";
}

export default {
  id: "3160",
  title: "Form Inputs & Controls / Radio Group",
  component: URadioGroup,
  args: {
    label: "Select your preferred delivery option:",
    options: [
      { id: "standard", label: "Standard Shipping (3-5 business days)" },
      { id: "express", label: "Express Shipping (1-2 business days)" },
      { id: "pickup", label: "In-Store Pickup (Available same day)" },
    ],
  },
  argTypes: {
    ...getArgTypes(URadioGroup.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(URadioGroup.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<URadioGroupArgs> = (args: URadioGroupArgs) => ({
  components: { URadioGroup, URadio, UCol, UBadge, UText, URow },
  setup: () => ({ args, slots: getSlotNames(URadioGroup.__name) }),
  template: `
    <URadioGroup v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </URadioGroup>
  `,
});

const EnumTemplate: StoryFn<URadioGroupArgs> = (args: URadioGroupArgs, { argTypes }) => ({
  components: { URadioGroup, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <URadioGroup
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        :name="option"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { name: "Default" };

export const Description = DefaultTemplate.bind({});
Description.args = {
  name: "Description",
  label: "Delivery Options",
  description:
    "Select your preferred delivery method. Additional charges may apply for expedited shipping.",
};

export const Error: StoryFn<URadioGroupArgs> = (args: URadioGroupArgs) => ({
  components: { URadioGroup },
  setup: () => ({ args }),
  template: `
    <URadioGroup
      v-bind="args"
      v-model="args.modelValue"
      name="Error"
      :error="args.modelValue ? '' : 'Please, select at least one option to proceed.'"
    />
  `,
});

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { name: "Disabled", disabled: true };

export const Options = DefaultTemplate.bind({});
Options.args = {
  name: "Options",
  options: [
    { label: "String", id: "Subscribed" },
    { label: "Number", id: 42 },
    { label: "Boolean", id: true },
    { label: "Object", id: { id: 101, status: "active" } },
    { label: "Array", id: ["Admin", "Editor"] },
  ],
};
Options.parameters = {
  docs: {
    description: {
      story:
        "Every option you pass via the `options` prop can be of different type (see object meta keys table below).",
    },
  },
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", name: "Sizes", label: "{enumValue}" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", name: "Colors", label: "{enumValue}" };

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  name: "LabelSlot",
  slotTemplate: `
    <template #label="{ label }">
      {{ label }}
      <span class="text-red-500">*</span>
    </template>
  `,
};

export const CustomKeys: StoryFn<URadioGroupArgs> = (args: URadioGroupArgs) => ({
  components: { URadioGroup, UCol, UAlert },
  setup: () => ({ args }),
  template: `
    <UCol>
      <URadioGroup v-bind="args" v-model="args.modelValue" />

      <UAlert
        :description="args.modelValue"
        size="sm"
        variant="soft"
        color="success"
        bordered
      />
    </UCol>
  `,
});
CustomKeys.args = {
  name: "CustomKeys",
  label: "Select your subscription plan:",
  labelKey: "title",
  valueKey: "planId",
  options: [
    { planId: "basic", title: "Basic Plan - $9.99/month" },
    { planId: "pro", title: "Pro Plan - $19.99/month" },
    { planId: "enterprise", title: "Enterprise Plan - $49.99/month" },
  ],
};
CustomKeys.parameters = {
  docs: {
    description: {
      story:
        "Use `labelKey` and `valueKey` props to specify custom keys for label and value in option objects. This is useful when working with data from APIs that use different property names.",
    },
  },
};
