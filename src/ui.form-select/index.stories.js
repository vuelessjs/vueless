import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import USelect from "../ui.form-select";
import URow from "../ui.container-row";
import UBadge from "../ui.text-badge";
import UIcon from "../ui.image-icon";
import ULink from "../ui.button-link";

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
  components: { USelect, UIcon, UBadge, ULink },
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

export const LargeItemList = DefaultTemplate.bind({});
LargeItemList.args = {
  options: [...new Array(1000)].map((_, index) => {
    return { id: index + 1, label: `value ${index + 1}`, badge: "badge" };
  }),
};

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

export const slotToggle = DefaultTemplate.bind({});
slotToggle.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <UIcon
        name="expand_circle_down"
        :class="{ 'rotate-180': opened }"
      />
    </template>
  `,
};

export const slotClear = DefaultTemplate.bind({});
slotClear.args = {
  slotTemplate: `
    <template #clear>
      <ULink label="Close" />
    </template>
  `,
};

export const slotClearMultiple = DefaultTemplate.bind({});
slotClearMultiple.args = {
  multiple: true,
  modelValue: [],
  slotTemplate: `
    <template #clear-multiple>
      <ULink label="Close" />
    </template>
  `,
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

export const leftIcon = DefaultTemplate.bind({});
leftIcon.args = {
  leftIcon: "star",
};

export const rightIcon = DefaultTemplate.bind({});
rightIcon.args = {
  rightIcon: "star",
};

export const leftIconSlot = DefaultTemplate.bind({});
leftIconSlot.args = {
  slotTemplate: `
    <template #left-icon>
      <UIcon name="star" color="green" />
    </template>
  `,
};

export const rightIconSlot = DefaultTemplate.bind({});
rightIconSlot.args = {
  slotTemplate: `
    <template #right-icon>
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
