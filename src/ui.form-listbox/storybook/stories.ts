import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UListbox from "../UListbox.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UText from "../../ui.text-block/UText.vue";
import ULoader from "../../ui.loader/ULoader.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Option, Props } from "../types";

import johnDoe from "../../ui.form-select/storybook/assets/images/john-doe.png";
import emilyDavis from "../../ui.form-select/storybook/assets/images/emily-davis.png";
import alexJohnson from "../../ui.form-select/storybook/assets/images/alex-johnson.png";
import patMorgan from "../../ui.form-select/storybook/assets/images/pat-morgan.png";

interface DefaultUListboxArgs extends Props {
  slotTemplate?: string;
}

interface EnumUListboxArgs extends DefaultUListboxArgs {
  enum: keyof Pick<Props, "size" | "color">;
}

export default {
  id: "3090",
  title: "Form Inputs & Controls / Listbox",
  component: UListbox,
  args: {
    options: [
      { label: "New York", value: 1 },
      { label: "Los Angeles", value: 2 },
      { label: "Chicago", value: 3 },
      { label: "Houston", value: 4 },
      { label: "San Francisco", value: 5 },
    ],
  },
  argTypes: {
    ...getArgTypes(UListbox.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UListbox.__name),
      story: {
        height: "300px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUListboxArgs> = (args: DefaultUListboxArgs) => ({
  components: { UListbox, ULoader, UText, URow },
  setup: () => ({ args, slots: getSlotNames(UListbox.__name) }),
  template: `
    <UListbox
      v-bind="args"
      v-model="args.modelValue"
      class="mx-4 w-[24rem]"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UListbox>
  `,
});

const EnumTemplate: StoryFn<EnumUListboxArgs> = (args: EnumUListboxArgs, { argTypes }) => ({
  components: { UListbox, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow class="w-fit">
      <UListbox
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        v-model="args.modelValue"
        class="static w-36"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Searchable = DefaultTemplate.bind({});
Searchable.args = { searchable: true };

export const SearchModelValue = DefaultTemplate.bind({});
SearchModelValue.args = { search: "New York", searchable: true };

export const Multiple = DefaultTemplate.bind({});
Multiple.args = { multiple: true, modelValue: [] };

export const AddOption: StoryFn<DefaultUListboxArgs> = (args: DefaultUListboxArgs) => ({
  components: { UListbox },
  setup() {
    const showAlert = (message: string) => alert(message);

    return { args, showAlert };
  },
  template: `
    <UListbox
      v-bind="args"
      v-model="args.modelValue"
      class="mx-4 w-[24rem]"
      @add="showAlert('You triggered the add action!')"
    />
  `,
});
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

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const VisibleOptions = DefaultTemplate.bind({});
VisibleOptions.args = { visibleOptions: 3 };
VisibleOptions.parameters = {
  docs: {
    description: {
      story: "`visibleOptions` prop regulates number of options to show without a scroll.",
    },
  },
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const WithoutOptions = DefaultTemplate.bind({});
WithoutOptions.args = { options: [] };

export const GroupedOptions = DefaultTemplate.bind({});
GroupedOptions.args = {
  labelKey: "name",
  valueKey: "name",
  options: [
    { groupLabel: "Javascript" },
    { name: "Vue.js" },
    { name: "Adonis" },
    { groupLabel: "Ruby" },
    { name: "Frameworks", isSubGroup: true, level: 2 },
    { name: "Rails", level: 2 },
    { name: "Sinatra", level: 2 },
    { groupLabel: "Other" },
    { name: "Laravel" },
    { name: "Phoenix" },
  ],
};
GroupedOptions.parameters = {
  docs: {
    story: {
      height: "500px",
    },
  },
};

export const Divider = DefaultTemplate.bind({});
Divider.args = {
  options: [
    { label: "North America", value: "1" },
    { label: "South America", value: "2" },
    { divider: true },
    { label: "Europe", value: "3" },
    { divider: true },
    { label: "Asia", value: "4" },
  ],
};
Divider.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "In addition to grouping options, you can insert a divider between specific items by adding an object with a single `divider: true` property.",
    },
  },
};

export const OptionSettings = DefaultTemplate.bind({});
OptionSettings.args = {
  multiple: true,
  options: [
    { label: "New York", value: "1", disabled: true },
    { label: "Kyiv", value: "2", disabled: true },
    { label: "Los Angeles", value: "3", isHidden: true },
    {
      label: "Chicago",
      value: "4",
      onClick: (option: Option) =>
        alert("onClick function for the third option: " + JSON.stringify(option)),
    },
  ],
  modelValue: ["1"],
};
OptionSettings.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "The first option of the array is disabled (`disabled` object property is set to `true`). The second option is hidden (`isHidden` object property is set to `true`). <br/> The third option has `onClick` event handler: <br/> `onClick: (option: Option) => alert('onClick function for option 3: ' + JSON.stringify(option))`",
    },
  },
};

