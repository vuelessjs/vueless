import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UGrid from "../UGrid.vue";
import UText from "../../ui.text-block/UText.vue";
import UPlaceholder from "../../ui.container-placeholder/UPlaceholder.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UGridArgs extends Props {
  slotTemplate?: string;
  enum: "gap" | "rowGap" | "colGap" | "align" | "justify";
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
  <UPlaceholder label="1" class="h-20" />
  <UPlaceholder label="2" class="h-20" />
  <UPlaceholder label="3" class="h-20" />
  <UPlaceholder label="4" class="h-20" />
  <UPlaceholder label="5" class="h-20" />
  <UPlaceholder label="6" class="h-20" />
  <UPlaceholder label="7" class="h-20" />
  <UPlaceholder label="8" class="h-20" />
  <UPlaceholder label="9" class="h-20" />
`;

function createPlaceholders(cls = "h-auto") {
  return `
    <UPlaceholder :label="option" class="${cls}" />
    <UPlaceholder :label="option" class="${cls}" />
    <UPlaceholder :label="option" class="${cls}" />
    <UPlaceholder :label="option" class="${cls}" />
    <UPlaceholder :label="option" class="${cls}" />
    <UPlaceholder :label="option" class="${cls}" />
  `;
}

const DefaultTemplate: StoryFn<UGridArgs> = (args: UGridArgs) => ({
  components: { UGrid, UPlaceholder },
  setup: () => ({ args, slots: getSlotNames(UGrid.__name) }),
  template: `
    <UGrid v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UGrid>
  `,
});

const EnumTemplate: StoryFn<UGridArgs> = (args: UGridArgs, { argTypes }) => ({
  components: { UGrid, UText, UPlaceholder, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol block gap="lg">
      <UGrid
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        cols="3"
        class="border border-primary border-dashed rounded p-4 w-full"
        :config="args.config"
      >
        ${args.slotTemplate}
      </UGrid>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { cols: "4", gap: "md" };

export const Gap = EnumTemplate.bind({});
Gap.args = {
  enum: "gap",
  slotTemplate: createPlaceholders(),
};

export const RowGap = EnumTemplate.bind({});
RowGap.args = {
  enum: "rowGap",
  slotTemplate: createPlaceholders(),
};

export const ColGap = EnumTemplate.bind({});
ColGap.args = {
  enum: "colGap",
  slotTemplate: createPlaceholders("w-auto min-w-20"),
};

export const Align = EnumTemplate.bind({});
Align.args = {
  enum: "align",
  slotTemplate: createPlaceholders(),
  config: { wrapper: "h-40" },
};

export const Justify = EnumTemplate.bind({});
Justify.args = {
  enum: "justify",
  slotTemplate: createPlaceholders("w-auto min-w-20"),
};

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
