import type { Meta, StoryFn } from "@storybook/vue3";
import { getArgTypes, getEnumVariantDescription } from "../../utils/storybook.ts";

import USkeletonChoice from "../USkeletonChoice.vue";
import UCol from "../../ui.container-col/UCol.vue";
import USkeleton from "../../ui.skeleton/USkeleton.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

import type { Props } from "../types.ts";

interface SkeletonChoiceArgs extends Props {
  enum: "variant" | "size" | "labelAlign" | "type";
}

export default {
  id: "9023",
  title: "Loaders and Skeletons / Choice Skeleton",
  args: {},
  argTypes: {
    ...getArgTypes(USkeletonChoice.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<SkeletonChoiceArgs> = (args: SkeletonChoiceArgs) => ({
  components: { USkeletonChoice },
  setup: () => {
    return { args };
  },
  template: `
    <USkeletonChoice v-bind="args" />
  `,
});

const EnumVariantTemplate: StoryFn<SkeletonChoiceArgs> = (
  args: SkeletonChoiceArgs,
  { argTypes },
) => ({
  components: { USkeletonChoice, UCol },
  directives: { tooltip },
  setup() {
    const filteredOptions = argTypes?.[args.enum]?.options || [];

    return { args, filteredOptions };
  },
  template: `
    <UCol>
      <USkeletonChoice
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

export const Label = DefaultTemplate.bind({});
Label.args = { label: false };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "labelAlign" };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };
Sizes.parameters = getEnumVariantDescription();

export const Variant = EnumVariantTemplate.bind({});
Variant.args = { enum: "variant" };

export const LabelSlot: StoryFn<SkeletonChoiceArgs> = (args) => ({
  components: { USkeletonChoice, USkeleton, UCol },
  setup() {
    return { args };
  },
  template: `
    <USkeletonChoice v-bind="args">
      <template #label>
        <UCol gap="2xs">
          <USkeleton class="h-3 w-36 rounded-small" variant="dark" />
          <USkeleton class="h-1.5 rounded-small" variant="dark" />
        </UCol>
      </template>
    </USkeletonChoice>
  `,
});
