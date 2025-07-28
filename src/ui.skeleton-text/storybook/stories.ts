import type { Meta, StoryFn } from "@storybook/vue3-vite";
import { getArgs, getArgTypes } from "../../utils/storybook.ts";

import USkeletonText from "../USkeletonText.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Props } from "../types.ts";

interface SkeletonTextArgs extends Props {
  enum: "size" | "variant";
}

export default {
  id: "9050",
  title: "Loaders and Skeletons / Skeleton Text",
  args: {},
  argTypes: {
    ...getArgTypes(USkeletonText.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<SkeletonTextArgs> = (args: SkeletonTextArgs) => ({
  components: { USkeletonText },
  setup: () => {
    return { args };
  },
  template: `
    <USkeletonText v-bind="args" />
  `,
});

const EnumTemplate: StoryFn<SkeletonTextArgs> = (args: SkeletonTextArgs, { argTypes }) => ({
  components: { USkeletonText, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="lg">
      <USkeletonText
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="border border-dashed border-primary rounded-medium p-2"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", headerLines: 1, textLines: 3 };

export const Variant = EnumTemplate.bind({});
Variant.args = { enum: "variant" };
