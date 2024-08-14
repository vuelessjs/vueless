import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UDropdownButton from "../ui.dropdown-button";
import UDropdownItem from "../ui.dropdown-item";
import URow from "../ui.container-row";
import UCol from "../ui.container-col";

/**
 * The `UDropdownButton` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.dropdown-button)
 */
export default {
  id: "2010",
  title: "Dropdowns / Dropdown Button",
  component: UDropdownButton,
  args: {
    label: "Dropdown",
    options: [
      { label: "option 1", id: "1" },
      { label: "option 2", id: "2" },
      { label: "option 3", id: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UDropdownButton.name),
  },
  parameters: {
    docs: {
      story: {
        height: "200px",
      },
    },
  },
};

const DefaultTemplate = (args) => ({
  components: { UDropdownButton, UDropdownItem },
  setup() {
    const slots = getSlotNames(UDropdownButton.name);

    return { args, slots };
  },
  template: `
    <UDropdownButton
      v-bind="args"
      v-model="args.modelValue"
    >
      ${args.slotTemplate || getSlotsFragment(args.defaultTemplate)}
    </UDropdownButton>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownButton, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow>
      <UDropdownButton
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
        :key="index"
      />
    </URow>
  `,
});

const VariantColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownButton, URow, UCol },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
      colors: argTypes.color.options,
    };
  },
  template: `
    <UCol>
      <URow v-for="(variant, index) in variants" :key="index">
        <UDropdownButton
          v-for="(color, idx) in colors"
          v-bind="args"
          :color="color"
          :variant="variant"
          :label="color"
          :key="idx"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Filled = DefaultTemplate.bind({});
Filled.args = { variant: "thirdary", filled: true };

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant", text: "" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size", text: "" };

export const VariantColors = VariantColorsTemplate.bind({});
VariantColors.args = { text: "" };

export const WithoutDropdownIcon = EnumVariantTemplate.bind({});
WithoutDropdownIcon.args = { enum: "variant", noIcon: true };

export const dropdownListSlot = DefaultTemplate.bind({});
dropdownListSlot.args = {
  slotTemplate: `
    <template #default>
      <UDropdownItem label="Some option" />
      <UDropdownItem label="Some option 2" />
      <UDropdownItem label="Some option 3" />
    </template>
  `,
};
