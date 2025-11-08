import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UGrid from "../UGrid.vue";
import UCard from "../../ui.container-card/UCard.vue";
import UText from "../../ui.text-block/UText.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UGridArgs extends Props {
  slotTemplate?: string;
  enum: "gap" | "align" | "justify";
}

export default {
  id: "5025",
  title: "Containers / Grid",
  component: UGrid,
  argTypes: {
    ...getArgTypes(UGrid.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UGrid.__name),
    },
  },
} as Meta;

const defaultTemplate = `
  <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">1</div>
  <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">2</div>
  <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">3</div>
  <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">4</div>
  <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">5</div>
  <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">6</div>
`;

const DefaultTemplate: StoryFn<UGridArgs> = (args: UGridArgs) => ({
  components: { UGrid },
  setup: () => ({ args, slots: getSlotNames(UGrid.__name) }),
  template: `
    <UGrid v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UGrid>
  `,
});

const EnumTemplate: StoryFn<UGridArgs> = (args: UGridArgs, { argTypes }) => ({
  components: { UGrid, UText },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <div class="space-y-6">
      <div v-for="option in argTypes?.[args.enum]?.options" :key="option">
        <UText size="sm" color="neutral" class="mb-2">{{ args.enum }}: {{ option }}</UText>
        <UGrid
          v-bind="getArgs(args, option)"
          cols="3"
          class="border border-gray-300 dark:border-gray-600 border-dashed rounded p-4"
        >
          <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">1</div>
          <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">2</div>
          <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">3</div>
        </UGrid>
      </div>
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  cols: "3",
  gap: "md",
};

export const Gaps = EnumTemplate.bind({});
Gaps.args = { enum: "gap" };

export const Align = EnumTemplate.bind({});
Align.args = { enum: "align" };

export const Justify = EnumTemplate.bind({});
Justify.args = { enum: "justify" };

export const Responsive: StoryFn<UGridArgs> = (args: UGridArgs) => ({
  components: { UGrid },
  setup: () => ({ args }),
  template: `
    <UGrid cols="1 sm:2 md:3 lg:4" gap="md">
      <div v-for="n in 8" :key="n" class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">
        {{ n }}
      </div>
    </UGrid>
  `,
});
Responsive.args = {};

export const AutoFit: StoryFn<UGridArgs> = (args: UGridArgs) => ({
  components: { UGrid },
  setup: () => ({ args }),
  template: `
    <UGrid responsive gap="md">
      <div v-for="n in 8" :key="n" class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">
        {{ n }}
      </div>
    </UGrid>
  `,
});
AutoFit.args = {};

export const Nested: StoryFn<UGridArgs> = (args: UGridArgs) => ({
  components: { UGrid, UText },
  setup: () => ({ args }),
  template: `
    <UGrid cols="2" gap="md">
      <div class="bg-gray-200 dark:bg-gray-700 p-4 rounded">
        <UText>Left Section</UText>
      </div>
      <UGrid cols="2" gap="sm">
        <div class="bg-gray-300 dark:bg-gray-600 p-4 rounded flex items-center justify-center">
          <UText>Nested A</UText>
        </div>
        <div class="bg-gray-300 dark:bg-gray-600 p-4 rounded flex items-center justify-center">
          <UText>Nested B</UText>
        </div>
      </UGrid>
    </UGrid>
  `,
});
Nested.args = {};

export const WithCards: StoryFn<UGridArgs> = (args: UGridArgs) => ({
  components: { UGrid, UCard, UText },
  setup: () => ({ args }),
  template: `
    <UGrid cols="1 sm:2 md:3" gap="lg">
      <UCard v-for="n in 6" :key="n">
        <UText size="lg" weight="bold" class="mb-2">Card {{ n }}</UText>
        <UText color="neutral">This is card content for item {{ n }}</UText>
      </UCard>
    </UGrid>
  `,
});
WithCards.args = {};

export const Dense: StoryFn<UGridArgs> = (args: UGridArgs) => ({
  components: { UGrid },
  setup: () => ({ args }),
  template: `
    <UGrid cols="3" gap="md" dense>
      <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">1</div>
      <div class="bg-gray-200 dark:bg-gray-700 h-40 rounded flex items-center justify-center row-span-2">2 (tall)</div>
      <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">3</div>
      <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">4</div>
      <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">5</div>
      <div class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center">6</div>
    </UGrid>
  `,
});
Dense.args = {};

export const CustomGaps: StoryFn<UGridArgs> = (args: UGridArgs) => ({
  components: { UGrid, UText },
  setup: () => ({ args }),
  template: `
    <div class="space-y-6">
      <div>
        <UText size="sm" color="neutral" class="mb-2">Different row and column gaps</UText>
        <UGrid cols="3" rowGap="lg" colGap="sm">
          <div
            v-for="n in 6"
            :key="n"
            class="bg-gray-200 dark:bg-gray-700 h-20 rounded flex items-center justify-center"
          >
            {{ n }}
          </div>
        </UGrid>
      </div>
    </div>
  `,
});
CustomGaps.args = {};
