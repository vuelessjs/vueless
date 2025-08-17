import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UTabs from "../../ui.navigation-tabs/UTabs.vue";
import URow from "../../ui.container-row/URow.vue";
import ULabel from "../../ui.form-label/ULabel.vue";
import UTab from "../../ui.navigation-tab/UTab.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

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
Sizes.args = { enum: "size" };

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

export const DefaultSlot: StoryFn<UTabsArgs> = (args) => ({
  components: { UTabs, UTab },
  setup: () => ({ args, getOptionsArray }),
  template: `
    <UTabs v-model="args.modelValue">
      <UTab label="Custom Tab 1" value="1" />
      <UTab label="Custom Tab 2" value="2" disabled />
      <UTab label="Custom Tab 3" value="3" />
    </UTabs>
  `,
});

export const PrevNextSlots: StoryFn<UTabsArgs> = (args) => ({
  components: { UTabs },
  setup: () => ({ args, getOptionsArray }),
  template: `
    <UTabs
      v-bind="args"
      :options="getOptionsArray()"
      scrollable
      :config="{ next: 'flex items-center', prev: 'flex items-center' }"
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
PrevNextSlots.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "When the `scrollable` prop is set to `true`, you can replace the default `prev` and `next` slot icons with custom content.",
    },
  },
};
