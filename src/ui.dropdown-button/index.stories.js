import { getArgTypes, getSlotNames, getSlotsFragment } from "../utils/utilstorybook";

import UDropdownButton from "../ui.dropdown-button";
import URow from "../ui.container-row";
import UCol from "../ui.container-col";
import UIcon from "../ui.image-icon";

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
  components: { UDropdownButton, UIcon },
  setup() {
    const slots = getSlotNames(UDropdownButton.name);

    return { args, slots };
  },
  template: `
    <UDropdownButton v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
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
          v-for="(color, index) in colors"
          :key="index"
          v-bind="args"
          :color="color"
          :variant="variant"
          :label="color"
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

export const defaultSlot = DefaultTemplate.bind({});
defaultSlot.args = {
  slotTemplate: `
    <template #default>
      Custom label
    </template>
  `,
};

export const leftSlot = DefaultTemplate.bind({});
leftSlot.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="archive"
        color="red"
        size="sm"
      />
    </template>
  `,
};

export const rightSlot = DefaultTemplate.bind({});
rightSlot.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        name="archive"
        color="red"
        size="sm"
      />
    </template>
  `,
};
