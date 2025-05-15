import type { Meta, StoryFn } from "@storybook/vue3";
import { getArgTypes } from "../../utils/storybook.ts";

import USkeleton from "../USkeleton.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Props } from "../types.ts";

interface SkeletonArgs extends Props {
  enum: "variant" | "color";
  outerEnum: "variant";
}

/**
 * The `v-tooltip` directive. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/directives/tooltip)
 */
export default {
  id: "9021",
  title: "Loaders and Skeletons / Base Skeleton",
  args: {},
  argTypes: {
    ...getArgTypes(USkeleton.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<SkeletonArgs> = (args: SkeletonArgs) => ({
  components: { USkeleton },
  setup: () => ({ args }),
  template: `
    <USkeleton v-bind="args" />
  `,
});

const EnumVariantTemplate: StoryFn<SkeletonArgs> = (args: SkeletonArgs, { argTypes }) => ({
  components: { USkeleton, UCol },
  setup() {
    const filteredOptions = argTypes?.[args.enum]?.options || [];

    return { args, filteredOptions };
  },
  template: `
    <UCol>
      <USkeleton
        v-for="(option, index) in filteredOptions"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Variant = EnumVariantTemplate.bind({});
Variant.args = { enum: "variant" };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };
