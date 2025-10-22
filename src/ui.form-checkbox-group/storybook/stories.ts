import { ref } from "vue";

import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UCheckboxGroup from "../../ui.form-checkbox-group/UCheckboxGroup.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import UAlert from "../../ui.text-alert/UAlert.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UText from "../../ui.text-block/UText.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UCheckboxGroupArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color";
}

export default {
  id: "3110",
  title: "Form Inputs & Controls / Checkbox Group",
  component: UCheckboxGroup,
  args: {
    label: "Select your preferred communication methods:",
    options: [
      { label: "Email Notifications", id: "email" },
      { label: "SMS Alerts", id: "sms" },
      { label: "Push Notifications", id: "push" },
    ],
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
  components: { UCheckboxGroup, UCheckbox, URow, UCol, UBadge, UText, ULink, UIcon },
  setup: () => ({ args, slots: getSlotNames(UCheckboxGroup.__name), modelValue: ref([]) }),
  template: `
    <UCheckboxGroup v-bind="args" v-model="modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UCheckboxGroup>
  `,
});

const EnumTemplate: StoryFn<UCheckboxGroupArgs> = (args: UCheckboxGroupArgs, { argTypes }) => ({
  components: { UCheckboxGroup, URow },
  setup: () => ({ args, argTypes, getArgs, modelValue: ref([]) }),
  template: `
    <URow>
      <UCheckboxGroup
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="modelValue"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { name: "Default" };

export const Description = DefaultTemplate.bind({});
Description.args = {
  name: "Description",
  description: "You may select multiple options that best fit your preferences.",
};

export const Error: StoryFn<UCheckboxGroupArgs> = (args: UCheckboxGroupArgs) => ({
  components: { UCheckboxGroup },
  setup: () => ({ args, modelValue: ref([]) }),
  template: `
    <UCheckboxGroup
      name="Error"
      v-bind="args"
      v-model="modelValue"
      :error="modelValue.length ? '' : 'At least one option must be selected.'"
    />
  `,
});

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { name: "Disabled", disabled: true };

export const Options: StoryFn<UCheckboxGroupArgs> = (args: UCheckboxGroupArgs) => ({
  components: { UCheckboxGroup, UCol, UAlert },
  setup: () => ({ args, modelValue: ref([]) }),
  template: `
    <UCol>
      <UCheckboxGroup v-bind="args" v-model="modelValue" />

      <UAlert
        :description="modelValue"
        size="sm"
        variant="soft"
        color="success"
        bordered
      />
    </UCol>
  `,
});
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

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", name: "Colors", label: "{enumValue}" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", name: "Sizes", label: "{enumValue}" };

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

export const CustomKeys: StoryFn<UCheckboxGroupArgs> = (args: UCheckboxGroupArgs) => ({
  components: { UCheckboxGroup, UCol, UAlert },
  setup: () => ({ args, modelValue: ref([]) }),
  template: `
    <UCol>
      <UCheckboxGroup v-bind="args" v-model="modelValue" />

      <UAlert
        :description="modelValue"
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
  label: "Select your preferred features:",
  labelKey: "name",
  valueKey: "value",
  options: [
    { value: 1, name: "Dark Mode" },
    { value: 2, name: "Auto-save" },
    { value: 3, name: "Notifications" },
    { value: 4, name: "Two-factor Authentication" },
  ],
};
CustomKeys.parameters = {
  docs: {
    description: {
      story:
        "Use `labelKey` and `valueKey` props to specify custom keys for label and value in option objects. " +
        "This is useful when working with data from APIs that use different property names.",
    },
  },
};
