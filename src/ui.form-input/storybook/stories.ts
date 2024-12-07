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
    modelValue: { control: { type: "text" } },
  },
  parameters: {
    ...getDocsDescription(UInput.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputArgs> = (args: UInputArgs) => ({
  components: { UInput, UIcon, UButton },
  setup() {
    const slots = getSlotNames(UInput.__name);

    return { args, slots };
  },
  template: `
    <UInput v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UInput>
  `,
});

const EnumVariantTemplate: StoryFn<UInputArgs> = (args: UInputArgs, { argTypes }) => ({
  components: { UInput, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <UInput
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "some description text" };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "some error text" };

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "some placeholder text" };

export const Readonly = DefaultTemplate.bind({});
Readonly.args = { readonly: true, modelValue: "some value for read" };

export const NoAutocomplete = DefaultTemplate.bind({});
NoAutocomplete.args = { noAutocomplete: true };

export const TypePassword = DefaultTemplate.bind({});
TypePassword.args = { type: "password" };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const ValidationRules = EnumVariantTemplate.bind({});
ValidationRules.args = { enum: "validationRule" };

export const LeftIcon = DefaultTemplate.bind({});
LeftIcon.args = { leftIcon: "star" };

export const RightIcon = DefaultTemplate.bind({});
RightIcon.args = { rightIcon: "star" };

export const LeftIconSlot = DefaultTemplate.bind({});
LeftIconSlot.args = {
  slotTemplate: `
    <template #left-icon>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};

export const RightIconSlot = DefaultTemplate.bind({});
RightIconSlot.args = {
  slotTemplate: `
    <template #right-icon>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};

export const LeftSlot = DefaultTemplate.bind({});
LeftSlot.args = {
  slotTemplate: `
    <template #left>
      <UButton variant="thirdary" filled square noRing label="Filter" class="rounded-r-none h-full" />
    </template>
  `,
};

export const RightSlot = DefaultTemplate.bind({});
RightSlot.args = {
  slotTemplate: `
    <template #right>
      <UButton variant="thirdary" filled square noRing label="Filter" class="rounded-l-none" />
    </template>
  `,
};
