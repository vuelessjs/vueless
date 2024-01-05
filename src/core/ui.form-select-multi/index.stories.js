import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UMultiselect from "vueless/ui.form-select-multi";
import URow from "vueless/ui.container-row";

export default {
  title: "Form Inputs & Controls / Multiselect",
  component: UMultiselect,
  args: {
    label: "Label",
    value: [],
    options: [
      { id: 1, label: "value 1" },
      { id: 2, label: "value 2" },
      { id: 3, label: "value 3" },
      { id: 4, label: "value 4" },
    ],
  },
  argTypes: {
    ...getArgTypes(UMultiselect.name),
    modelValue: { control: { type: "text" } },
  },
  parameters: {
    docs: {
      story: {
        height: "300px",
      },
    },
  },
};

const DefaultTemplate = (args) => ({
  components: { UMultiselect },
  setup() {
    const slots = getSlotNames(UMultiselect.name);

    return { args, slots };
  },
  template: `
    <UMultiselect v-bind="args" v-model="args.value">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UMultiselect>
  `,
});

const OpenDirectionsTemplate = (args, { argTypes }) => ({
  components: { UMultiselect, URow },
  setup() {
    return {
      args,
      openDirections: argTypes.openDirection.options,
    };
  },
  template: `
    <URow>
      <UMultiselect
        v-for="(openDirection, index) in openDirections"
        :key="index"
        v-bind="args"
        :openDirection="openDirection"
        :label="openDirection"
        v-model="args.value"
      />
    </URow>
  `,
});

const SlotTemplate = (args) => ({
  components: { UMultiselect },
  setup() {
    return { args };
  },
  template: `
    <UMultiselect
      v-bind="args"
      v-model="args.value"
    >
      ${args.slotTemplate}
    </UMultiselect>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const openDirection = OpenDirectionsTemplate.bind({});
openDirection.args = {};

export const placeholder = DefaultTemplate.bind({});
placeholder.args = { placeholder: "some placeholder text" };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error text" };

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const withoutAllowEmpty = DefaultTemplate.bind({});
withoutAllowEmpty.args = { allowEmpty: false };

export const withoutInternalSearch = DefaultTemplate.bind({});
withoutInternalSearch.args = { withInternalSearch: false };

export const optionsLimit2 = DefaultTemplate.bind({});
optionsLimit2.args = { optionsLimit: 2 };

export const description = DefaultTemplate.bind({});
description.args = { description: "some description text" };

export const addOption = DefaultTemplate.bind({});
addOption.args = { addOption: true };

export const slotTagTitle = SlotTemplate.bind({});
slotTagTitle.args = {
  slotTemplate: `
    <template #tag-title>
       🤘🤘🤘
    </template>
  `,
};

export const slotAfterCaret = SlotTemplate.bind({});
slotAfterCaret.args = {
  slotTemplate: `
    <template #after-caret>
       🤘
    </template>
  `,
};
