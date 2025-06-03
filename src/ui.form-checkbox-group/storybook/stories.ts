import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCheckboxGroup from "../../ui.form-checkbox-group/UCheckboxGroup.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import UAlert from "../../ui.text-alert/UAlert.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";
import type { UnknownObject, UnknownArray } from "../../types.ts";

interface UCheckboxGroupArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color";
  value?: boolean | string | number | UnknownArray | UnknownObject;
}

export default {
  id: "3110",
  title: "Form Inputs & Controls / Checkbox Group",
  component: UCheckboxGroup,
  args: {
    label: "Select your preferred communication methods:",
    options: [
      { label: "Email Notifications", value: "email" },
      { label: "SMS Alerts", value: "sms" },
      { label: "Push Notifications", value: "push" },
    ],
    value: [],
  },
  argTypes: {
    ...getArgTypes(UCheckboxGroup.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UCheckboxGroup.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UCheckboxGroupArgs> = (args: UCheckboxGroupArgs) => ({
  components: { UCheckboxGroup, UCheckbox, UAlert, URow, UCol, UBadge },
  setup: () => ({ args, slots: getSlotNames(UCheckboxGroup.__name) }),
  template: `
    <UCol>
      <UCheckboxGroup v-bind="args" v-model="args.value">
        ${args.slotTemplate || getSlotsFragment("")}
      </UCheckboxGroup>

      <URow>
        <UAlert size="sm" variant="ghost" color="success" bordered>
          <p>Selected value: {{ args.value }}</p>
        </UAlert>
      </URow>
    </UCol>
  `,
});

const EnumTemplate: StoryFn<UCheckboxGroupArgs> = (args: UCheckboxGroupArgs, { argTypes }) => ({
  components: { UCheckboxGroup, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <UCheckboxGroup
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.value"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { name: "Default" };

export const Description = DefaultTemplate.bind({});
Description.args = {
  name: "Description",
  description: "You may select multiple options that best fit your preferences.",
};

export const Error = DefaultTemplate.bind({});
Error.args = { name: "Error", error: "some error" };

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

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", name: "Colors", label: "{enumValue}" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", name: "Sizes", label: "{enumValue}" };

export const LabelSlot = DefaultTemplate.bind({});
LabelSlot.args = {
  slotTemplate: `
    <template #label>
      <UBadge label="At least one option is required" color="success" />
    </template>
  `,
};
