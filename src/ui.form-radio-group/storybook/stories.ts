import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import URadioGroup from "../../ui.form-radio-group/URadioGroup.vue";
import URadio from "../../ui.form-radio/URadio.vue";
import UAlert from "../../ui.text-alert/UAlert.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

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
      { value: "standard", label: "Standard Shipping (3-5 business days)" },
      { value: "express", label: "Express Shipping (1-2 business days)" },
      { value: "pickup", label: "In-Store Pickup (Available same day)" },
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
  components: { URadioGroup, URadio, UAlert, UCol, UBadge },
  setup: () => ({ args, slots: getSlotNames(URadioGroup.__name) }),
  template: `
    <UCol gap="2xl">
      <URadioGroup v-bind="args" v-model="args.modelValue">
        <URadio
          v-for="(radio, index) in args.options"
          :key="index"
          v-bind="radio"
        >
          ${args.slotTemplate || getSlotsFragment("")}
        </URadio>
      </URadioGroup>

      <UAlert size="sm" variant="ghost" color="success" bordered>
        <p>Selected value: {{ args.modelValue }}</p>
      </UAlert>
    </UCol>
  `,
});

const EnumTemplate: StoryFn<URadioGroupArgs> = (args: URadioGroupArgs, { argTypes }) => ({
  components: { URadioGroup, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <URadioGroup
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </UCol>
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

export const Error = DefaultTemplate.bind({});
Error.args = { name: "Error", error: "Please, select at least one option to proceed." };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { name: "Disabled", disabled: true };

export const Options = DefaultTemplate.bind({});
Options.args = {
  name: "Options",
  options: [
    { label: "String", value: "Subscribed" },
    { label: "Number", value: 42 },
    { label: "Boolean", value: true },
    { label: "Object", value: { id: 101, status: "active" } },
    { label: "Array", value: ["Admin", "Editor"] },
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
      <UBadge :label="label" color="success" variant="soft" />
    </template>
  `,
};
