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
  enum: keyof Pick<Props, "size">;
}

export default {
  id: "2050",
  title: "Dropdowns / Dropdown List",
  component: UDropdownList,
  args: {
    options: [
      { label: "option 1", id: "1" },
      { label: "option 2", id: "2" },
      { label: "option 3", id: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownList.__name),
  },
  parameters: {
    docs: {
      story: {
        height: "180px",
      },
    },
    ...getDocsDescription(UDropdownList.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownListArgs> = (args: DefaultUDropdownListArgs) => ({
  components: { UDropdownList },
  setup() {
    const slots = getSlotNames(UDropdownList.__name);

    return { args, slots };
  },
  template: `
    <UDropdownList v-bind="args" class="mx-4 w-[24rem]">
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
    <div class="flex flex-col gap-6">
      <URow>
        <UDropdownList
          v-for="(option, index) in options"
          :key="index"
          v-bind="args"
          :[args.enum]="option"
        />
      </URow>
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const VisibleOptions = DefaultTemplate.bind({});
VisibleOptions.args = { visibleOptions: 3 };

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

export const OptionSettings = DefaultTemplate.bind({});
OptionSettings.args = {
  options: [
    { label: "option 1", id: "1" },
    { label: "option 2", id: "2", isHidden: true },
    {
      label: "option 3",
      id: "3",
      onClick: (option: Option) => alert("onClick option 3 " + JSON.stringify(option)),
    },
  ],
};
