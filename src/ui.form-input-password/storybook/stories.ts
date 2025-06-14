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
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputPasswordArgs extends Props {
  slotTemplate?: string;
  enum: "labelAlign" | "size";
}

export default {
  id: "3050",
  title: "Form Inputs & Controls / Input Password",
  component: UInputPassword,
  args: {
    modelValue: "",
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
    <UCol>
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

export const Label = DefaultTemplate.bind({});
Label.args = { label: "Password" };

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "Enter your password" };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Use at least 8 characters, including a number and a symbol." };

export const Error = DefaultTemplate.bind({});
Error.args = {
  modelValue: "1234",
  error: "Password is too weak. Try adding a symbol or more characters.",
};

export const ReadOnly = DefaultTemplate.bind({});
ReadOnly.args = { readonly: true, modelValue: "VuelessUI" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const MaxLength = DefaultTemplate.bind({});
MaxLength.args = { maxLength: 8, modelValue: "", placeholder: "Max 8 characters" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", label: "{enumValue}" };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign", label: "{enumValue}" };

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
  components: { UInputPassword, URow, UButton, UAvatar },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UInputPassword
        v-bind="args"
        v-model="args.modelValue"
        :config="{ passwordInput: { leftSlot: 'pl-0' } }"
      >
        <template #left>
          <UAvatar />
        </template>
      </UInputPassword>

      <UInputPassword
        v-bind="args"
        v-model="args.modelValue"
        :config="{ passwordInput: { rightSlot: 'pr-0' } }"
      >
        <template #right="{ visible, toggle }">
          <UButton
            :label="visible ? 'Hide' : 'Show'"
            color="neutral"
            variant="ghost"
            size="sm"
            class="rounded-l-none h-full"
            @click="toggle"
          />
        </template>
      </UInputPassword>
    </URow>
  `,
});
