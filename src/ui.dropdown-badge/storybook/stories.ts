import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UDropdownBadge from "../../ui.dropdown-badge/UDropdownBadge.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULink from "../../ui.button-link/ULink.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface DefaultUDropdownBadgeArgs extends Props {
  slotTemplate?: string;
}

interface EnumUDropdownBadgeArgs extends DefaultUDropdownBadgeArgs {
  enum: keyof Pick<Props, "color" | "size" | "variant" | "xPosition" | "yPosition">;
}

export default {
  id: "2020",
  title: "Dropdowns / Dropdown Badge",
  component: UDropdownBadge,
  args: {
    label: "Dropdown",
    options: [{ label: "option 1" }, { label: "option 2" }, { label: "option 3" }],
  },
  argTypes: {
    ...getArgTypes(UDropdownBadge.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDropdownBadge.__name),
      story: {
        height: "200px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<DefaultUDropdownBadgeArgs> = (args: DefaultUDropdownBadgeArgs) => ({
  components: { UDropdownBadge, UIcon, ULink },
  setup() {
    const slots = getSlotNames(UDropdownBadge.__name);

    return { args, slots };
  },
  template: `
    <UDropdownBadge
      v-bind="args"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UDropdownBadge>
  `,
});

const EnumVariantTemplate: StoryFn<EnumUDropdownBadgeArgs> = (
  args: EnumUDropdownBadgeArgs,
  { argTypes },
) => ({
  components: { UDropdownBadge, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <UDropdownBadge
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :label="option"
        :key="index"
      />
    </URow>
  `,
});

const VariantColorsTemplate: StoryFn<EnumUDropdownBadgeArgs> = (
  args: EnumUDropdownBadgeArgs,
  { argTypes },
) => ({
  components: { UDropdownBadge, URow, UCol },
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
        <UDropdownBadge
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

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const DropdownListXPosition = EnumVariantTemplate.bind({});
DropdownListXPosition.args = { enum: "xPosition" };

export const DropdownListYPosition = EnumVariantTemplate.bind({});
DropdownListYPosition.args = { enum: "yPosition" };

export const VariantColors = VariantColorsTemplate.bind({});
VariantColors.args = {};

export const WithoutDropdownIcon = DefaultTemplate.bind({});
WithoutDropdownIcon.args = { noIcon: true };

export const CustomDropdownIcon = DefaultTemplate.bind({});
CustomDropdownIcon.args = {
  config: {
    dropdownIcon: {
      defaults: {
        size: "sm",
      },
    },
    defaults: {
      dropdownIcon: "expand_circle_down",
    },
  },
};

export const Slots: StoryFn<DefaultUDropdownBadgeArgs> = (args) => ({
  components: { UDropdownBadge, UIcon, URow },
  setup() {
    return { args };
  },
  template: `
    <URow no-mobile>
      <UDropdownBadge v-bind="args" label="Add to favorite">
        <template #left>
          <UIcon
            name="heart_plus"
            size="xs"
            color="green"
            class="mx-1"
          />
        </template>
      </UDropdownBadge>

      <UDropdownBadge v-bind="args" no-icon>
        <template #default>
          <UIcon name="unfold_more" color="white" />
        </template>
      </UDropdownBadge>
    </URow>
  `,
});

export const SlotToggle = DefaultTemplate.bind({});
SlotToggle.args = {
  slotTemplate: `
    <template #toggle="{ opened }">
      <ULink
        :label="opened ? 'collapse' : 'expand'"
        color="green"
        size="sm"
        class="mx-1"
      />
    </template>
  `,
};
