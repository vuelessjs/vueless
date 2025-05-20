import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UTabs from "../../ui.navigation-tabs/UTabs.vue";
import URow from "../../ui.container-row/URow.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UTabsArgs extends Props {
  slotTemplate?: string;
  enum: "size";
}

export default {
  id: "8020",
  title: "Navigation / Tabs",
  component: UTabs,
  args: {
    modelValue: "1",
    options: [
      { label: "Dashboard", value: "1" },
      { label: "Orders", value: "2" },
      { label: "Settings", value: "3" },
    ],
  },
  argTypes: {
    ...getArgTypes(UTabs.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UTabs.__name),
    },
  },
} as Meta;

function getOptionsArray(count = 40) {
  return Array.from({ length: count }, (_, index) => ({
    label: `Tab ${index + 1}`,
    value: (index + 1).toString(),
  }));
}

const DefaultTemplate: StoryFn<UTabsArgs> = (args: UTabsArgs) => ({
  components: { UTabs },
  setup: () => ({ args, slots: getSlotNames(UTabs.__name) }),
  template: `
    <UTabs v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UTabs>
  `,
});

const EnumTemplate: StoryFn<UTabsArgs> = (args: UTabsArgs, { argTypes }) => ({
  components: { UTabs, URow, ULabel },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UTabs
      v-for="option in argTypes?.[args.enum]?.options"
      v-bind="getArgs(args, option)"
      :key="option"
      v-model="args.modelValue"
      class="mb-4"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumTemplate.bind({});
Sizes.args = {
  enum: "size",
  options: [
    { label: "{enumValue}", value: "1" },
    { label: "{enumValue}", value: "2" },
    { label: "{enumValue}", value: "3" },
  ],
};

export const Scrollable = DefaultTemplate.bind({});
Scrollable.args = {
  options: getOptionsArray(),
  scrollable: true,
};

export const Block = DefaultTemplate.bind({});
Block.args = { block: true };

export const Square = DefaultTemplate.bind({});
Square.args = { square: true };
Square.parameters = {
  docs: {
    description: {
      story: "Set the same paddings for the tabs.",
    },
  },
};

export const Slots: StoryFn<UTabsArgs> = (args) => ({
  components: { UTabs },
  setup() {
    args.config = { next: "flex items-center", prev: "flex items-center" };

    return { args, getOptionsArray };
  },
  template: `
    <UTabs
      v-bind="args"
      :options="getOptionsArray()"
      scrollable
    >
      <template #prev>
        <span class="cursor-pointer">◀️</span>
      </template>
      <template #next>
        <span class="cursor-pointer">▶️</span>
      </template>
    </UTabs>
  `,
});
Slots.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "When the `scrollable` prop is set to `true`, you can replace the default `prev` and `next` slot icons with custom content.",
    },
  },
};
