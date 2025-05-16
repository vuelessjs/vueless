import type { Meta, StoryFn } from "@storybook/vue3";
import { getArgTypes, getEnumVariantDescription } from "../../utils/storybook.ts";

import UTextSkeleton from "../UTextSkeleton.vue";
import UCol from "../../ui.container-col/UCol.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Props } from "../types.ts";

interface TextSkeletonArgs extends Props {
  enum: "size" | "variant";
}

/**
 * The `v-tooltip` directive. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/directives/tooltip)
 */
export default {
  id: "9024",
  title: "Loaders and Skeletons / Text Skeleton",
  args: {},
  argTypes: {
    ...getArgTypes(UTextSkeleton.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<TextSkeletonArgs> = (args: TextSkeletonArgs) => ({
  components: { UTextSkeleton },
  setup: () => {
    return { args };
  },
  template: `
    <UTextSkeleton v-bind="args" />
  `,
});

const EnumVariantTemplate: StoryFn<TextSkeletonArgs> = (args: TextSkeletonArgs, { argTypes }) => ({
  components: { UTextSkeleton, UCol },
  directives: { tooltip },
  setup() {
    const filteredOptions = argTypes?.[args.enum]?.options || [];

    return { args, filteredOptions };
  },
  template: `
    <UCol>
      <UTextSkeleton
        v-for="(option, index) in filteredOptions"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        v-tooltip="option"
      />
    </UTextSkeleton>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const HeaderSizes = EnumVariantTemplate.bind({});
HeaderSizes.args = { enum: "size", header: 2, text: 0 };
HeaderSizes.parameters = getEnumVariantDescription();

export const TextSizes = EnumVariantTemplate.bind({});
TextSizes.args = { enum: "size", header: 0, text: 3 };
TextSizes.parameters = getEnumVariantDescription();

export const Variant = EnumVariantTemplate.bind({});
Variant.args = { enum: "variant" };
