import {
  getArgs,
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
  enum: "color" | "size";
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
  setup: () => ({ args, slots: getSlotNames(UDivider.__name) }),
  template: `
    <UCol :class="{ 'flex-row': args.vertical }">
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

const EnumTemplate: StoryFn<UDividerArgs> = (args: UDividerArgs, { argTypes }) => ({
  components: { UDivider, URow, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow gap="xl">
      <UDivider
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        v-bind="getArgs(args, option)"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Label = DefaultTemplate.bind({});
Label.args = { label: "Business analysis" };

export const Icon = DefaultTemplate.bind({});
Icon.args = { icon: "monitoring" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const Dashed = DefaultTemplate.bind({});
Dashed.args = { dashed: true, size: "sm" };

export const Dotted = DefaultTemplate.bind({});
Dotted.args = { dotted: true, size: "sm" };

export const Vertical: StoryFn<UDividerArgs> = (args: UDividerArgs) => ({
  components: { UDivider, URow },
  setup: () => ({ args }),
  template: `
    <URow>
      <p class="text-justify">
        Understanding your clients' needs is essential for building long-term business relationships.
        By analyzing customer behavior and feedback, companies can tailor their services to provide more value.
      </p>

      <UDivider vertical class="h-24" />

      <p class="text-justify">
        Businesses that prioritize customer satisfaction see higher retention rates and increased referrals.
        Implementing a structured follow-up process can help maintain strong client engagement and trust.
      </p>
    </URow>
  `,
});
