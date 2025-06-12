import { ref, computed } from "vue";
import {
  getArgs,
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

import johnDoe from "./assets/images/john-doe.png";
import emilyDavis from "./assets/images/emily-davis.png";
import alexJohnson from "./assets/images/alex-johnson.png";
import patMorgan from "./assets/images/pat-morgan.png";

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
    const showAlert = (message: string) => alert(message);

    return { args, slots, getSelectedBadge, showAlert };
  },
  template: `
    <USelect
      v-bind="args"
      v-model="args.modelValue"
      class="max-w-96"
      @add="showAlert('You triggered the add action!')"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </USelect>
  `,
});

const EnumTemplate: StoryFn<USelectArgs> = (args: USelectArgs, { argTypes }) => ({
  components: { USelect, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <USelect
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
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
Default.parameters = {
  docs: {
    story: {
      height: "350px",
    },
  },
};

export const Placeholder = DefaultTemplate.bind({});
Placeholder.args = { placeholder: "Start typing to search for a city..." };

export const Description = DefaultTemplate.bind({});
Description.args = { description: "You can only select a city from the list." };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Please select a city from the list" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign", label: "{enumValue}" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", multiple: true, modelValue: [], label: "{enumValue}" };

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

export const OpenDirection = EnumTemplate.bind({});
OpenDirection.args = { enum: "openDirection", label: "{enumValue}" };

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
      { label: "Terrible", id: "4" },
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
    <URow>
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
  components: { USelect, UCol, URow, ULink, UBadge, UAvatar, UIcon },
  setup() {
    const leftModel = ref(null);
    const rightModel = ref(null);

    const paymentOptions = [
      { label: "Visa", id: "visa", icon: "credit_card", details: "•••• 4242" },
      { label: "PayPal", id: "paypal", icon: "payments", details: "user@example.com" },
      { label: "Bank Transfer", id: "bank", icon: "account_balance", details: "Acct **** 1234" },
      { label: "Apple Pay", id: "apple", icon: "phone_iphone", details: "iPhone 15" },
    ];

    const selectedLeftOption = computed(
      () => paymentOptions.find((option) => option.id === leftModel.value) || null,
    );

    const selectedRightOption = computed(
      () => paymentOptions.find((option) => option.id === rightModel.value) || null,
    );

    return { args, leftModel, rightModel, paymentOptions, selectedLeftOption, selectedRightOption };
  },
  template: `
    <URow>
      <USelect
        v-model="leftModel"
        label="Select Payment Method"
        :options="paymentOptions"
      >
        <template #left>
          <UIcon
            v-if="leftModel"
            :name="selectedLeftOption.icon"
            color="primary"
            size="sm"
          />
        </template>
      </USelect>

      <USelect
        v-model="rightModel"
        label="Select Payment Method"
        :options="paymentOptions"
      >
        <template #right>
          <span
            v-if="rightModel"
            class="text-small text-lifted text-nowrap"
          >
            {{ selectedRightOption.details }}
          </span>
        </template>
      </USelect>
    </URow>
  `,
});

export const ToggleSlots: StoryFn<USelectArgs> = (args) => ({
  components: { USelect, URow, UAvatar, UIcon },
  setup() {
    const beforeToggleModel = ref(null);
    const toggleModel = ref(null);
    const afterToggleModel = ref(null);

    return { args, beforeToggleModel, toggleModel, afterToggleModel };
  },
  template: `
    <URow>
      <USelect
        v-model="beforeToggleModel"
        label="Before Toggle Slot"
        :options="[
          { label: 'John Doe', id: '1' },
          { label: 'Jane Smith', id: '2' },
          { label: 'Mike Johnson', id: '3' },
        ]"
      >
        <template #before-toggle>
          <UIcon name="person" color="primary" />
        </template>
      </USelect>

      <USelect
        v-model="toggleModel"
        label="Toggle Slot"
        :options="[
          { label: 'High', id: 'high' },
          { label: 'Medium', id: 'medium' },
          { label: 'Low', id: 'low' }
        ]"
      >
        <template #toggle="{ opened }">
          <UIcon
            name="expand_circle_down"
            :class="{ 'rotate-180': opened }"
            color="primary"
          />
        </template>
      </USelect>

      <USelect
        v-model="afterToggleModel"
        label="After Toggle Slot"
        :options="[
          { label: 'In Progress', id: 'in_progress' },
          { label: 'Done', id: 'done' },
          { label: 'Blocked', id: 'blocked' }
        ]"
      >
        <template #after-toggle>
          <UIcon name="info" color="primary" />
        </template>
      </USelect>
    </URow>
  `,
});

export const ClearSlot = DefaultTemplate.bind({});
ClearSlot.args = {
  slotTemplate: `
    <template #clear="{ clear }">
      <ULink label="Clear" @click="clear" />
    </template>
  `,
};

export const SelectedOptionsSlots: StoryFn<USelectArgs> = (args) => ({
  components: { USelect, URow, UIcon },
  setup() {
    const options = [
      { label: "Paris", id: "1", icon: "flight" },
      { label: "Venice", id: "2", icon: "sailing" },
      { label: "Rome", id: "3", icon: "directions_car" },
      { label: "Milan", id: "4", icon: "directions_bike" },
    ];

    const selectedOption = ref(null);
    const selectedOptions = ref(null);

    return { args, selectedOption, selectedOptions, options };
  },
  template: `
    <URow>
      <USelect
        v-model="selectedOption"
        label="Selected option slot"
        :options="options"
      >
        <template #selected-option="{ option }">
          <URow align="center" gap="2xs">
            <span>{{ option.label }}</span>
            <UIcon
              :name="option.icon"
              size="2xs"
              color="success"
            />
          </URow>
        </template>
      </USelect>

      <USelect
        v-model="selectedOptions"
        label="Selected options slot"
        :options="options"
        multiple
      >
        <template #selected-options="{ options }">
          <URow
            v-for="(option, index) in options"
            :key="index"
            align="center"
            gap="2xs"
          >
            <span class="text-medium leading-none">{{ option.label }}</span>
            <UIcon
              :name="option.icon"
              size="2xs"
              color="success"
            />
            <UIcon
              v-if="index !== options.length - 1"
              name="east"
              size="2xs"
              class="mr-1"
            />
          </URow>
        </template>
      </USelect>
    </URow>
  `,
});
SelectedOptionsSlots.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "The `selected-option` and `selected-options` slots allow you to customize the selected option or options display. <br/> In this example, we've added an icon to the selected option and a separator between options in the `selected-options` slot.",
    },
  },
};

