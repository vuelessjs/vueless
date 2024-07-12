import { ref } from "vue";
import { getArgTypes, getSlotNames } from "../service.storybook";

import USelect from "../ui.form-select";
import URow from "../ui.container-row";
import UBadge from "../ui.text-badge";

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

const ReactivePropsTemplate = (args) => ({
  components: { USelect },
  setup() {
    const testSize = ref("sm");

    function testFunc() {
      testSize.value = "lg";
    }

    return { args, testFunc, testSize };
  },
  template: `
    <button
      @click="testFunc"
      class="border-2 border-solid border-red-400 rounded p-2 mb-2"
    >
      Reactivity test button
    </button>

    <USelect v-bind="args" v-model="args.modelValue" :size="testSize" />
  `,
});

const multipleTemplate = (args) => ({
  components: { USelect },
  setup() {
    const slots = getSlotNames(USelect.name);

    return { args, slots };
  },
  template: `
    <USelect v-bind="args" multiple v-model="args.modelValue">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </USelect>
  `,
});

const OpenDirectionsTemplate = (args, { argTypes } = {}) => ({
  components: { USelect, URow },
  setup() {
    return {
      args,
      openDirections: argTypes.openDirection.options,
    };
  },
  template: `
    <div class="flex flex-col gap-6">
      <URow>
        <USelect
          v-for="(openDirection, index) in openDirections"
          :key="index"
          v-bind="args"
          :open-direction="openDirection"
          :label="openDirection"
          v-model="args.modelValue"
        />
      </URow>
      <URow>
        <USelect
          v-for="(openDirection, index) in openDirections"
          :key="index"
          v-bind="args"
          :open-direction="openDirection"
          v-model="args.modelValue"
          label=""
        />
      </URow>
    </div>
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
      label="Single"
      v-model="args.modelValue"
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

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { USelect, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <div class="flex flex-col gap-6">
      <URow>
        <USelect
          v-for="(size, index) in sizes"
          v-bind="args"
          :key="index"
          :size="size"
          :label="size"
          v-model="args.modelValue"
        />
        </URow>
      <URow>
        <USelect
          v-for="(size, index) in sizes"
          v-bind="args"
          :key="index"
          :size="size"
          :label="size"
          label-outside
          v-model="args.modelValue"
        />
      </URow>
      <URow>
        <USelect
          v-for="(size, index) in sizes"
          v-bind="args"
          :key="index"
          :label="size"
          :size="size"
          multiple
          v-model="args.multipleModelValue"
        />
      </URow>
    </div>
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

const BadgeTemplate = (args) => ({
  components: { USelect, UBadge },
  setup() {
    return { args };
  },
  methods: {
    getSelectedBadge(options, currentValue) {
      return options?.find((option) => option.id === currentValue);
    },
  },
  template: `
    <USelect
      v-bind="args"
      v-model="args.modelValue"
    >
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
    </USelect>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const reactiveProps = ReactivePropsTemplate.bind({});
reactiveProps.args = {};

export const Multiple = multipleTemplate.bind({});
Multiple.args = { modelValue: [] };

export const openDirection = OpenDirectionsTemplate.bind({});
openDirection.args = {};

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

export const sizes = SizesTemplate.bind({});
sizes.args = { multipleModelValue: [] };

export const slotSelectedValueLabel = SlotTemplate.bind({});
slotSelectedValueLabel.args = {
  slotTemplate: `
    <template #selected-label>
       🤘🤘🤘
    </template>
  `,
};

export const slotSelectedValueLabelAfter = SlotTemplate.bind({});
slotSelectedValueLabelAfter.args = {
  slotTemplate: `
    <template #selected-label-after>
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

export const slotAfterCaret = BadgeTemplate.bind({});
slotAfterCaret.args = {};

export const slotBeforeCaret = SlotTemplate.bind({});
slotBeforeCaret.args = {
  slotTemplate: `
    <template #before-caret>
       🤘
    </template>
  `,
};

export const slotLeft = SlotTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
       🤘
    </template>
  `,
};

export const slotBeforeOption = SlotTemplate.bind({});
slotBeforeOption.args = {
  slotTemplate: `
    <template #before-option>
       🤘
    </template>
  `,
};
