import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UInput from "../../ui.form-input/UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UDropdownButton from "../../ui.dropdown-button/UDropdownButton.vue";
import UText from "../../ui.text-block/UText.vue";
import UChip from "../../ui.other-chip/UChip.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";
import { ref } from "vue";

interface UInputArgs extends Props {
  slotTemplate?: string;
  enum: "labelAlign" | "size" | "validationRule";
  wrapperClass?: string;
}

export default {
  id: "3010",
  title: "Form Inputs & Controls / Input",
  component: UInput,
  args: {
    label: "Name",
    modelValue: "John Doe",
  },
  argTypes: {
    ...getArgTypes(UInput.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInput.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputArgs> = (args: UInputArgs) => ({
  components: { UInput, UIcon },
  setup: () => ({ args, slots: getSlotNames(UInput.__name) }),
  template: `
    <UInput
      v-bind="args"
      v-model="args.modelValue"
      class="!max-w-96"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UInput>
  `,
});

const EnumTemplate: StoryFn<UInputArgs> = (args: UInputArgs, { argTypes }) => ({
  components: { UInput, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol :class="args.wrapperClass">
      <UInput
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="max-w-96"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { modelValue: "", placeholder: "Type something here..." };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Name of the person or entity." };

export const Error: StoryFn<UInputArgs> = (args: UInputArgs) => ({
  components: { UInput },
  setup: () => ({ args, modelValue: ref("") }),
  template: `
    <UInput
      v-bind="args"
      v-model="modelValue"
      class="!max-w-96"
      :error="modelValue ? '' : 'This field is required. Please enter a value.'"
    />
  `,
});

export const Readonly = DefaultTemplate.bind({});
Readonly.args = { readonly: true };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const MaxLength = DefaultTemplate.bind({});
MaxLength.args = { maxLength: 8, modelValue: "", placeholder: "Max 8 characters" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = {
  enum: "labelAlign",
  label: "Name",
  description: "Name of the person or entity.",
  modelValue: "",
  placeholder: "{enumValue}",
  wrapperClass: "gap-16",
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", modelValue: "", placeholder: "{enumValue}" };

export const ValidationRules: StoryFn<UInputArgs> = (args: UInputArgs, { argTypes }) => ({
  components: { UInput, UCol, URow },
  setup() {
    function getDescription(option: string): string {
      const options: Record<string, string> = {
        string: "Only letters are allowed.",
        number: "Numbers are allowed (including decimals).",
        integer: "Only integers are allowed.",
        stringAndNumber: "Letters and numbers are allowed.",
        symbol: "Special characters are allowed.",
        "Custom RegExp": "Enter a valid hex color code (e.g., #FF5733).",
      };

      return options[option] || "";
    }

    const options = argTypes.validationRule?.options;

    return { args, options, getDescription };
  },
  template: `
    <UCol class="gap-20">
      <UInput
        v-for="(option, index) in options"
        :key="index"
        v-model="args.modelValue[option]"
        :validation-rule="option"
        :label="option"
        label-align="topWithDesc"
        :description="getDescription(option)"
        class="max-w-96"
      />

      <UInput
        v-model="args.modelValue['customRegExp']"
        validation-rule="^#([a-fA-F0-9]{0,6}|[a-fA-F0-9]{0,8})$"
        label="Custom RegExp"
        :description="getDescription('Custom RegExp')"
        label-align="topWithDesc"
        class="max-w-96"
      />
    </UCol>
  `,
});
ValidationRules.parameters = {
  docs: {
    description: {
      story:
        "`validationRule` prop prevents some characters from input. You can use predefined values or your own RegExp.",
    },
  },
};

export const IconProps: StoryFn<UInputArgs> = (args) => ({
  components: { UInput, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UInput
        left-icon="feedback"
        label="Your opinion"
        placeholder="Share your feedback with us"
      />
      <UInput
        right-icon="person"
        label="Username"
        placeholder="Enter your username"
      />
    </URow>
  `,
});

export const Slots: StoryFn<UInputArgs> = (args) => ({
  components: { UInput, URow, UDropdownButton, UText, UChip },
  setup() {
    const countryCodes = [
      { label: "+33", id: "+33" },
      { label: "+44", id: "+44" },
      { label: "+49", id: "+49" },
    ];

    const countryCode = ref("+33");

    return { args, countryCode, countryCodes };
  },
  template: `
    <URow>
      <UInput
        label="Phone Number"
        placeholder="Enter your phone number"
        :config="{ wrapper: 'pl-0' }"
      >
        <template #label="{ label }">
          {{ label }}
          <span class="text-red-500">*</span>
        </template>

        <template #left>
          <UDropdownButton
            v-model="countryCode"
            :options="countryCodes"
            square
            size="sm"
            variant="soft"
            class="rounded-r-none h-[49px]"
          />
        </template>
      </UInput>

      <UInput label="Website" placeholder="Enter your website">
        <template #label="{ label }">
          {{ label }}
          <span class="text-red-500">*</span>
        </template>

        <template #right>
          <UText label=".com" variant="lifted" />
        </template>
      </UInput>
    </URow>
  `,
});
Slots.parameters = {
  docs: {
    story: {
      height: "250px",
    },
  },
};
