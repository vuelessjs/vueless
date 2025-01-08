import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDropdownButton from "../../ui.dropdown-button/UDropdownButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface DefaultUDropdownButtonArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownButtonArgs extends DefaultUDropdownButtonArgs {
  enum: keyof Pick<Props, "size" | "variant">;
}

export default {
  id: "2010",
  title: "Dropdowns / Dropdown Button",
  component: UDropdownButton,
  args: {
    label: "Dropdown",
    options: [{ label: "option 1" }, { label: "option 2" }, { label: "option 3" }],
  },
  argTypes: {
    ...getArgTypes(UDropdownButton.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDropdownButton.__name),
      story: {
        height: "250px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownButtonArgs> = (
  args: DefaultUDropdownButtonArgs,
) => ({
  components: { UDropdownButton, UIcon },
  setup() {
    const slots = getSlotNames(UDropdownButton.__name);

    return { args, slots };
  },
  template: `
    <UDropdownButton v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownButton>
  `,
});

const EnumVariantTemplate: StoryFn<EnumUDropdownButtonArgs> = (
  args: EnumUDropdownButtonArgs,
  { argTypes },
) => ({
  components: { UDropdownButton, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum]?.options,
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

const VariantColorsTemplate: StoryFn<EnumUDropdownButtonArgs> = (
  args: EnumUDropdownButtonArgs,
  { argTypes },
) => ({
  components: { UDropdownButton, URow, UCol },
  setup() {
    return {
      args,
      variants: argTypes.variant?.options,
      colors: argTypes.color?.options,
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
Variants.args = { enum: "variant" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const VariantColors = VariantColorsTemplate.bind({});
VariantColors.args = {};

export const WithoutDropdownIcon = EnumVariantTemplate.bind({});
WithoutDropdownIcon.args = { enum: "variant", noIcon: true };

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <template #default>
      <UIcon name="unfold_more" color="white" />
    </template>
  `,
  noIcon: true,
};

export const Slots: StoryFn<DefaultUDropdownButtonArgs> = (args) => ({
  components: { UDropdownButton, UIcon, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UDropdownButton label="Add to favorites">
        <template #left>
          <UIcon
            name="heart_plus"
            size="sm"
            color="green"
          />
        </template>
      </UDropdownButton>

      <UDropdownButton label="Settings">
        <template #toggle="{ opened }">
          <UIcon
            :name="opened ? 'expand_circle_up' : 'expand_circle_down'"
            color="green"
          />
        </template>
      </UDropdownButton>
    </URow>
  `,
});
