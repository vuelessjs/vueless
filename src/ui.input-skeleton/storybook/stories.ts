import type { Meta, StoryFn } from "@storybook/vue3";
import { getArgTypes, getSlotsFragment, getEnumVariantDescription } from "../../utils/storybook.ts";

import UInputSkeleton from "../UInputSkeleton.vue";
import UCol from "../../ui.container-col/UCol.vue";
import USkeleton from "../../ui.skeleton/USkeleton.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Props } from "../types.ts";

interface InputSkeletonArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size" | "labelAlign" | "type";
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
  directives: { tooltip },
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
        v-tooltip="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Label = DefaultTemplate.bind({});
Label.args = { label: false };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Type = EnumVariantTemplate.bind({});
Type.args = { enum: "type" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

export const Variant = EnumVariantTemplate.bind({});
Variant.args = { enum: "variant" };

export const Slot: StoryFn<InputSkeletonArgs> = (args) => ({
  components: { UInputSkeleton, USkeleton, UCol },
  setup() {
    return { args };
  },
  template: `
    <UInputSkeleton label-align="top" v-bind="args" class="!max-w-96">
      <UCol align="end" >
        <USkeleton class="size-5 rounded-small" variant="dark" />
      </UCol>
    </UInputSkeleton>
  `,
});

export const LabelSlot: StoryFn<InputSkeletonArgs> = (args) => ({
  components: { UInputSkeleton, USkeleton, UCol },
  setup() {
    return { args };
  },
  template: `
    <UInputSkeleton v-bind="args" label-align="top" class="!max-w-96">
      <template #label>
        <UCol gap="2xs"s>
          <USkeleton class="h-3 w-36 rounded-small" variant="dark" />
          <USkeleton class="h-1.5 w-24 rounded-small" variant="dark" />
        </UCol>
      </template>
    </UInputSkeleton>
  `,
});
