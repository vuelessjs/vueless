import { ref, computed } from "vue";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import USelect from "../../ui.form-select/USelect.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULink from "../../ui.button-link/ULink.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface USelectArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "openDirection" | "labelAlign";
}

interface SelectOption {
  id: string | number;
  label: string;
  badge?: string;
}

export default {
  id: "3080",
  title: "Form Inputs & Controls / Select",
  component: USelect,
  args: {
    label: "Choose a city",
    modelValue: null,
    options: [
      { label: "New York", id: "1" },
      { label: "Los Angeles", id: "2" },
      { label: "Chicago", id: "3" },
      { label: "Houston", id: "4" },
      { label: "San Francisco", id: "5" },
    ],
  },
  argTypes: {
    ...getArgTypes(USelect.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(USelect.__name),
      story: {
        height: "300px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<USelectArgs> = (args: USelectArgs) => ({
  components: { USelect, UIcon, UBadge, ULink, UAvatar },
  setup() {
    function getSelectedBadge(options: SelectOption[], currentValue: string | number) {
      return options?.find((option) => option.id === currentValue);
    }

    const slots = getSlotNames(USelect.__name);
    const errorMessage = computed(() => (!args.modelValue ? args.error : ""));
    const showAlert = (message: string) => alert(message);

    return { args, slots, getSelectedBadge, errorMessage, showAlert };
  },
  template: `
    <USelect
      v-bind="args"
      v-model="args.modelValue"
      :error="errorMessage"
      class="max-w-96"
      @add="showAlert('You triggered the add action!')"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </USelect>
  `,
});

const EnumVariantTemplate: StoryFn<USelectArgs> = (args: USelectArgs, { argTypes }) => ({
  components: { USelect, UCol },
  setup() {
    let filteredOptions = argTypes?.[args.enum]?.options;

    if (args.enum === "labelAlign") {
      filteredOptions = argTypes?.[args.enum]?.options?.filter(
        (item) => item !== "right" && item !== "topWithDesc",
      );
    }

    return { args, filteredOptions };
  },
  template: `
    <UCol>
      <USelect
        v-for="(option, index) in filteredOptions"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
        :description="option"
        class="max-w-96"
      />
    </UCol>
  `,
});

const GroupValuesTemplate: StoryFn<USelectArgs> = (args: USelectArgs) => ({
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

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "Start typing to search for a city..." };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "You can only select a city from the list." };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Please select a city from the list" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", multiple: true, modelValue: [] };

export const LargeItemList = DefaultTemplate.bind({});
LargeItemList.args = {
  options: [...new Array(1000)].map((_, index) => {
    return { id: index + 1, label: `value ${index + 1}`, badge: "badge" };
  }),
};

export const Multiple = DefaultTemplate.bind({});
Multiple.args = { multiple: true, modelValue: [] };

export const ClearableAndSearchable = DefaultTemplate.bind({});
ClearableAndSearchable.args = { clearable: false, searchable: false };
ClearableAndSearchable.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "The `clearable` and `searchable` props control whether users can clear the selected value or search within the list. <br/> In this example, both are set to `false`, meaning the selection cannot be cleared, and searching is disabled.",
    },
  },
};

export const OpenDirection = EnumVariantTemplate.bind({});
OpenDirection.args = { enum: "openDirection" };

export const GroupValue = GroupValuesTemplate.bind({});
GroupValue.args = {
  modelValue: "",
  groupValueKey: "libs",
  groupLabelKey: "language",
  labelKey: "name",
  valueKey: "name",
  // TODO: Implement recursion nesting and add ability to use group (nested) options with default options.
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

export const OptionsLimit2 = DefaultTemplate.bind({});
OptionsLimit2.args = { optionsLimit: 2 };
OptionsLimit2.parameters = {
  docs: {
    description: {
      story: "`optionsLimit` prop controls the number of options displayed in the dropdown.",
    },
  },
};

export const VisibleOptions = DefaultTemplate.bind({});
VisibleOptions.args = { visibleOptions: 3 };
VisibleOptions.parameters = {
  docs: {
    description: {
      story: "`visibleOptions` prop controls the number of options you can see without a scroll.",
    },
  },
};

export const AddOption = DefaultTemplate.bind({});
AddOption.args = { addOption: true };
AddOption.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "The `addOption` prop displays an 'Add option' button, while the `add` event allows handling custom functionality when the button is clicked.",
    },
  },
};

export const OptionSettings = DefaultTemplate.bind({});
OptionSettings.args = {
  options: [
    { label: "1. New York", id: "1" },
    { label: "2. Los Angeles", id: "2", isHidden: true },
    {
      label: "3. Chicago",
      id: "3",
      onClick: (option) =>
        alert("onClick function for the third option: " + JSON.stringify(option)),
    },
    { label: "4. Houston", id: "4" },
    { label: "5. San Francisco", id: "5" },
  ],
};
OptionSettings.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "The second option of the array is hidden (`isHidden` object property is set to `true`). <br/> The third option has `onClick` event handler: <br/> `onClick: (option: Option) => alert('onClick function for option 3: ' + JSON.stringify(option))`",
    },
  },
};

