import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDropdownList from "../../ui.dropdown-list/UDropdownList.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Option, Props } from "../types.ts";

interface DefaultUDropdownListArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownListArgs extends DefaultUDropdownListArgs {
  enum: keyof Pick<Props, "size" | "color">;
}

export default {
  id: "2050",
  title: "Dropdowns / Dropdown List",
  component: UDropdownList,
  args: {
    options: [
      { label: "New York", id: "1" },
      { label: "Los Angeles", id: "2" },
      { label: "Chicago", id: "3" },
      { label: "Houston", id: "4" },
      { label: "San Francisco", id: "5" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownList.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDropdownList.__name),
      story: {
        height: "250px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownListArgs> = (args: DefaultUDropdownListArgs) => ({
  components: { UDropdownList },
  setup() {
    const slots = getSlotNames(UDropdownList.__name);

    const showAlert = (message: string) => alert(message);

    return { args, slots, showAlert };
  },
  template: `
    <UDropdownList
      v-bind="args"
      v-model="args.modelValue"
      class="mx-4 w-[24rem]"
      @add="showAlert('You triggered the add action!')"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownList>
  `,
});

const EnumVariantTemplate: StoryFn<EnumUDropdownListArgs> = (
  args: EnumUDropdownListArgs,
  { argTypes },
) => ({
  components: { UDropdownList, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum]?.options,
    };
  },
  template: `
      <URow class="w-fit">
        <UDropdownList
          v-for="(option, index) in options"
          :key="index"
          v-bind="args"
          :[args.enum]="option"
          class="static w-36"
        />
      </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

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

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color", modelValue: "2" };

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
    { label: "North America", id: "1" },
    { label: "South America", id: "2" },
    { divider: true },
    { label: "Europe", id: "3" },
    { divider: true },
    { label: "Asia", id: "4" },
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
  options: [
    { label: "New York", id: "1" },
    { label: "Los Angeles", id: "2", isHidden: true },
    {
      label: "Chicago",
      id: "3",
      onClick: (option: Option) =>
        alert("onClick function for the third option: " + JSON.stringify(option)),
    },
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
