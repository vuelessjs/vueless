import type { Meta, StoryFn } from "@storybook/vue3-vite";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UPlaceholder from "../UPlaceholder.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UText from "../../ui.text-block/UText.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

import type { Props } from "../types";

interface PlaceholderArgs extends Props {
  slotTemplate?: string;
  enum?: string;
}

export default {
  id: "5052",
  title: "Containers / Placeholder",
  args: {
    label: "Placeholder label.",
    dashed: true,
  },
  argTypes: {
    ...getArgTypes(UPlaceholder.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UPlaceholder.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<PlaceholderArgs> = (args: PlaceholderArgs) => ({
  components: { UPlaceholder, URow, UText },
  setup: () => ({ args, slots: getSlotNames(UPlaceholder.__name) }),
  template: `
    <UPlaceholder v-bind="args" class="h-32">
      ${args.slotTemplate || getSlotsFragment("")}
    </UPlaceholder>
  `,
});

const EnumTemplate: StoryFn<PlaceholderArgs> = (args: PlaceholderArgs, { argTypes }) => ({
  components: { UPlaceholder, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UPlaceholder
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="h-32"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const NoLabel = DefaultTemplate.bind({});
NoLabel.args = { label: "" };

export const Rounded = EnumTemplate.bind({});
Rounded.args = { enum: "rounded", label: "{enumValue}" };

export const BorderStyle: StoryFn<PlaceholderArgs> = (args: PlaceholderArgs) => ({
  components: { UPlaceholder, URow },
  setup: () => ({ args }),
  template: `
    <URow>
      <UPlaceholder label="Solid" class="h-32" />
      <UPlaceholder label="Dashed" dashed class="h-32" />
      <UPlaceholder label="Dotted" dotted class="h-32" />
    </URow>
  `,
});

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", label: "{enumValue}" };

export const WithSlot: StoryFn<PlaceholderArgs> = (args: PlaceholderArgs) => ({
  components: { UPlaceholder, UCol, UText, UHeader },
  setup: () => ({ args }),
  template: `
    <UPlaceholder v-bind="args" class="h-32">
      <UCol align="center" gap="2xs">
        <UHeader size="lg">📦</UHeader>
        <UText color="neutral">Custom slot content</UText>
      </UCol>
    </UPlaceholder>
  `,
});

export const FixedSize: StoryFn<PlaceholderArgs> = (args: PlaceholderArgs) => ({
  components: { UPlaceholder },
  setup: () => ({ args }),
  template: `
    <UPlaceholder label="Fixed size: 300x150" class="w-[300px] h-[150px]" />
  `,
});

export const LayoutExample: StoryFn<PlaceholderArgs> = (args: PlaceholderArgs) => ({
  components: { UPlaceholder, URow, UCol },
  setup: () => ({ args }),
  template: `
    <URow align="stretch" class="h-96">
      <UPlaceholder label="Sidebar" class="w-64" />
      <UCol align="stretch" grow>
        <UPlaceholder label="Header" class="h-16" />
        <UPlaceholder label="Main Content" class="flex-1" />
        <UPlaceholder label="Footer" class="h-12" />
      </UCol>
    </URow>
  `,
});
