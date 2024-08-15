import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UInput from "../ui.form-input";
import UIcon from "../ui.image-icon";
import UButton from "../ui.button";
import UCol from "../ui.container-col";

/**
 * The `UInput` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-input)
 */
export default {
  id: "3010",
  title: "Form Inputs & Controls / Input",
  component: UInput,
  args: {
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UInput.name),
    modelValue: { control: { type: "text" } },
  },
};

const DefaultTemplate = (args) => ({
  components: { UInput, UIcon, UButton },
  setup() {
    const slots = getSlotNames(UInput.name);

    return { args, slots };
  },
  template: `
    <UInput v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </UInput>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UInput, UCol },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UCol>
      <UInput
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
        :key="index"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const description = DefaultTemplate.bind({});
description.args = { description: "some description text" };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error text" };

export const placeholder = DefaultTemplate.bind({});
placeholder.args = { placeholder: "some placeholder text" };

export const readonly = DefaultTemplate.bind({});
readonly.args = { readonly: true, value: "some value for read" };

export const noAutocomplete = DefaultTemplate.bind({});
noAutocomplete.args = { noAutocomplete: true };

export const typePassword = DefaultTemplate.bind({});
typePassword.args = { type: "password" };

export const labelPlacement = EnumVariantTemplate.bind({});
labelPlacement.args = { enum: "labelAlign" };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const validationRules = EnumVariantTemplate.bind({});
validationRules.args = { enum: "validationRule" };

export const iconLeft = DefaultTemplate.bind({});
iconLeft.args = {
  iconLeft: "star",
};

export const iconRight = DefaultTemplate.bind({});
iconRight.args = {
  iconRight: "star",
};

export const iconLeftSlot = DefaultTemplate.bind({});
iconLeftSlot.args = {
  slotTemplate: `
    <template #icon-left>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};

export const iconRightSlot = DefaultTemplate.bind({});
iconRightSlot.args = {
  slotTemplate: `
    <template #icon-right>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};

export const leftSlot = DefaultTemplate.bind({});
leftSlot.args = {
  slotTemplate: `
    <template #left>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-r-none h-full" />
    </template>
  `,
};

export const rightSlot = DefaultTemplate.bind({});
rightSlot.args = {
  slotTemplate: `
    <template #right>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-l-none" />
    </template>
  `,
};
