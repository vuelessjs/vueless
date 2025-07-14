import { ref } from "vue";

import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UInputPassword from "../UInputPassword.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UButton from "../../ui.button/UButton.vue";
import UDropdownButton from "../../ui.dropdown-button/UDropdownButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputPasswordArgs extends Props {
  slotTemplate?: string;
  enum: "labelAlign" | "size";
  wrapperClass?: string;
}

export default {
  id: "3050",
  title: "Form Inputs & Controls / Input Password",
  component: UInputPassword,
  args: {
    modelValue: "VuelessUI",
    label: "Password",
  },
  argTypes: {
    ...getArgTypes(UInputPassword.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UInputPassword.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputPasswordArgs> = (args: UInputPasswordArgs) => ({
  components: { UInputPassword },
  setup: () => ({ args, slots: getSlotNames(UInputPassword.__name) }),
  template: `
    <UInputPassword
      v-bind="args"
      v-model="args.modelValue"
      class="max-w-96"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputPassword>
  `,
});

const EnumTemplate: StoryFn<UInputPasswordArgs> = (args: UInputPasswordArgs, { argTypes }) => ({
  components: { UInputPassword, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol :class="args.wrapperClass">
      <UInputPassword
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
        class="max-w-96"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "Enter your password", modelValue: "" };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Use at least 8 characters, including a number and a symbol." };

export const Error: StoryFn<UInputPasswordArgs> = (args: UInputPasswordArgs) => ({
  components: { UInputPassword },
  setup: () => ({ args, modelValue: ref("") }),
  template: `
    <UInputPassword
      v-bind="args"
      v-model="modelValue"
      class="!max-w-96"
      :error="modelValue ? '' : 'Invalid password.'"
    />
  `,
});

export const ReadOnly = DefaultTemplate.bind({});
ReadOnly.args = { readonly: true, modelValue: "VuelessUI" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const MaxLength = DefaultTemplate.bind({});
MaxLength.args = { maxLength: 8, modelValue: "", placeholder: "Max 8 characters" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", label: "{enumValue}" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = {
  enum: "labelAlign",
  label: "{enumValue}",
  description: "Use at least 8 characters, including a number and a symbol.",
  wrapperClass: "gap-16",
};

export const IconProps: StoryFn<UInputPasswordArgs> = (args) => ({
  components: { UInputPassword, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UInputPassword
        v-bind="args"
        v-model="args.modelValue"
        left-icon="key"
        label="New password"
        placeholder="Create a strong password"
      />
      <UInputPassword
        v-bind="args"
        v-model="args.modelValue"
        label="Confirm password"
        placeholder="Re-enter your password"
        :config="{ defaults: { passwordVisibleIcon: 'lock_open', passwordHiddenIcon: 'lock' } }"
      />
    </URow>
  `,
});

export const Slots: StoryFn<UInputPasswordArgs> = (args) => ({
  components: { UInputPassword, URow, UButton, UDropdownButton },
  setup() {
    const wifiTypes = [
      { label: "WPA2", id: "wpa2" },
      { label: "WPA3", id: "wpa3" },
    ];

    return { args, wifiTypes };
  },
  template: `
    <URow align="stretch">
      <UInputPassword
        v-bind="args"
        v-model="args.modelValue"
        label="Enter your password"
        :config="{ passwordInput: { wrapper: 'pl-0' } }"
      >
        <template #label="{ label }">
          {{ label }}
          <span class="text-red-500">*</span>
        </template>

        <template #left>
          <UDropdownButton
            v-model="args.wifiType"
            :options="wifiTypes"
            label="Wifi type"
            size="sm"
            variant="soft"
            class="rounded-r-none h-[49px]"
          />
        </template>
      </UInputPassword>

      <UInputPassword
        v-bind="args"
        v-model="args.modelValue"
        label="Enter your password"
        :config="{ passwordInput: { wrapper: 'pr-0' } }"
      >
        <template #label="{ label }">
          {{ label }}
          <span class="text-red-500">*</span>
        </template>

        <template #right="{ visible, toggle }">
          <UButton
            :label="visible ? 'Hide' : 'Show'"
            color="neutral"
            variant="ghost"
            size="sm"
            class="rounded-l-none h-[49px] min-w-[69px]"
            @click="toggle"
          />
        </template>
      </UInputPassword>
    </URow>
  `,
});
Slots.parameters = {
  docs: {
    story: {
      height: "200px",
    },
  },
};
