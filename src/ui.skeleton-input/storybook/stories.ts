import type { Meta, StoryFn } from "@storybook/vue3-vite";
import {
  getArgs,
  getArgTypes,
  getDocsDescription,
  getSlotNames,
  getSlotsFragment,
} from "../../utils/storybook";

import USkeletonInput from "../USkeletonInput.vue";
import UCol from "../../ui.container-col/UCol.vue";
import USkeleton from "../../ui.skeleton/USkeleton.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Props } from "../types";

interface SkeletonInputArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size" | "labelAlign" | "type";
}

export default {
  id: "9060",
  title: "Loaders and Skeletons / Skeleton Input",
  args: {},
  argTypes: {
    ...getArgTypes(USkeletonInput.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(USkeletonInput.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<SkeletonInputArgs> = (args: SkeletonInputArgs) => ({
  components: { USkeletonInput },
  setup: () => {
    return { args, slots: getSlotNames(USkeletonInput.__name) };
  },
  template: `
    <USkeletonInput v-bind="args" class="!max-w-96">
      ${args.slotTemplate || getSlotsFragment("")}
    </USkeletonInput>
  `,
});

const EnumTemplate: StoryFn<SkeletonInputArgs> = (args: SkeletonInputArgs, { argTypes }) => ({
  components: { USkeletonInput, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="2xl">
      <USkeletonInput
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="max-w-96 w-full"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const WithoutLabel = DefaultTemplate.bind({});
WithoutLabel.args = { label: false };

export const LabelAlign = EnumTemplate.bind({});
LabelAlign.args = { enum: "labelAlign" };

export const Types: StoryFn<SkeletonInputArgs> = (args: SkeletonInputArgs) => ({
  components: { USkeletonInput, UCol, ULabel },
  setup: () => ({ args }),
  template: `
    <UCol>
      <ULabel label="Input">
        <USkeletonInput type="input" class="max-w-96 w-full" />
      </ULabel>

      <ULabel label="Textarea">
        <USkeletonInput type="textarea" class="max-w-96 w-full" />
      </ULabel>
    </UCol>
  `,
});

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant" };

export const Slot: StoryFn<SkeletonInputArgs> = (args) => ({
  components: { USkeletonInput, USkeleton, UCol },
  setup() {
    return { args };
  },
  template: `
    <USkeletonInput label-align="top" v-bind="args" class="!max-w-96">
      <UCol align="end" >
        <USkeleton class="size-5 rounded-small" variant="dark" />
      </UCol>
    </USkeletonInput>
  `,
});

export const LabelSlot: StoryFn<SkeletonInputArgs> = (args) => ({
  components: { USkeletonInput, USkeleton, UCol },
  setup() {
    return { args };
  },
  template: `
    <USkeletonInput v-bind="args" label-align="top" class="!max-w-96">
      <template #label>
        <UCol gap="2xs"s>
          <USkeleton class="h-3 w-36 rounded-small" variant="dark" />
          <USkeleton class="h-1.5 w-24 rounded-small" variant="dark" />
        </UCol>
      </template>
    </USkeletonInput>
  `,
});
