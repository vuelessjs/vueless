import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import URow from "../../ui.container-row/URow.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UDividerArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size" | "padding";
}

export default {
  id: "5010",
  title: "Containers / Divider",
  component: UDivider,
  argTypes: {
    ...getArgTypes(UDivider.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDivider.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UDividerArgs> = (args: UDividerArgs) => ({
  components: { UDivider },
  setup() {
    const slots = getSlotNames(UDivider.__name);

    return { args, slots };
  },
  template: `
    <UDivider v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UDivider>
  `,
});

const EnumVariantTemplate: StoryFn<UDividerArgs> = (args: UDividerArgs, { argTypes }) => ({
  components: { UDivider, URow },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow>
      <UDivider
        class="w-1/4"
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Variants = EnumVariantTemplate.bind({});
Variants.args = { enum: "variant" };

export const Padding = EnumVariantTemplate.bind({});
Padding.args = { enum: "padding" };

export const Dashed = DefaultTemplate.bind({});
Dashed.args = { dashed: true };

export const Dotted = DefaultTemplate.bind({});
Dotted.args = { dotted: true };

export const Vertical = DefaultTemplate.bind({});
Vertical.args = {
  vertical: true,
  label: "label",
  config: {
    wrapper: "!h-32",
  },
};

export const NoBorder = DefaultTemplate.bind({});
NoBorder.args = { label: "label", border: false };