export const IconProps: StoryFn<USelectArgs> = (args) => ({
  components: { USelect, URow },
  setup() {
    const levelOptions = [
      { label: "Awesome", id: "1" },
      { label: "Good", id: "2" },
      { label: "Could be better", id: "3" },
      { label: "I didn't like your services", id: "4" },
    ];

    const roleOptions = [
      { label: "Admin", id: "1" },
      { label: "CEO", id: "2" },
      { label: "Manager", id: "3" },
      { label: "Guest", id: "4" },
    ];

    return { args, levelOptions, roleOptions };
  },
  template: `
    <URow no-mobile>
      <USelect
        left-icon="feedback"
        label="Choose the level of our services"
        placeholder="Share your feedback with us"
        :options="levelOptions"
      />
      <USelect
        right-icon="person"
        label="Select your role"
        placeholder="Choose a role from the list"
        :options="roleOptions"
      />
    </URow>
  `,
});

export const Slots: StoryFn<USelectArgs> = (args) => ({
  components: { USelect, UCol, URow, ULink, UBadge, UAvatar },
  setup() {
    const clearModel = ref(null);
    const clearMultipleModel = ref([]);
    const beforeToggleModel = ref(null);
    const afterToggleModel = ref(null);
    const leftModel = ref(null);
    const rightModel = ref(null);

    return {
      args,
      clearModel,
      clearMultipleModel,
      beforeToggleModel,
      afterToggleModel,
      leftModel,
      rightModel,
    };
  },
  template: `
    <UCol no-mobile>
      <USelect v-bind="args" v-model="args.clearModel" label="Slot clear">
        <template #clear>
          <ULink label="Close" />
        </template>
      </USelect>

      <USelect
        v-bind="args"
        v-model="args.clearMultipleModel"
        multiple
        label="Slot clear-multiple"
      >
        <template #clear-multiple>
          <ULink label="Close" color="green" />
        </template>
      </USelect>

      <URow no-mobile>
        <USelect v-bind="args" v-model="args.beforeToggleModel" label="Slot before-toggle">
          <template #before-toggle>
            <UAvatar />
          </template>
        </USelect>

        <USelect
          v-bind="args"
          v-model="args.afterToggleModel"
          :config="{ afterToggle: 'pt-0 items-center' }"
          label="Slot after-toggle"
        >
          <template #after-toggle>
            <UAvatar />
          </template>
        </USelect>
      </URow>

      <URow no-mobile>
        <USelect v-bind="args" v-model="args.leftModel" label="Slot left">
          <template #left>
            <UAvatar />
          </template>
        </USelect>

        <USelect v-bind="args" v-model="args.rightModel" label="Slot right">
          <template #right>
            <UAvatar />
          </template>
        </USelect>
      </URow>
    </UCol>
  `,
});
Slots.parameters = {
  docs: {
    story: {
      height: "500px",
    },
  },
};

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

export const SlotSelectedValueLabel = DefaultTemplate.bind({});
SlotSelectedValueLabel.args = {
  slotTemplate: `
    <template #selected-label="{ selectedLabel }">
      <UBadge :label="selectedLabel" color="green" />
    </template>
  `,
};

export const SlotSelectedValueLabelAfter = DefaultTemplate.bind({});
SlotSelectedValueLabelAfter.args = {
  options: [
    { label: "Venice", id: "1", icon: "sailing", color: "green" },
    { label: "Paris", id: "2", icon: "flight", color: "orange" },
  ],
  slotTemplate: `
    <template #selected-label-after="{ option }">
      <UIcon
        :name="option.icon"
        :color="option.color"
        size="xs"
        class="ml-1"
      />
    </template>
  `,
};

export const SlotBeforeOption = DefaultTemplate.bind({});
SlotBeforeOption.args = {
  slotTemplate: `
    <template #before-option="{ option, index }">
      <UBadge v-if="index === 3" label="Special offer!" color="blue" class="mr-1" />
    </template>
  `,
};

export const SlotOption = DefaultTemplate.bind({});
SlotOption.args = {
  slotTemplate: `
    <template #option="{ option, index }">
      <UBadge v-if="index === 1" :label="option.label" />
    </template>
  `,
};

export const SlotAfterOption = DefaultTemplate.bind({});
SlotAfterOption.args = {
  slotTemplate: `
    <template #after-option="{ option, index }">
      <UBadge v-if="index === 2" label="Special offer!" color="blue" class="ml-1" />
    </template>
  `,
};
