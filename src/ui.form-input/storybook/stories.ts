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
    label: "Label",
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
      class="max-w-96"
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
          return "Only letters are allowed";
        case "number":
          return "Numbers are allowed (including decimals)";
        case "integer":
          return "Only integers are allowed";
        case "stringAndNumber":
          return "Letters and numbers are allowed";
        case "symbol":
          return "Special characters are allowed";
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
        :label="option"
        :description="getDescription(option)"
        class="max-w-96"
      />

      <UInput
        v-if="args.enum === 'validationRule'"
        v-bind="args"
        validation-rule="^[a-gA-G]{1,10}$"
        label="Custom RegExp"
        description="Only letters between 'a' and 'g' are allowed, max length is 10"
        labelAlign="topWithDesc"
        placeholder="^[a-gA-G]{1,10}$"
        class="max-w-96"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "Your placeholder text" };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Some description text" };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Some error text" };

export const Readonly = DefaultTemplate.bind({});
Readonly.args = { readonly: true, modelValue: "Some value for read" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const TypePassword = DefaultTemplate.bind({});
TypePassword.args = { type: "password" };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const ValidationRules = EnumVariantTemplate.bind({});
ValidationRules.args = { enum: "validationRule", labelAlign: "topWithDesc" };
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
        v-bind="args"
        left-icon="feedback"
        label="Your opinion"
        placeholder="Share your feedback with us"
      />
      <UInput
        v-bind="args"
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
