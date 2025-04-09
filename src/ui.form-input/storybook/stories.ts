import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInput from "../../ui.form-input/UInput.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputArgs extends Props {
  slotTemplate?: string;
  enum: "labelAlign" | "size" | "validationRule";
}

export default {
  id: "3010",
  title: "Form Inputs & Controls / Input",
  component: UInput,
  args: {
    label: "Full Name",
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
  setup() {
    const slots = getSlotNames(UInput.__name);

    return { args, slots };
  },
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

const EnumVariantTemplate: StoryFn<UInputArgs> = (args: UInputArgs, { argTypes }) => ({
  components: { UInput, UCol },
  setup() {
    function getDescription(option: string) {
      switch (option) {
        case "string":
          return "Only letters are allowed.";
        case "number":
          return "Numbers are allowed (including decimals).";
        case "integer":
          return "Only integers are allowed.";
        case "stringAndNumber":
          return "Letters and numbers are allowed.";
        case "symbol":
          return "Special characters are allowed.";
        default:
          return "";
      }
    }

    let filteredOptions = argTypes?.[args.enum]?.options;

    if (args.enum === "labelAlign") {
      filteredOptions = argTypes?.[args.enum]?.options?.filter(
        (item) => item !== "right" && item !== "topWithDesc",
      );
    }

    return {
      args,
      filteredOptions,
      getDescription,
    };
  },
  template: `
    <UCol>
      <UInput
        v-for="(option, index) in filteredOptions"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :placeholder="args.enum === 'validationRule' ? '' : option"
        :label="args.enum === 'validationRule' ? option : 'Full Name'"
        :description="args.enum === 'validationRule' ? getDescription(option) : ''"
        class="max-w-96"
      />

      <UInput
        v-if="args.enum === 'validationRule'"
        validation-rule="^#([a-fA-F0-9]{0,6}|[a-fA-F0-9]{0,8})$"
        label="Custom RegExp"
        description="Enter a valid hex color code (e.g., #FF5733)."
        label-align="topWithDesc"
        placeholder="#FF5733"
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
Description.args = { description: "Provide additional details if necessary." };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "This field is required. Please enter a value.", modelValue: "" };

export const Readonly = DefaultTemplate.bind({});
Readonly.args = {
  readonly: true,
  label: "Readonly data",
  modelValue: "Pre-filled content that cannot be changed",
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign", label: "Full Name", modelValue: "" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", modelValue: "" };

export const ValidationRules = EnumVariantTemplate.bind({});
ValidationRules.args = {
  enum: "validationRule",
  labelAlign: "topWithDesc",
  modelValue: "",
};
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
  components: { UInput, URow, UButton, UAvatar },
  setup() {
    return { args };
  },
  template: `
    <URow no-mobile>
      <UInput v-bind="args">
        <template #left>
          <UAvatar />
        </template>
      </UInput>

      <UInput v-bind="args" :config="{ rightSlot: 'pr-0' }">
        <template #right>
          <UButton label="Search" size="sm" class="rounded-l-none h-full" />
        </template>
      </UInput>
    </URow>
  `,
});
