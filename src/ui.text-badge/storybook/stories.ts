import type { Meta, StoryFn } from "@storybook/vue3";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UBadge from "../../ui.text-badge/UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { UBadgeProps } from "../types.ts";

interface UBadgeArgs extends UBadgeProps {
  slotTemplate?: string;
  enum: "variant" | "size";
}

export default {
  id: "4090",
  title: "Text & Content / Badge",
  component: UBadge,
  args: {
    label: "Badge",
  },
  argTypes: {
    ...getArgTypes(UBadge.__name),
  },
  parameters: {
    ...getDocsDescription(UBadge.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UBadgeArgs> = (args: UBadgeArgs) => ({
  components: { UBadge, UIcon },
  setup() {
    const slots = getSlotNames(UBadge.__name);

    return { args, slots };
  },
  template: `
    <UBadge v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UBadge>
  `,
});

const ColorsTemplate: StoryFn<UBadgeArgs> = (args: UBadgeArgs, { argTypes }) => ({
  components: { UBadge, URow, UCol },
  setup() {
    return {
      args,
      variants: argTypes?.variant?.options,
      colors: argTypes?.color?.options,
    };
  },
  template: `
    <UCol>
      <URow v-for="(variant, index) in variants" :key="index">
        <UBadge
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

const EnumVariantTemplate: StoryFn<UBadgeArgs> = (args: UBadgeArgs, { argTypes }) => ({
  components: { UBadge, URow },
  setup() {
    function getText(value: string) {
      return `Badge ${value}`;
    }

    return { args, options: argTypes?.[args.enum]?.options || [], getText };
  },
  template: `
    <URow>
      <UDropdownButton
        label="Dropdown"
        :options='[{"label":"option 1"},{"label":"option 2"},{"label":"option 3"}]'
      variant="thirdary"
      filled
      >
      </UDropdownButton>
      <UBadge
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="getText(option)"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const LeftIcon = DefaultTemplate.bind({});
LeftIcon.args = { leftIcon: "star" };

export const RightIcon = DefaultTemplate.bind({});
RightIcon.args = { rightIcon: "star" };

export const SlotLeft = DefaultTemplate.bind({});
SlotLeft.args = {
  slotTemplate: `
    <template #left>
      🤘
    </template>
  `,
};

export const SlotRight = DefaultTemplate.bind({});
SlotRight.args = {
  slotTemplate: `
    <template #right>
      🤘
    </template>
  `,
};
