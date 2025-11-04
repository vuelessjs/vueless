import type { Meta, StoryFn } from "@storybook/vue3-vite";
import { getArgTypes, getDocsDescription } from "../../utils/storybook";

import UPlaceholder from "../UPlaceholder.vue";

import type { Props } from "../types";

interface PlaceholderArgs extends Props {
  enum?: string;
}

export default {
  id: "9100",
  title: "Other / Placeholder",
  args: {},
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
  components: { UPlaceholder },
  setup: () => ({ args }),
  template: `
    <div style="height: 200px;">
      <UPlaceholder v-bind="args" />
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const WithLabel = DefaultTemplate.bind({});
WithLabel.args = {
  label: "Drop content here",
};

export const Inset = DefaultTemplate.bind({});
Inset.args = {
  label: "Inset placeholder",
  inset: true,
};

export const NotRounded = DefaultTemplate.bind({});
NotRounded.args = {
  label: "Not rounded",
  rounded: false,
};

export const SolidBorder = DefaultTemplate.bind({});
SolidBorder.args = {
  label: "Solid border",
  dashed: false,
};

export const Colors: StoryFn<PlaceholderArgs> = (args) => ({
  components: { UPlaceholder },
  setup() {
    const colors = [
      "primary",
      "secondary",
      "error",
      "warning",
      "success",
      "info",
      "notice",
      "neutral",
      "grayscale",
    ];

    return { args, colors };
  },
  template: `
    <div class="flex flex-col gap-4">
      <UPlaceholder
        v-for="color in colors"
        :key="color"
        :color="color"
        :label="color"
        class="h-20"
      />
    </div>
  `,
});

export const WithSlot: StoryFn<PlaceholderArgs> = (args) => ({
  components: { UPlaceholder },
  setup() {
    return { args };
  },
  template: `
    <div style="height: 200px;">
      <UPlaceholder v-bind="args">
        <div class="flex flex-col items-center gap-2">
          <div class="text-2xl">📦</div>
          <div class="text-small text-lifted">Custom slot content</div>
        </div>
      </UPlaceholder>
    </div>
  `,
});

export const FixedSize: StoryFn<PlaceholderArgs> = (args) => ({
  components: { UPlaceholder },
  setup() {
    return { args };
  },
  template: `
    <UPlaceholder label="Fixed size: 300x150" class="w-[300px] h-[150px]" />
  `,
});

export const LayoutExample: StoryFn<PlaceholderArgs> = (args) => ({
  components: { UPlaceholder },
  setup() {
    return { args };
  },
  template: `
    <div class="flex gap-4" style="height: 300px;">
      <UPlaceholder label="Sidebar" class="w-64" />
      <div class="flex-1 flex flex-col gap-4">
        <UPlaceholder label="Header" class="h-16" />
        <UPlaceholder label="Main Content" class="flex-1" />
        <UPlaceholder label="Footer" class="h-12" />
      </div>
    </div>
  `,
});
