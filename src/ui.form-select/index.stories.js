import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import USelect from "../ui.form-select";
import URow from "../ui.container-row";
import UBadge from "../ui.text-badge";
import UIcon from "../ui.image-icon";

/**
 * The `USelect` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-select)
 */
export default {
  id: "3080",
  title: "Form Inputs & Controls / Select",
  component: USelect,
  args: {
    label: "Label",
    modelValue: "",
    options: [
      { id: 1, label: "value 1", badge: "10%" },
      { id: 2, label: "value 2", badge: "20%" },
      { id: 3, label: "value 3", badge: "30%" },
      { id: 4, label: "value 4", badge: "40%" },
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
  components: { USelect, UIcon, UBadge },
  setup() {
    function getSelectedBadge(options, currentValue) {
      return options?.find((option) => option.id === currentValue);
    }

    const slots = getSlotNames(USelect.name);

    return { args, slots, getSelectedBadge };
  },
  template: `
    <USelect v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </USelect>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { USelect, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <USelect
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
        :label="option"
      />
    </URow>
  `,
});

const GroupValuesTemplate = (args) => ({
  components: { USelect },
  setup() {
    return {
      args,
    };
  },
  template: `
    <USelect
      v-bind="args"
      v-model="args.modelValue"
      label="Single"
    />
    <USelect
      class="mt-5"
      v-bind="args"
      v-model="args.modelValueMultiple"
      label="Multiple"
      multiple
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Multiple = DefaultTemplate.bind({});
Multiple.args = { multiple: true, modelValue: [] };

export const openDirection = EnumVariantTemplate.bind({});
openDirection.args = { enum: "openDirection" };

export const groupValue = GroupValuesTemplate.bind({});
groupValue.args = {
  modelValue: "",
  modelValueMultiple: [],
  groupValueKey: "libs",
  groupLabelKey: "language",
  labelKey: "name",
  valueKey: "name",
  options: [
    {
      language: "Javascript",
      libs: [{ name: "Vue.js" }, { name: "Adonis" }],
    },
    {
      language: "Ruby",
      libs: [
        { name: "Frameworks", isSubGroup: true, level: 2 },
        { name: "Rails", level: 3 },
        { name: "Sinatra", level: 3 },
      ],
    },
    {
      language: "Other",
      libs: [{ name: "Laravel" }, { name: "Phoenix" }],
    },
  ],
};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const error = DefaultTemplate.bind({});
error.args = { error: "some error text" };

export const placeholder = DefaultTemplate.bind({});
placeholder.args = { placeholder: "some placeholder text" };

export const description = DefaultTemplate.bind({});
description.args = { description: "some description text" };

export const optionsLimit2 = DefaultTemplate.bind({});
optionsLimit2.args = { optionsLimit: 2 };

export const noClear = DefaultTemplate.bind({});
noClear.args = { noClear: true };

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

export const sizes = EnumVariantTemplate.bind({});
sizes.args = {
  enum: "size",
  multiple: true,
  multipleModelValue: [],
};

export const slotSelectedValueLabel = DefaultTemplate.bind({});
slotSelectedValueLabel.args = {
  slotTemplate: `
    <template #selected-label>
      🤘🤘🤘
    </template>
  `,
};

export const slotSelectedValueLabelAfter = DefaultTemplate.bind({});
slotSelectedValueLabelAfter.args = {
  slotTemplate: `
    <template #selected-label-after>
      🤘🤘🤘
    </template>
  `,
};

export const slotOption = DefaultTemplate.bind({});
slotOption.args = {
  slotTemplate: `
    <template #option>
      🤘🤘🤘
    </template>
  `,
};

export const slotAfterCaret = DefaultTemplate.bind({});
slotAfterCaret.args = {
  slotTemplate: `
    <template #after-caret="{ scopeProps }">
      <UBadge
        v-show="scopeProps?.modelValue"
        :label="getSelectedBadge(scopeProps?.options, scopeProps?.modelValue)?.badge"
      />
    </template>
    <template #option="{ option }">
      {{ option.label }}
      <UBadge :label="option.badge" />
    </template>
  `,
};

export const slotBeforeCaret = DefaultTemplate.bind({});
slotBeforeCaret.args = {
  slotTemplate: `
    <template #before-caret>
      🤘
    </template>
  `,
};

export const slotBeforeOption = DefaultTemplate.bind({});
slotBeforeOption.args = {
  slotTemplate: `
    <template #before-option>
      🤘
    </template>
  `,
};

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
      <UIcon name="star" color="green" />
    </template>
  `,
};

export const iconRightSlot = DefaultTemplate.bind({});
iconRightSlot.args = {
  slotTemplate: `
    <template #icon-right>
      <UIcon name="star" color="green" />
    </template>
  `,
};

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      🤘
    </template>
  `,
};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      🤘
    </template>
  `,
};
