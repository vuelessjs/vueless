import type { Meta, StoryFn } from "@storybook/vue3";
import { getArgTypes } from "../../utils/storybook.ts";

import UInputOptionSkeleton from "../UInputOptionSkeleton.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Props } from "../types.ts";

interface InputOptionSkeletonArgs extends Props {
  enum: "variant" | "size" | "color" | "labelAlign" | "type";
}

/**
 * The `v-tooltip` directive. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/directives/tooltip)
 */
export default {
  id: "9023",
  title: "Loaders and Skeletons / Input Option Skeleton",
  args: {},
  argTypes: {
    ...getArgTypes(UInputOptionSkeleton.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<InputOptionSkeletonArgs> = (args: InputOptionSkeletonArgs) => ({
  components: { UInputOptionSkeleton },
  setup: () => {
    return { args };
  },
  template: `
    <UInputOptionSkeleton v-bind="args" class="!max-w-96" />
  `,
});

const EnumVariantTemplate: StoryFn<InputOptionSkeletonArgs> = (
  args: InputOptionSkeletonArgs,
  { argTypes },
) => ({
  components: { UInputOptionSkeleton, UCol },
  setup() {
    const filteredOptions = argTypes?.[args.enum]?.options || [];

    return { args, filteredOptions };
  },
  template: `
    <UCol>
      <UInputOptionSkeleton
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

export const Type = EnumVariantTemplate.bind({});
Type.args = { enum: "type" };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Variant = EnumVariantTemplate.bind({});
Variant.args = { enum: "variant" };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };
