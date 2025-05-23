import type { Meta, StoryFn } from "@storybook/vue3";
import { getArgTypes, getEnumVariantDescription } from "../../utils/storybook.ts";

import USkeletonText from "../USkeletonText.vue";
import UCol from "../../ui.container-col/UCol.vue";

import tooltip from "../../directives/tooltip/vTooltip.ts";

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

const EnumVariantTemplate: StoryFn<SkeletonTextArgs> = (args: SkeletonTextArgs, { argTypes }) => ({
  components: { USkeletonText, UCol },
  directives: { tooltip },
  setup() {
    const filteredOptions = argTypes?.[args.enum]?.options || [];

    return { args, filteredOptions };
  },
  template: `
    <UCol>
      <USkeletonText
        v-for="(option, index) in filteredOptions"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        v-tooltip="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const HeaderSizes = EnumVariantTemplate.bind({});
HeaderSizes.args = { enum: "size", headerLines: 2, textLines: 0 };
HeaderSizes.parameters = getEnumVariantDescription();

export const TextSizes = EnumVariantTemplate.bind({});
TextSizes.args = { enum: "size", headerLines: 0, textLines: 3 };
TextSizes.parameters = getEnumVariantDescription();

export const Variant = EnumVariantTemplate.bind({});
Variant.args = { enum: "variant" };
