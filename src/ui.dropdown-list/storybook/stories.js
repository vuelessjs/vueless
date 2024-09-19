import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UDropdownList from "../../ui.dropdown-list/UDropdownList.vue";
import URow from "../../ui.container-row/URow.vue";

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
};

const DefaultTemplate = (args) => ({
  components: { UDropdownList },
  setup() {
    const slots = getSlotNames(UDropdownList.__name);

    return { args, slots };
  },
  template: `
    <UDropdownList v-bind="args" class="mx-4 w-[24rem]">
      ${args.slotTemplate || getSlotsFragment()}
    </UDropdownList>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownList, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
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
    // eslint-disable-next-line no-console
    { label: "option 3", id: "3", onClick: (option) => console.log("onClick option 3 ", option) },
  ],
};
