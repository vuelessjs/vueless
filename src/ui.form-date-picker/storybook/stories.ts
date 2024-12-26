import type { Meta, StoryFn } from "@storybook/vue3";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDatePicker from "../../ui.form-date-picker/UDatePicker.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

import { COMPONENT_NAME } from "../constants.ts";

import type { UDatePickerProps } from "../types.ts";

interface DefaultUDatePickerArgs extends UDatePickerProps<unknown> {
  slotTemplate?: string;
}

interface EnumUDatePickerArgs extends UDatePickerProps<unknown> {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "3170",
  title: "Form Inputs & Controls / Date Picker",
  component: UDatePicker,
  args: {
    label: "Label",
    modelValue: null,
  },
  argTypes: {
    ...getArgTypes(COMPONENT_NAME),
  },
  parameters: {
    docs: {
      ...getDocsDescription(COMPONENT_NAME),
      story: {
        height: "480px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDatePickerArgs> = (args: DefaultUDatePickerArgs) => ({
  components: { UDatePicker, UIcon },
  setup() {
    const slots = getSlotNames(COMPONENT_NAME);

    return { args, slots };
  },
  template: `
    <UDatePicker open-direction-y="bottom" v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDatePicker>

    <div class="mt-4">
      {{ args.modelValue }}
    </div>
  `,
});

const EnumVariantTemplate: StoryFn<EnumUDatePickerArgs> = (
  args: EnumUDatePickerArgs,
  { argTypes },
) => ({
  components: { UDatePicker, URow },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <UDatePicker
        v-for="(option, index) in options"
        open-direction-y="bottom"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
      />
    </URow>
  `,
});

const OpenDirectionTemplate: StoryFn<DefaultUDatePickerArgs> = (args: DefaultUDatePickerArgs) => ({
  components: { UDatePicker, URow },
  setup() {
    return {
      args,
    };
  },
  template: `
    <URow class="!flex-col">
      <UDatePicker
        class="w-full"
        open-direction-y="top"
        open-direction-x="left"
        v-bind="args"
        v-model="args.modelValue"
        label="Top Left"
      />
      <UDatePicker
        class="w-full"
        open-direction-y="top"
        open-direction-x="right"
        v-bind="args"
        v-model="args.modelValue"
        label="Top Right"
      />
      <UDatePicker
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="left"
        v-bind="args"
        v-model="args.modelValue"
        label="Bottom Left"
      />
      <UDatePicker
        class="w-full"
        open-direction-y="bottom"
        open-direction-x="right"
        v-bind="args"
        v-model="args.modelValue"
        label="Bottom Right"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { modelValue: new Date() };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", label: "" };

export const OpenDirection = OpenDirectionTemplate.bind({});
OpenDirection.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = { description: "some description" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "some error" };

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "some placeholder" };

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = { dateFormat: "d.m.Y", userDateFormat: "d.m.Y", modelValue: "28.06.2024" };

export const Timepicker = DefaultTemplate.bind({});
Timepicker.args = {
  timepicker: true,
  modelValue: new Date(2024, 2, 14, 12, 24, 14),
};

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: new Date(2022, 2, 22),
  maxDate: new Date(2022, 2, 26),
  modelValue: new Date(2022, 2, 24),
};

export const LeftIcon = DefaultTemplate.bind({});
LeftIcon.args = {
  leftIcon: "star",
};

export const RightIcon = DefaultTemplate.bind({});
RightIcon.args = {
  rightIcon: "star",
};
