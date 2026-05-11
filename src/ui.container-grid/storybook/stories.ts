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
  class?: string;
  itemClass?: string;
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
        :class="args.class"
      >
        <UPlaceholder :label="option" class="h-auto" :class="args.itemClass" />
        <UPlaceholder :label="option" class="h-auto" :class="args.itemClass" />
        <UPlaceholder :label="option" class="h-auto" :class="args.itemClass" />
        <UPlaceholder :label="option" class="h-auto" :class="args.itemClass" />
        <UPlaceholder :label="option" class="h-auto" :class="args.itemClass" />
        <UPlaceholder :label="option" class="h-auto" :class="args.itemClass" />
      </UGrid>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { cols: "4", rows: "3", gap: "md" };

export const Gap = EnumTemplate.bind({});
Gap.args = { enum: "gap" };
Gap.parameters = {
  docs: {
    description: {
      story: "Gap between items.",
    },
  },
};

export const RowGap = EnumTemplate.bind({});
RowGap.args = { enum: "rowGap" };
RowGap.parameters = {
  docs: {
    description: {
      story: "Vertical gap override.",
    },
  },
};

export const ColGap = EnumTemplate.bind({});
ColGap.args = { enum: "colGap" };
ColGap.parameters = {
  docs: {
    description: {
      story: "Horizontal gap override.",
    },
  },
};

export const Justify = EnumTemplate.bind({});
Justify.args = { enum: "justify", itemClass: "w-auto min-w-20" };
Justify.parameters = {
  docs: {
    description: {
      story: "Horizontal alignment (justify-items).",
    },
  },
};

export const Align = EnumTemplate.bind({});
Align.args = {
  enum: "align",
  class: "h-40 !content-normal",
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

export const PlaceContent: StoryFn<UGridArgs> = (args: UGridArgs, { argTypes }) => ({
  components: { UGrid, UText, UPlaceholder, UCol },
  setup: () => {
    function getItemClass(option: string) {
      return option === "stretch" ? "w-auto" : "size-14";
    }

    function getGridClass(option: string) {
      return option === "stretch" ? "grid-cols-2" : "grid-cols-[repeat(2,56px)]";
    }

    return { args, argTypes, getArgs, getItemClass, getGridClass };
  },
  template: `
    <UCol block gap="lg">
      <UGrid
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="border border-primary border-dashed rounded p-4 w-full h-56"
        :class="getGridClass(option)"
      >
        <UPlaceholder :label="option" :class="getItemClass(option)" />
        <UPlaceholder :label="option" :class="getItemClass(option)" />
        <UPlaceholder :label="option" :class="getItemClass(option)" />
        <UPlaceholder :label="option" :class="getItemClass(option)" />
      </UGrid>
    </UCol>
  `,
});
PlaceContent.args = { enum: "placeContent" };
PlaceContent.parameters = {
  docs: {
    description: {
      story: "Control how content is justified and aligned within the grid (place-content).",
    },
  },
};

export const PlaceItems: StoryFn<UGridArgs> = (args: UGridArgs, { argTypes }) => ({
  components: { UGrid, UText, UPlaceholder, UCol },
  setup: () => {
    function getItemClass(option: string) {
      return option === "stretch" ? "w-auto" : "size-14";
    }

    return { args, argTypes, getArgs, getItemClass };
  },
  template: `
    <UCol block gap="lg">
      <UGrid
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        cols="3"
        class="border border-primary border-dashed rounded p-4 w-full h-56"
      >
        <UPlaceholder :label="option" :class="getItemClass(option)" />
        <UPlaceholder :label="option" :class="getItemClass(option)" />
        <UPlaceholder :label="option" :class="getItemClass(option)" />
        <UPlaceholder :label="option" :class="getItemClass(option)" />
        <UPlaceholder :label="option" :class="getItemClass(option)" />
        <UPlaceholder :label="option" :class="getItemClass(option)" />
      </UGrid>
    </UCol>
  `,
});
PlaceItems.args = { enum: "placeItems" };
PlaceItems.parameters = {
  docs: {
    description: {
      story: "Control how items are justified and aligned within the grid (place-items).",
    },
  },
};
