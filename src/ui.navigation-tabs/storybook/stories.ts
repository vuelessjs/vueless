import {
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
  components: { UTabs, URow, ULabel },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `

    <URow
      v-for="(option, index) in options"
      :key="index"
      align="center"
    >
      <ULabel :label="option">
        <UTabs
          v-bind="args"
          v-model="args.modelValue"
          :[args.enum]="option"
        />
      </ULabel>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
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
