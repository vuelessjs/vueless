import type { Meta, StoryFn } from "@storybook/vue3-vite";
import { getArgTypes, getDocsDescription } from "../../utils/storybook";

import USkeleton from "../USkeleton.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Props } from "../types";

interface SkeletonArgs extends Props {
  enum?: string;
}

export default {
  id: "9040",
  title: "Loaders and Skeletons / Skeleton",
  args: {},
  argTypes: {
    ...getArgTypes(USkeleton.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(USkeleton.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<SkeletonArgs> = (args: SkeletonArgs) => ({
  components: { USkeleton },
  setup: () => ({ args }),
  template: `
    <USkeleton v-bind="args" />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Slot: StoryFn<SkeletonArgs> = (args) => ({
  components: { USkeleton, UCol },
  setup() {
    return { args };
  },
  template: `
    <USkeleton v-bind="args" class="max-w-96 p-4">
      <USkeleton class="w-15 h-10 rounded-small" />
    </USkeleton>
  `,
});
