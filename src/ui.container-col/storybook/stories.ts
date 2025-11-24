import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UButton from "../../ui.button/UButton.vue";
import UPage from "../../ui.container-page/UPage.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UColArgs extends Props {
  slotTemplate?: string;
  enum: "gap" | "align" | "content" | "justify";
}

export default {
  id: "5015",
  title: "Containers / Col",
  component: UCol,
  args: {},
  argTypes: {
    ...getArgTypes(UCol.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UCol.__name),
    },
  },
} as Meta;

const defaultTemplate = `
  <UButton label="Button 1" />
  <UButton label="Button 2" />
  <UButton label="Button 3" />
`;

const DefaultTemplate: StoryFn<UColArgs> = (args: UColArgs) => ({
  components: { UCol, UInput, UButton, UPage },
  setup: () => ({ args, slots: getSlotNames(UCol.__name) }),
  template: `
    <UCol v-bind="args" class="border border-primary border-dashed rounded-medium p-4">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UCol>
  `,
});

const EnumTemplate: StoryFn<UColArgs> = (args: UColArgs, { argTypes }) => ({
  components: { UCol, UButton, URow, UInput },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow gap="lg">
      <UCol
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        block
        class="h-[200px] border border-primary border-dashed rounded-medium p-4"
      >
        <UButton :label="args.enum" />
        <UButton :label="option" />
      </UCol>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Reverse = DefaultTemplate.bind({});
Reverse.args = { reverse: true };
Reverse.parameters = {
  docs: {
    description: {
      story: "Reverse nested items order.",
    },
    story: {
      height: "200px",
    },
  },
};

export const Gap = EnumTemplate.bind({});
Gap.args = { enum: "gap" };
Gap.parameters = {
  docs: {
    description: {
      story: "The distance between nested elements.",
    },
  },
};

export const Align = EnumTemplate.bind({});
Align.args = { enum: "align" };
Align.parameters = {
  docs: {
    description: {
      story: "Items horizontal align (align-items).",
    },
  },
};

export const Content: StoryFn<UColArgs> = (args: UColArgs, { argTypes }) => ({
  components: { UCol, UButton, URow, UInput },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="lg">
      <UCol
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        align="normal"
        gap="xs"
        wrap
        block
        class="flex-row h-[250px] border border-primary border-dashed rounded-medium p-4"
      >
        <UButton label="content" class="w-[45%]" />
        <UButton :label="option" class="w-[45%]" />
        <UButton label="content" class="w-[45%]" />
        <UButton :label="option" class="w-[45%]" />
      </UCol>
    </UCol>
  `,
});
Content.args = { enum: "content" };
Content.parameters = {
  docs: {
    description: {
      story: "Items horizontal align for multi-row flex containers (align-content).",
    },
  },
};

export const Justify = EnumTemplate.bind({});
Justify.args = { enum: "justify" };
Justify.parameters = {
  docs: {
    description: {
      story: "Items vertical align (justify-content).",
    },
  },
};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
  slotTemplate: `
    <UInput
      label="Daily report"
      placeholder="Provide today's new data..."
      class="max-w-96"
    />
    <UButton label="Submit" />
  `,
};

export const Grow: StoryFn<UColArgs> = (args: UColArgs) => ({
  components: { UCol, UButton },
  setup: () => ({ args }),
  template: `
    <div class="flex flex-col h-[400px] border border-primary border-dashed rounded-medium p-4">
      <UCol gap="sm" class="border border-secondary border-dashed rounded-medium p-4">
        <UButton label="Col 1" />
        <UButton label="No grow" />
      </UCol>
      <UCol gap="sm" grow class="border border-secondary border-dashed rounded-medium p-4">
        <UButton label="Col 2" />
        <UButton label="With grow - fills available space" />
      </UCol>
      <UCol gap="sm" class="border border-secondary border-dashed rounded-medium p-4">
        <UButton label="Col 3" />
        <UButton label="No grow" />
      </UCol>
    </div>
  `,
});
Grow.parameters = {
  docs: {
    description: {
      story: "Allow flex item to grow to fill available space (flex-grow). The middle column grows to fill the remaining vertical space.",
    },
  },
};

export const Shrink: StoryFn<UColArgs> = (args: UColArgs) => ({
  components: { UCol, UButton },
  setup: () => ({ args }),
  template: `
    <div class="flex flex-col h-[300px] border border-primary border-dashed rounded-medium p-4">
      <UCol gap="sm" shrink class="min-h-[200px] border border-secondary border-dashed rounded-medium p-4">
        <UButton label="Col 1" />
        <UButton label="With shrink - can shrink below min-height" />
        <UButton label="Shrinks when needed" />
      </UCol>
      <UCol gap="sm" class="min-h-[200px] border border-secondary border-dashed rounded-medium p-4">
        <UButton label="Col 2" />
        <UButton label="No shrink - maintains min-height" />
        <UButton label="Won't shrink" />
      </UCol>
    </div>
  `,
});
Shrink.parameters = {
  docs: {
    description: {
      story: "Allow flex item to shrink if necessary (flex-shrink). The first column can shrink below its min-height when space is constrained.",
    },
  },
};
