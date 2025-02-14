import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UTabs from "../../ui.navigation-tabs/UTabs.vue";

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
      { label: "Tab 1", value: "1" },
      { label: "Tab 2", value: "2" },
      { label: "Tab 3", value: "3" },
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
  setup() {
    const slots = getSlotNames(UTabs.__name);

    return { args, slots };
  },
  template: `
    <UTabs v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UTabs>
  `,
});

const EnumVariantTemplate: StoryFn<UTabsArgs> = (args: UTabsArgs, { argTypes }) => ({
  components: { UTabs },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <div class="space-y-16">
      <UTabs
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        v-model="args.modelValue"
        :[args.enum]="option"
      />
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const DisabledTab = DefaultTemplate.bind({});
DisabledTab.args = {
  options: [
    { label: "Tab 1", value: 1 },
    { label: "Tab 2", value: 2, disabled: true },
    { label: "Tab 3", value: 3 },
  ],
};

export const Scrollable = DefaultTemplate.bind({});
Scrollable.args = {
  options: getOptionsArray(),
  scrollable: true,
};
