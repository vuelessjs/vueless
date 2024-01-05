import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UInput from "vueless/ui.form-input";
import UIcon from "vueless/ui.image-icon";
import URow from "vueless/ui.container-row";

export default {
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
    <UInput
        v-bind="args"
    >
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UInput>
  `,
});

const SlotTemplate = (args) => ({
  components: { UInput, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UInput v-bind="args"
    >
      ${args.slotTemplate}
    </UInput>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
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
        :size="size"
        :key="index"
        v-bind="args"
      />
    </URow>
  `,
});

const ValidationRuleTemplate = (args, { argTypes }) => ({
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
        :validationRule="rule"
        :key="index"
        :description="rule"
        v-bind="args"
      />
    </URow>
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

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const validationRules = ValidationRuleTemplate.bind({});
validationRules.args = {};

export const slotIcon = SlotTemplate.bind({});
slotIcon.args = {
  slotTemplate: `
    <template #icon>
      <UIcon
        name="star"
        color="black"
        size="sm"
      />
    </template>
  `,
};
