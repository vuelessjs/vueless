import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import URow from "../../ui.container-row/URow.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";
import UCol from "../../ui.container-col/UCol.vue";

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
  components: { UDivider, UCol },
  setup() {
    const slots = getSlotNames(UDivider.__name);

    return { args, slots };
  },
  template: `
    <UCol>
      <p>
        Understanding your clients' needs is essential for building long-term business relationships.
        By analyzing customer behavior and feedback, companies can tailor their services to provide more value.
      </p>
      <UDivider v-bind="args">
        ${args.slotTemplate || getSlotsFragment("")}
      </UDivider>
      <p>
        Businesses that prioritize customer satisfaction see higher retention rates and increased referrals.
        Implementing a structured follow-up process can help maintain strong client engagement and trust.
      </p>
    </UCol>
  `,
});

const EnumVariantTemplate: StoryFn<UDividerArgs> = (args: UDividerArgs, { argTypes }) => ({
  components: { UDivider, URow, UCol },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow gap="xl">
      <UCol
        v-for="(option, index) in options"
        :key="index"
        gap="none"
        class="w-1/4"
      >
        <p>{{ option }}</p>
        <UDivider
          v-bind="args"
          :[args.enum]="option"
          :key="index"
        />
        <p>{{ option }}</p>
      </UCol>
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
  label: "Feedback",
  config: {
    wrapper: "!h-32",
  },
};

export const NoBorder = DefaultTemplate.bind({});
NoBorder.args = { label: "Customer Feedback", border: false };
NoBorder.parameters = {
  docs: {
    description: {
      story: "Keep only spacings by setting `border` prop to `false`.",
    },
  },
};
