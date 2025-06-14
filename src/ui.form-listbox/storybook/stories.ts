import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UListbox from "../UListbox.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Option, Props } from "../types.ts";

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
      { label: "New York", id: ["1"] },
      { label: "Los Angeles", id: ["2"] },
      { label: "Chicago", id: ["3"] },
      { label: "Houston", id: ["4"] },
      { label: "San Francisco", id: ["5"] },
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
  components: { UListbox },
  setup() {
    const slots = getSlotNames(UListbox.__name);

    const showAlert = (message: string) => alert(message);

    return { args, slots, showAlert };
  },
  template: `
    <UListbox
      v-bind="args"
      v-model="args.modelValue"
      class="mx-4 w-[24rem]"
      @add="showAlert('You triggered the add action!')"
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

export const Multiple = DefaultTemplate.bind({});
Multiple.args = { multiple: true, modelValue: [] };

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
  multiple: true,
  options: [
    { label: "New York", id: "1", disabled: true },
    { label: "Kyiv", id: "2", disabled: true },
    { label: "Los Angeles", id: "3", isHidden: true },
    {
      label: "Chicago",
      id: "4",
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
