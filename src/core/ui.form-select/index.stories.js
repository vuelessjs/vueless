import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import USelect from "vueless/ui.form-select";
import URow from "vueless/ui.container-row";

export default {
  title: "Form Inputs & Controls / Select",
  component: USelect,
  args: {
    label: "Label",
    modelValue: "",
    options: [
      { id: 1, label: "value 1" },
      { id: 2, label: "value 2" },
      { id: 3, label: "value 3" },
      { id: 4, label: "value 4" },
    ],
  },
  argTypes: {
    ...getArgTypes(USelect.name),
    modelValue: { control: { type: "text" } },
  },
  parameters: {
    docs: {
      story: {
        height: "280px",
      },
    },
  },
};

const DefaultTemplate = (args) => ({
  components: { USelect },
  setup() {
    const slots = getSlotNames(USelect.name);

    return { args, slots };
  },
  template: `
    <USelect v-bind="args" v-model="args.modelValue">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </USelect>
  `,
});

const OpenDirectionsTemplate = (args, { argTypes }) => ({
  components: { USelect, URow },
  setup() {
    return {
      args,
      openDirections: argTypes.openDirection.options,
    };
  },
  template: `
    <URow>
      <USelect
        v-for="(openDirection, index) in openDirections"
        :key="index"
        v-bind="args"
        :openDirection="openDirection"
        :label="openDirection"
        v-model="args.modelValue"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
  components: { USelect, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <USelect
        v-for="(size, index) in sizes"
        :key="index"
        :size="size"
        :label="size"
        v-model="args.modelValue"
      />
    </URow>
  `,
});

const SlotTemplate = (args) => ({
  components: { USelect },
  setup() {
    return { args };
  },
  template: `
    <USelect
      v-bind="args"
      v-model="args.modelValue"
    >
      ${args.slotTemplate}
    </USelect>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const openDirection = OpenDirectionsTemplate.bind({});
openDirection.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error text" };

export const placeholder = DefaultTemplate.bind({});
placeholder.args = { placeholder: "some placeholder text" };

export const withoutInternalSearch = DefaultTemplate.bind({});
withoutInternalSearch.args = { withInternalSearch: false };

export const description = DefaultTemplate.bind({});
description.args = { description: "some description text" };

export const optionsLimit2 = DefaultTemplate.bind({});
optionsLimit2.args = { optionsLimit: 2 };

export const allowEmpty = DefaultTemplate.bind({});
allowEmpty.args = { allowEmpty: true };

export const addOption = DefaultTemplate.bind({});
addOption.args = { addOption: true };

export const optionIsHidden = DefaultTemplate.bind({});
optionIsHidden.args = {
  options: [
    { id: 1, label: "value 1", isHidden: true },
    { id: 2, label: "value 2" },
    { id: 3, label: "value 3" },
    { id: 4, label: "value 4" },
  ],
};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const slotSingleLabel = SlotTemplate.bind({});
slotSingleLabel.args = {
  slotTemplate: `
    <template #singleLabel>
       🤘🤘🤘
    </template>
  `,
};

export const slotOption = SlotTemplate.bind({});
slotOption.args = {
  slotTemplate: `
    <template #option>
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

export const slotBeforeOption = SlotTemplate.bind({});
slotBeforeOption.args = {
  slotTemplate: `
    <template #beforeOption>
       🤘
    </template>
  `,
};
