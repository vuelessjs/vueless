import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import USelect from "../../ui.form-select/USelect.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULink from "../../ui.button-link/ULink.vue";

/**
 * The `USelect` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-select)
 */
export default {
  id: "3080",
  title: "Form Inputs & Controls / Select",
  component: USelect,
  args: {
    label: "Label",
    modelValue: null,
    options: [
      { id: 1, label: "value 1", badge: "10%" },
      { id: 2, label: "value 2", badge: "20%" },
      { id: 3, label: "value 3", badge: "30%" },
      { id: 4, label: "value 4", badge: "40%" },
    ],
  },
  argTypes: {
    ...getArgTypes(USelect.__name),
    modelValue: { control: { type: "number" } },
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

    const slots = getSlotNames(USelect.__name);

    return { args, slots, getSelectedBadge };
  },
  template: `
    <USelect v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment()}
    </USelect>
  `,
});

const EnumVariantTemplate = (args, { argTypes }) => ({
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

export const OpenDirection = EnumVariantTemplate.bind({});
OpenDirection.args = { enum: "openDirection" };

export const GroupValue = GroupValuesTemplate.bind({});
GroupValue.args = {
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

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "some error text" };

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "some placeholder text" };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "some description text" };

export const OptionsLimit2 = DefaultTemplate.bind({});
OptionsLimit2.args = { optionsLimit: 2 };

export const NoClear = DefaultTemplate.bind({});
NoClear.args = { noClear: true };

export const AddOption = DefaultTemplate.bind({});
AddOption.args = { addOption: true };

export const OptionIsHidden = DefaultTemplate.bind({});
OptionIsHidden.args = {
  options: [
    { id: 1, label: "value 1", isHidden: true },
    { id: 2, label: "value 2" },
    { id: 3, label: "value 3" },
    { id: 4, label: "value 4" },
  ],
};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", multiple: true, multipleModelValue: [] };

export const SlotToggle = DefaultTemplate.bind({});
SlotToggle.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <UIcon
        name="expand_circle_down"
        :class="{ 'rotate-180': opened }"
      />
    </template>
  `,
};

export const SlotClear = DefaultTemplate.bind({});
SlotClear.args = {
  slotTemplate: `
    <template #clear>
      <ULink label="Close" />
    </template>
  `,
};

export const SlotClearMultiple = DefaultTemplate.bind({});
SlotClearMultiple.args = {
  multiple: true,
  modelValue: [],
  slotTemplate: `
    <template #clear-multiple>
      <ULink label="Close" />
    </template>
  `,
};

export const SlotSelectedValueLabel = DefaultTemplate.bind({});
SlotSelectedValueLabel.args = {
  slotTemplate: `
    <template #selected-label>
      🤘🤘🤘
    </template>
  `,
};

export const SlotSelectedValueLabelAfter = DefaultTemplate.bind({});
SlotSelectedValueLabelAfter.args = {
  slotTemplate: `
    <template #selected-label-after>
      🤘🤘🤘
    </template>
  `,
};

export const SlotOption = DefaultTemplate.bind({});
SlotOption.args = {
  slotTemplate: `
    <template #option>
      🤘🤘🤘
    </template>
  `,
};

export const SlotAfterCaret = DefaultTemplate.bind({});
SlotAfterCaret.args = {
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

export const SlotBeforeCaret = DefaultTemplate.bind({});
SlotBeforeCaret.args = {
  slotTemplate: `
    <template #before-caret>
      🤘
    </template>
  `,
};

export const SlotBeforeOption = DefaultTemplate.bind({});
SlotBeforeOption.args = {
  slotTemplate: `
    <template #before-option>
      🤘
    </template>
  `,
};

export const LeftIcon = DefaultTemplate.bind({});
LeftIcon.args = { leftIcon: "star" };

export const RightIcon = DefaultTemplate.bind({});
RightIcon.args = { rightIcon: "star" };

export const LeftIconSlot = DefaultTemplate.bind({});
LeftIconSlot.args = {
  slotTemplate: `
    <template #left-icon>
      <UIcon name="star" color="green" />
    </template>
  `,
};

export const RightIconSlot = DefaultTemplate.bind({});
RightIconSlot.args = {
  slotTemplate: `
    <template #right-icon>
      <UIcon name="star" color="green" />
    </template>
  `,
};

export const SlotLeft = DefaultTemplate.bind({});
SlotLeft.args = {
  slotTemplate: `
    <template #left>
      🤘
    </template>
  `,
};

export const SlotRight = DefaultTemplate.bind({});
SlotRight.args = {
  slotTemplate: `
    <template #right>
      🤘
    </template>
  `,
};
