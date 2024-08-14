import { getArgTypes, getSlotNames, allSlotsFragment } from "../service.storybook";

import UInput from "../ui.form-input";
import UIcon from "../ui.image-icon";
import UButton from "../ui.button";
import UCol from "../ui.container-col";
import URow from "../ui.container-row";

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
  components: { UInput },
  setup() {
    const slots = getSlotNames(UInput.name);

    return { args, slots };
  },
  template: `
    <UInput v-bind="args" v-model="args.modelValue">
      ${allSlotsFragment}
    </UInput>
  `,
});

const SlotTemplate = (args) => ({
  components: { UInput, UIcon, UButton },
  setup() {
    return { args };
  },
  template: `
    <UInput v-bind="args">
      ${args.slotTemplate}
    </UInput>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UInput, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UInput
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
      />
    </URow>
  `,
});

const ValidationRuleTemplate = (args, { argTypes } = {}) => ({
  components: { UInput, URow },
  setup() {
    return {
      args,
      rules: argTypes.validationRule.options,
    };
  },
  template: `
    <URow>
      <UInput
        v-for="(rule, index) in rules"
        v-bind="args"
        :validationRule="rule"
        :key="index"
        :description="rule"
      />
    </URow>
  `,
});

const LabelPlacementTemplate = (args) => ({
  components: { UInput, UCol },
  setup() {
    return {
      args,
    };
  },
  template: `
    <UCol gap="xl">
      <UInput
        v-bind="args"
        label-align="top"
      />

      <UInput
        v-bind="args"
        label-align="topInside"
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

export const labelPlacement = LabelPlacementTemplate.bind({});
labelPlacement.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const validationRules = ValidationRuleTemplate.bind({});
validationRules.args = {};

export const iconLeft = DefaultTemplate.bind({});
iconLeft.args = {
  iconLeft: "star",
};

export const iconRight = DefaultTemplate.bind({});
iconRight.args = {
  iconRight: "star",
};

export const iconLeftSlot = SlotTemplate.bind({});
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

export const iconRightSlot = SlotTemplate.bind({});
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

export const leftSlot = SlotTemplate.bind({});
leftSlot.args = {
  slotTemplate: `
    <template #left>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-r-none h-full" />
    </template>
  `,
};

export const rightSlot = SlotTemplate.bind({});
rightSlot.args = {
  slotTemplate: `
    <template #right>
      <UButton variant="thirdary" filled square label="Filter" class="rounded-l-none" />
    </template>
  `,
};
