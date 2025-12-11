import type { Meta, StoryFn } from "@storybook/vue3-vite";
import { getArgs, getArgTypes, getDocsDescription } from "../../utils/storybook";

import USkeletonChoice from "../USkeletonChoice.vue";
import UCol from "../../ui.container-col/UCol.vue";
import USkeleton from "../../ui.skeleton/USkeleton.vue";

import type { Props } from "../types";

interface SkeletonChoiceArgs extends Props {
  enum: "size" | "labelAlign" | "type";
}

export default {
  id: "9070",
  title: "Loaders and Skeletons / Skeleton Choice",
  args: {},
  argTypes: {
    ...getArgTypes(USkeletonChoice.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(USkeletonChoice.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<SkeletonChoiceArgs> = (args: SkeletonChoiceArgs) => ({
  components: { USkeletonChoice },
  setup: () => ({ args }),
  template: `
    <USkeletonChoice v-bind="args" />
  `,
});

const EnumVariantTemplate: StoryFn<SkeletonChoiceArgs> = (
  args: SkeletonChoiceArgs,
  { argTypes },
) => ({
  components: { USkeletonChoice, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <USkeletonChoice
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Type = EnumVariantTemplate.bind({});
Type.args = { enum: "type" };

export const WithoutLabel: StoryFn<SkeletonChoiceArgs> = (args: SkeletonChoiceArgs) => ({
  components: { USkeletonChoice, UCol },
  setup: () => ({ args }),
  template: `
    <UCol>
      <USkeletonChoice type="checkbox" :label="false" />
      <USkeletonChoice type="radio" :label="false" />
    </UCol>
  `,
});

export const LabelAlign = EnumVariantTemplate.bind({});
LabelAlign.args = { enum: "labelAlign" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelSlot: StoryFn<SkeletonChoiceArgs> = (args) => ({
  components: { USkeletonChoice, USkeleton, UCol },
  setup() {
    return { args };
  },
  template: `
    <USkeletonChoice v-bind="args">
      <template #label>
        <UCol gap="2xs">
          <USkeleton class="h-3 w-36 rounded-small" />
          <USkeleton class="h-1.5 rounded-small" />
        </UCol>
      </template>
    </USkeletonChoice>
  `,
});
