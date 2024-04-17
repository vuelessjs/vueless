import { getArgTypes, getSlotNames } from "../service.storybook";

import UDropdownButton from "../ui.dropdown-button";
import UDropdownItem from "../ui.dropdown-item";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";

export default {
  id: "2010",
  title: "Dropdowns / Dropdown Button",
  component: UDropdownButton,
  args: {
    label: "Dropdown",
    options: [
      { label: "option 1", value: "1" },
      { label: "option 2", value: "2" },
      { label: "option 3", value: "3" },
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
  components: { UDropdownButton },
  setup() {
    const slots = getSlotNames(UDropdownButton.name);

    return { args, slots };
  },
  template: `
    <UDropdownButton
      v-bind="args"
    >
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UDropdownButton>
  `,
});

const SlotTemplate = (args) => ({
  components: { UDropdownButton, UDropdownItem },
  setup() {
    return { args };
  },
  template: `
    <UDropdownButton
      v-bind="args"
    >
      ${args.slotTemplate}
    </UDropdownButton>
  `,
});

const VariantsTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownButton, URow },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
    };
  },
  template: `
    <URow>
      <UDropdownButton
        v-for="(variant, index) in variants"
        v-bind="args"
        :variant="variant"
        :label="variant"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownButton, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UDropdownButton
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :label="size"
        :key="index"
      />
    </URow>
  `,
});

const VariantColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UDropdownButton, URow, UGroup },
  setup() {
    return {
      args,
      variants: argTypes.variant.options,
      colors: argTypes.color.options,
    };
  },
  template: `
    <UGroup>
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
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Filled = DefaultTemplate.bind({});
Filled.args = { variant: "thirdary", filled: true };

export const Variants = VariantsTemplate.bind({});
Variants.args = { text: "" };

export const Sizes = SizesTemplate.bind({});
Sizes.args = { text: "" };

export const VariantColors = VariantColorsTemplate.bind({});
VariantColors.args = { text: "" };

export const WithoutDropdownIcon = VariantsTemplate.bind({});
WithoutDropdownIcon.args = { noIcon: true };

export const dropdownListSlot = SlotTemplate.bind({});
dropdownListSlot.args = {
  slotTemplate: `
    <template #default>
      <UDropdownItem label="Some option" />
      <UDropdownItem label="Some option 2" />
      <UDropdownItem label="Some option 3" />
    </template>
  `,
};
