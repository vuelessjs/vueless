import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UDropdownList from "../../ui.dropdown-list/UDropdownList.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UDropdownListProps } from "../types.ts";

interface UDropdownListArgs extends UDropdownListProps {
  slotTemplate?: string;
  enum: "size";
  maxHeight: number;
}

/**
 * The `UDropdownList` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.dropdown-list)
 */
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
  },
} as Meta;

const DefaultTemplate: StoryFn<UDropdownListArgs> = (args: UDropdownListArgs) => ({
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

const EnumVariantTemplate: StoryFn<UDropdownListArgs> = (
  args: UDropdownListArgs,
  { argTypes },
) => ({
  components: { UDropdownList, URow },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
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

export const MaxHeight = DefaultTemplate.bind({});
MaxHeight.args = { maxHeight: 80 };

export const WithoutOptions = DefaultTemplate.bind({});
WithoutOptions.args = { options: [] };

export const OptionSettings = DefaultTemplate.bind({});
OptionSettings.args = {
  options: [
    { label: "option 1", id: "1" },
    { label: "option 2", id: "2", isHidden: true },

    {
      label: "option 3",
      id: "3",
      // eslint-disable-next-line no-console
      onClick: (option: object) => console.log("onClick option 3 ", option),
    },
  ],
};
