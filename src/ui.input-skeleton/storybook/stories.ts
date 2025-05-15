import type { Meta, StoryFn } from "@storybook/vue3";
import { getArgTypes, getSlotsFragment } from "../../utils/storybook.ts";

import UInputSkeleton from "../UInputSkeleton.vue";
import UCol from "../../ui.container-col/UCol.vue";
import USkeleton from "../../ui.skeleton/USkeleton.vue";

import type { Props } from "../types.ts";

interface InputSkeletonArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size" | "color" | "labelAlign" | "type";
}

/**
 * The `v-tooltip` directive. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/directives/tooltip)
 */
export default {
  id: "9022",
  title: "Loaders and Skeletons / Input Skeleton",
  args: {},
  argTypes: {
    ...getArgTypes(UInputSkeleton.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<InputSkeletonArgs> = (args: InputSkeletonArgs) => ({
  components: { UInputSkeleton },
  setup: () => {
    return { args };
  },
  template: `
    <UInputSkeleton v-bind="args" class="!max-w-96">
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputSkeleton>
  `,
});

const EnumVariantTemplate: StoryFn<InputSkeletonArgs> = (
  args: InputSkeletonArgs,
  { argTypes },
) => ({
  components: { UInputSkeleton, UCol },
  setup() {
    const filteredOptions = argTypes?.[args.enum]?.options || [];

    return { args, filteredOptions };
  },
  template: `
    <UCol>
      <UInputSkeleton
        v-for="(option, index) in filteredOptions"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        class="max-w-96 w-full"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Type = EnumVariantTemplate.bind({});
Type.args = { enum: "type" };

export const Variant = EnumVariantTemplate.bind({});
Variant.args = { enum: "variant" };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };

export const Slot: StoryFn<InputSkeletonArgs> = (args) => ({
  components: { UInputSkeleton, USkeleton },
  setup() {
    return { args };
  },
  template: `
    <UInputSkeleton label-align="top" v-bind="args" class="!max-w-96">
      <div class="flex flex-row-reverse w-full">
        <USkeleton class="w-5 h-5" class="rounded-small" variant="dark" />
      </div>
    </UInputSkeleton>
  `,
});
