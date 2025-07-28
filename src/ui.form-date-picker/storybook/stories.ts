import type { Meta, StoryFn } from "@storybook/vue3-vite";
import {
  getArgs,
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
import UText from "../../ui.text-block/UText.vue";

import { COMPONENT_NAME } from "../constants.ts";

import type { Props } from "../types.ts";

interface DefaultUDatePickerArgs extends Props<unknown> {
  slotTemplate?: string;
}

interface EnumUDatePickerArgs extends Props<unknown> {
  slotTemplate?: string;
  enum: "size" | "labelAlign";
  wrapperClass?: string;
}

const currentDate = new Date();

const oneDayMs = 24 * 60 * 60 * 1000;
const dateValue = new Date(currentDate.getTime());

export default {
  id: "3170",
  title: "Form Inputs & Controls / Date Picker",
  component: UDatePicker,
  args: {
    label: "Select a date",
    modelValue: new Date(),
  },
  argTypes: {
    ...getArgTypes(COMPONENT_NAME),
  },
  parameters: {
    docs: {
      ...getDocsDescription(COMPONENT_NAME),
      story: {
        height: "450px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDatePickerArgs> = (args: DefaultUDatePickerArgs) => ({
  components: { UDatePicker, UIcon, UText },
  setup: () => ({ args, slots: getSlotNames(COMPONENT_NAME) }),
  template: `
    <UDatePicker v-bind="args" v-model="args.modelValue" class="max-w-96">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDatePicker>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});

const EnumTemplate: StoryFn<EnumUDatePickerArgs> = (args: EnumUDatePickerArgs, { argTypes }) => ({
  components: { UDatePicker, UCol, UText },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol :class="args.wrapperClass">
      <UDatePicker
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="w-full max-w-96"
      />
    </UCol>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});

const OpenDirectionTemplate: StoryFn<DefaultUDatePickerArgs> = (args: DefaultUDatePickerArgs) => ({
  components: { UDatePicker, UCol, UText },
  setup: () => ({ args }),
  template: `
    <UCol>
      <UDatePicker
        open-direction-y="top"
        open-direction-x="left"
        v-bind="args"
        v-model="args.modelValue"
        label="Top Left"
        class="w-full"
      />
      <UDatePicker
        open-direction-y="top"
        open-direction-x="right"
        v-bind="args"
        v-model="args.modelValue"
        label="Top Right"
        class="w-full"
      />
      <UDatePicker
        open-direction-y="bottom"
        open-direction-x="left"
        v-bind="args"
        v-model="args.modelValue"
        label="Bottom Left"
        class="w-full"
      />
      <UDatePicker
        open-direction-y="bottom"
        open-direction-x="right"
        v-bind="args"
        v-model="args.modelValue"
        label="Bottom Right"
        class="w-full"
      />
    </UCol>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { modelValue: dateValue };

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "MM/DD/YYYY", modelValue: null };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Please choose a date from the calendar." };

export const Error: StoryFn<DefaultUDatePickerArgs> = (args: DefaultUDatePickerArgs) => ({
  components: { UDatePicker, UText },
  setup: () => ({ args }),
  template: `
    <UDatePicker
      v-bind="args"
      v-model="args.modelValue"
      class="max-w-96"
      :error="args.modelValue ? '' : 'Please select a valid date.'"
    />

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});
Error.args = { modelValue: null };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign", description: "{enumValue}", wrapperClass: "gap-16" };

export const Sizes: StoryFn<EnumUDatePickerArgs> = (args: EnumUDatePickerArgs, { argTypes }) => ({
  components: { UDatePicker, URow, UText },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow block>
      <UDatePicker
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
        class="w-full max-w-96"
      />
    </URow>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});
Sizes.args = { enum: "size" };

export const OpenDirection = OpenDirectionTemplate.bind({});
OpenDirection.args = {};
OpenDirection.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "Control the direction in which the datepicker opens along the x- and y-axes using the `openDirectionX` and `openDirectionY` props.",
    },
    story: {
      height: "640px",
    },
  },
};

export const Timepicker = DefaultTemplate.bind({});
Timepicker.args = {
  timepicker: true,
  modelValue: new Date(
    dateValue.getFullYear(),
    dateValue.getMonth(),
    dateValue.getDay(),
    12,
    24,
    14,
  ),
};
Timepicker.parameters = {
  docs: {
    story: {
      height: "500px",
    },
  },
};

export const DateFormat: StoryFn<DefaultUDatePickerArgs> = (args: DefaultUDatePickerArgs) => ({
  components: { UDatePicker, UText, URow },
  setup: () => ({ args }),
  template: `
    <URow block>
      <UDatePicker
        v-model="args.modelValue"
        label="Select a date"
        date-format="Y-m-d"
        class="w-full"
      />

      <UDatePicker
        v-model="args.modelValue"
        label="Select a date"
        date-time-format="Y-m-d H:i:S"
        timepicker
        class="w-full"
      />
    </URow>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});
DateFormat.parameters = {
  docs: {
    description: {
      story: "Date string format.",
    },
    source: {
      code: `
        <URow block>
          <UDatePicker
            v-model="args.modelValue"
            label="Select a date"
            date-format="Y-m-d"
            class="w-full"
          />

          <UDatePicker
            v-model="args.modelValue"
            label="Select a date"
            date-time-format="Y-m-d H:i:S"
            timepicker
            class="w-full"
          />
        </URow>

        <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
      `,
    },
  },
};

export const UserDateFormat: StoryFn<DefaultUDatePickerArgs> = (args: DefaultUDatePickerArgs) => ({
  components: { UDatePicker, UText, URow },
  setup: () => ({ args }),
  template: `
    <URow block>
      <UDatePicker
        v-model="args.modelValue"
        label="Select a date"
        user-date-format="d/m/Y"
        class="w-full"
      />

      <UDatePicker
        v-model="args.modelValue"
        label="Select a date"
        user-date-time-format="d/m/Y H:i:S"
        timepicker
        class="w-full"
      />
    </URow>

    <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
  `,
});
UserDateFormat.parameters = {
  docs: {
    description: {
      story: "Date string format.",
    },
    source: {
      code: `
        <URow block>
          <UDatePicker
            v-model="args.modelValue"
            label="Select a date"
            user-date-format="d/m/Y"
            class="w-full"
          />

          <UDatePicker
            v-model="args.modelValue"
            label="Select a date"
            user-date-time-format="d/m/Y H:i:S"
            timepicker
            class="w-full"
          />
        </URow>

        <UText color="neutral" class="mt-4">{{ args.modelValue }}</UText>
      `,
    },
  },
};
UserDateFormat.parameters = {
  docs: {
    description: {
      story: "User-friendly date format (it will be shown in UI).",
    },
  },
};

export const MinMax = DefaultTemplate.bind({});
MinMax.args = {
  minDate: currentDate,
  maxDate: new Date(currentDate.getTime() + oneDayMs * 35),
  modelValue: dateValue,
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
  setup: () => ({ args }),
  template: `
    <URow align="stretch">
      <UDatePicker
        v-bind="args"
        v-model="args.leftModel"
        class="w-full"
        :config="{ datepickerInput: { wrapper: 'pl-0' } }"
      >
        <template #left>
          <UButton
            label="Today"
            size="sm"
            variant="soft"
            class="h-full rounded-r-none"
            @click="args.leftModel = new Date()"
          />
        </template>
      </UDatePicker>

      <UDatePicker
        v-bind="args"
        v-model="args.modelValue"
        class="w-full"
        :config="{ datepickerInput: { wrapper: 'pr-0' } }"
      >
        <template #right>
          <UButton
            label="Clear"
            size="sm"
            variant="ghost"
            class="h-full rounded-l-none"
            @click="args.modelValue = null"
          />
        </template>
      </UDatePicker>
    </URow>
  `,
});