export const EmptySlot = DefaultTemplate.bind({});
EmptySlot.args = {
  options: [],
  slotTemplate: `
    <template #empty>
      <URow align="center">
        <ULoader loading size="sm" />
        <UText label="Loading, this may take a while..." />
      </URow>
    </template>
  `,
};

export const OptionSlots: StoryFn<DefaultUListboxArgs> = (args) => ({
  components: { UListbox, URow, UCol, UAvatar, UIcon, UBadge, UText },
  setup: () => ({ args, johnDoe, emilyDavis, alexJohnson, patMorgan }),
  template: `
    <URow gap="lg">
      <UListbox
        v-model="args.beforeOptionModel"
        class="static"
        :options="[
          {
            label: 'John Doe',
            value: '1',
            role: 'Developer',
            avatar: johnDoe,
            status: 'online',
            statusColor: 'success',
          },
          {
            label: 'Jane Smith',
            value: '2',
            role: 'Designer',
            avatar: emilyDavis,
            status: 'away',
            statusColor: 'warning',
          },
          {
            label: 'Mike Johnson',
            value: '3',
            role: 'Product Manager',
            avatar: alexJohnson,
            status: 'offline',
            statusColor: 'grayscale',
          },
          {
            label: 'Sarah Wilson',
            value: '4',
            role: 'QA Engineer',
            avatar: patMorgan,
            status: 'online',
            statusColor: 'success',
          },
        ]"
      >
        <template #before-option="{ option }">
          <UAvatar :src="option.avatar" size="sm" />
        </template>
      </UListbox>

      <UListbox
        v-model="args.optionModel"
        class="static"
        :options="[
          {
            label: 'John Doe',
            value: '1',
            role: 'Developer',
            avatar: johnDoe,
            status: 'online',
            statusColor: 'success',
          },
          {
            label: 'Jane Smith',
            value: '2',
            role: 'Designer',
            avatar: emilyDavis,
            status: 'away',
            statusColor: 'warning',
          },
          {
            label: 'Mike Johnson',
            value: '3',
            role: 'Product Manager',
            avatar: alexJohnson,
            status: 'offline',
            statusColor: 'grayscale',
          },
          {
            label: 'Sarah Wilson',
            value: '4',
            role: 'QA Engineer',
            avatar: patMorgan,
            status: 'online',
            statusColor: 'success',
          },
        ]"
      >
        <template #option="{ option }">
          <URow align="center" gap="xs">
            <UCol gap="none">
              <UText size="sm">{{ option.label }}</UText>
              <UText variant="lifted" size="xs">{{ option.role }}</UText>
            </UCol>
            <UBadge
              :label="option.status"
              :color="option.statusColor"
              size="sm"
              variant="subtle"
            />
          </URow>
        </template>
      </UListbox>

      <UListbox
        v-model="args.afterOptionModel"
        class="static"
        :options="[
          {
            label: 'John Doe',
            value: '1',
            role: 'Developer',
            avatar: johnDoe,
            status: 'online',
            statusColor: 'success',
          },
          {
            label: 'Jane Smith',
            value: '2',
            role: 'Designer',
            avatar: emilyDavis,
            status: 'away',
            statusColor: 'warning',
          },
          {
            label: 'Mike Johnson',
            value: '3',
            role: 'Product Manager',
            avatar: alexJohnson,
            status: 'offline',
            statusColor: 'grayscale',
          },
          {
            label: 'Sarah Wilson',
            value: '4',
            role: 'QA Engineer',
            avatar: patMorgan,
            status: 'online',
            statusColor: 'success',
          },
        ]"
      >
        <template #after-option="{ option }">
          <UBadge
            :label="option.status"
            :color="option.statusColor"
            size="sm"
            variant="subtle"
          />
        </template>
      </UListbox>
    </URow>
  `,
});
OptionSlots.parameters = {
  docs: {
    story: {
      height: "300px",
    },
  },
};
