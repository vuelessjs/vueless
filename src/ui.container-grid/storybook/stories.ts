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
  enum:
    | "gap"
    | "rowGap"
    | "colGap"
    | "align"
    | "content"
    | "justify"
    | "placeContent"
    | "placeItems";
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
  <UPlaceholder label="1" class="min-h-10 col-span-1 row-span-3" />
  <UPlaceholder label="2" class="min-h-10 col-span-3 row-span-1" />
  <UPlaceholder label="3" class="min-h-10 col-span-3 row-span-2" />
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
Default.args = { cols: "4", rows: "3", gap: "md" };

export const Gap = EnumTemplate.bind({});
Gap.args = {
  enum: "gap",
  slotTemplate: createPlaceholders(),
};
Gap.parameters = {
  docs: {
    description: {
      story: "Gap between items.",
    },
  },
};

export const RowGap = EnumTemplate.bind({});
RowGap.args = {
  enum: "rowGap",
  slotTemplate: createPlaceholders(),
};
Gap.parameters = {
  docs: {
    description: {
      story: "Vertical gap override.",
    },
  },
};

export const ColGap = EnumTemplate.bind({});
ColGap.args = {
  enum: "colGap",
  slotTemplate: createPlaceholders("min-w-20"),
};
Gap.parameters = {
  docs: {
    description: {
      story: "Horizontal gap override.",
    },
  },
};

export const Align = EnumTemplate.bind({});
Align.args = {
  enum: "align",
  slotTemplate: createPlaceholders(),
  config: { wrapper: "h-40 !content-normal" },
};
Align.parameters = {
  docs: {
    description: {
      story: "Vertical alignment (align-items).",
    },
  },
};

export const Content: StoryFn<UGridArgs> = (args: UGridArgs, { argTypes }) => ({
  components: { UGrid, UText, UPlaceholder, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="lg" block>
      <UGrid
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        cols="3"
        class="h-52 w-full border border-primary border-dashed rounded-medium p-4"
      >
        <UPlaceholder :label="option" />
        <UPlaceholder :label="option" />
        <UPlaceholder :label="option" />
        <UPlaceholder :label="option" />
        <UPlaceholder :label="option" />
      </UGrid>
    </UCol>
  `,
});
Content.args = { enum: "content", gap: "md" };
Content.parameters = {
  docs: {
    description: {
      story: "Items vertical align for multi-row grid containers (align-content).",
    },
  },
};

export const Justify = EnumTemplate.bind({});
Justify.args = {
  enum: "justify",
  slotTemplate: createPlaceholders("w-auto min-w-20"),
};
Justify.parameters = {
  docs: {
    description: {
      story: "Horizontal alignment (justify-items).",
    },
  },
};
