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
import UCol from "../../ui.container-col/UCol.vue";
import UButton from "../../ui.button/UButton.vue";

import { COMPONENT_NAME } from "../constants.ts";

import type { Props } from "../types.ts";

interface DefaultUDatePickerArgs extends Props<unknown> {
  slotTemplate?: string;
}

interface EnumUDatePickerArgs extends Props<unknown> {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
}

export default {
  id: "3170",
  title: "Form Inputs & Controls / Date Picker",
  component: UDatePicker,
  args: {
    label: "Select a date",
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
  components: { UDatePicker, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UDatePicker
        v-for="(option, index) in options"
        open-direction-y="bottom"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :placeholder="option"
      />
    </UCol>
  `,
});

const OpenDirectionTemplate: StoryFn<DefaultUDatePickerArgs> = (args: DefaultUDatePickerArgs) => ({
  components: { UDatePicker, UCol },
  setup() {
    return {
      args,
    };
  },
  template: `
    <UCol>
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
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { modelValue: new Date() };

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "MM/DD/YYYY" };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Please choose a date from the calendar." };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Please select a valid date." };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size" };

export const OpenDirection = OpenDirectionTemplate.bind({});
OpenDirection.args = {};
OpenDirection.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "Control the direction in which the datepicker opens along the x- and y-axes using the `openDirectionX` and `openDirectionY` props.",
    },
  },
};

export const Timepicker = DefaultTemplate.bind({});
Timepicker.args = {
  timepicker: true,
  modelValue: new Date(2024, 2, 14, 12, 24, 14),
};

export const DateFormat = DefaultTemplate.bind({});
DateFormat.args = { dateFormat: "Y-m-d" };
DateFormat.parameters = {
  docs: {
    description: {
      story: "Date string format.",
    },
  },
};

export const DateTimeFormat = DefaultTemplate.bind({});
DateTimeFormat.args = { timepicker: true, dateTimeFormat: "Y-m-d H:i:S" };
DateTimeFormat.parameters = {
  docs: {
    description: {
      story: "Same as date format, but used when timepicker is enabled.",
    },
  },
};

export const UserDateFormat = DefaultTemplate.bind({});
UserDateFormat.args = { userDateFormat: "d/m/Y" };
UserDateFormat.parameters = {
  docs: {
    description: {
      story: "User-friendly date format (it will be shown in UI).",
    },
  },
};

export const UserDateTimeFormat = DefaultTemplate.bind({});
UserDateTimeFormat.args = { timepicker: true, userDateTimeFormat: "d/m/Y H:i:S" };
UserDateTimeFormat.parameters = {
  docs: {
    description: {
      story: "Same as user format, but used when timepicker is enabled.",
    },
  },
};

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: new Date(2022, 2, 22),
  maxDate: new Date(2022, 2, 26),
  modelValue: new Date(2022, 2, 24),
};
MinMax.parameters = {
  docs: {
    description: {
      story: "Use `minDate` and `maxDate` props to set the minimum and maximum date.",
    },
  },
};

export const IconProps: StoryFn<DefaultUDatePickerArgs> = (args) => ({
  components: { UDatePicker, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UDatePicker
        v-bind="args"
        v-model="args.modelValue"
        left-icon="update"
        class="w-full"
      />
      <UDatePicker
        v-bind="args"
        v-model="args.modelValue"
        right-icon="edit_calendar"
        class="w-full"
      />
    </URow>
  `,
});

export const Slots: StoryFn<DefaultUDatePickerArgs> = (args) => ({
  components: { UDatePicker, URow, UButton },
  setup() {
    return { args };
  },
  template: `
    <URow align="stretch">
      <UDatePicker
        v-bind="args"
        v-model="args.modelValue"
        class="w-full"
        :config="{ datepickerInput: { leftSlot: 'pl-0' } }"
      >
        <template #left>
          <UButton label="Export" size="xs" class="h-full rounded-r-none" />
        </template>
      </UDatePicker>
      <UDatePicker
        v-bind="args"
        v-model="args.modelValue"
        class="w-full"
        :config="{ datepickerInput: { rightSlot: 'pr-0' } }"
      >
        <template #right>
          <UButton label="Schedule" size="xs" class="h-full rounded-l-none" />
        </template>
      </UDatePicker>
    </URow>
  `,
});
