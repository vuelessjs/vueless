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
import UNumber from "../../ui.text-number/UNumber.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UBadgeArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size";
}

export default {
  id: "4095",
  title: "Text & Content / Badge",
  component: UBadge,
  args: {
    label: "Badge",
  },
  argTypes: {
    ...getArgTypes(UBadge.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UBadge.__name),
    },
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

export const Round = DefaultTemplate.bind({});
Round.args = { round: true };

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = ColorsTemplate.bind({});
Colors.args = {};

export const IconProps: StoryFn<UBadgeArgs> = (args) => ({
  components: { UBadge, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UBadge
        v-bind="args"
        left-icon="mail"
        label="Message"
      />
      <UBadge
        v-bind="args"
        icon="info"
        label="Info"
      />
      <UBadge
        v-bind="args"
        right-icon="chat"
        label="Chat"
      />
    </URow>
  `,
});

export const Slots: StoryFn<UBadgeArgs> = (args) => ({
  components: { UBadge, UIcon, URow, UNumber },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UBadge v-bind="args" label="Add to favorite">
        <template #left>
          <UIcon
            name="heart_plus"
            size="2xs"
            color="inherit"
          />
        </template>
      </UBadge>

      <UBadge v-bind="args" label="shopping_cart">
        <template #default="{ label }">
          <UNumber
            value="20.25"
            size="sm"
            currency="$"
            color="inherit"
          />
          <UIcon
            :name="label"
            size="2xs"
            color="inherit"
          />
        </template>
      </UBadge>

      <UBadge v-bind="args" label="Delete">
        <template #right>
          <UIcon
            name="delete"
            size="2xs"
            color="inherit"
          />
        </template>
      </UBadge>
    </URow>
  `,
});