export const SelectedCounterSlot = DefaultTemplate.bind({});
SelectedCounterSlot.args = {
  multiple: true,
  slotTemplate: `
    <template #selected-counter="{ count, hiddenOptions }">
      <span v-if="count" :title="hiddenOptions">, and {{ count }} more variant(s)</span>
    </template>
  `,
};

export const OptionSlots: StoryFn<USelectArgs> = (args) => ({
  components: { USelect, URow, UCol, UAvatar, UIcon, UBadge },
  setup() {
    const beforeOptionModel = ref(null);
    const optionModel = ref(null);
    const afterOptionModel = ref(null);

    const options = [
      {
        label: "John Doe",
        id: "1",
        role: "Developer",
        avatar: johnDoe,
        status: "online",
      },
      {
        label: "Jane Smith",
        id: "2",
        role: "Designer",
        avatar: emilyDavis,
        status: "away",
      },
      {
        label: "Mike Johnson",
        id: "3",
        role: "Product Manager",
        avatar: alexJohnson,
        status: "offline",
      },
      {
        label: "Sarah Wilson",
        id: "4",
        role: "QA Engineer",
        avatar: patMorgan,
        status: "online",
      },
    ];

    return { args, beforeOptionModel, optionModel, afterOptionModel, options };
  },
  template: `
    <URow>
      <USelect
        v-model="beforeOptionModel"
        label="Before option slot"
        :options="options"
      >
        <template #before-option="{ option }">
          <UAvatar :src="option.avatar" size="sm" />
        </template>
      </USelect>

      <USelect
        v-model="optionModel"
        label="Option slot"
        :options="options"
      >
        <template #option="{ option }">
          <URow align="center" gap="2xs">
            <UAvatar :src="option.avatar" size="sm" />
            <UCol gap="none">
              <span class="text-small font-medium">{{ option.label }}</span>
              <span class="text-tiny text-lifted">{{ option.role }}</span>
            </UCol>
            <UBadge
              :label="option.status"
              :color="option.status === 'online' ? 'success' : option.status === 'away' ? 'warning' : 'grayscale'"
              size="sm"
            />
          </URow>
        </template>
      </USelect>

      <USelect
        v-model="afterOptionModel"
        label="After option slot"
        :options="options"
      >
        <template #after-option="{ option }">
          <UBadge
            :label="option.status"
            :color="option.status === 'online' ? 'success' : option.status === 'away' ? 'warning' : 'grayscale'"
          />
        </template>
      </USelect>
    </URow>
  `,
});
