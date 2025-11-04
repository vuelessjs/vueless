import { getArgTypes, getDocsDescription } from "../../utils/storybook.ts";

import USplitter from "../USplitter.vue";
import UPlaceholder from "../../ui.other-placeholder/UPlaceholder.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types.ts";

interface USplitterArgs extends Props {
  slotTemplate?: string;
}

export default {
  id: "5085",
  title: "Containers / Splitter",
  component: USplitter,
  argTypes: {
    ...getArgTypes(USplitter.__name),
  },
  parameters: {
    storyClasses: "p-0",
    docs: {
      ...getDocsDescription(USplitter.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<USplitterArgs> = (args: USplitterArgs) => ({
  components: { USplitter, UPlaceholder },
  setup: () => {
    const sizes = args.modelValue || [50, 50];

    return { args, sizes };
  },
  template: `
    <div style="height: 400px;">
      <USplitter v-bind="args" v-model="sizes">
        <template #panel-1>
          <UPlaceholder label="Panel 1" inset />
        </template>
        <template #panel-2>
          <UPlaceholder label="Panel 1"  inset />
        </template>
      </USplitter>
    </div>
  `,
});

const VerticalTemplate: StoryFn<USplitterArgs> = (args: USplitterArgs) => ({
  components: { USplitter, UPlaceholder },
  setup: () => {
    const sizes = args.modelValue || [50, 50];

    return { args, sizes };
  },
  template: `
    <div style="height: 400px;">
      <USplitter v-bind="args" v-model="sizes" orientation="vertical">
        <template #panel-1>
          <UPlaceholder inset />
        </template>
        <template #panel-2>
          <UPlaceholder inset />
        </template>
      </USplitter>
    </div>
  `,
});

const ThreePanelsTemplate: StoryFn<USplitterArgs> = (args: USplitterArgs) => ({
  components: { USplitter, UPlaceholder },
  setup: () => {
    const sizes = args.modelValue || [33.33, 33.33, 33.34];

    return { args, sizes };
  },
  template: `
    <div style="height: 400px;">
      <USplitter v-bind="args" v-model="sizes">
        <template #panel-1>
          <UPlaceholder inset />
        </template>
        <template #panel-2>
          <UPlaceholder inset />
        </template>
        <template #panel-3>
          <UPlaceholder inset />
        </template>
      </USplitter>
    </div>
  `,
});

const MinMaxTemplate: StoryFn<USplitterArgs> = (args: USplitterArgs) => ({
  components: { USplitter, UPlaceholder },
  setup: () => {
    const sizes = args.modelValue || [30, 70];

    return { args, sizes };
  },
  template: `
    <div style="height: 400px;">
      <USplitter
        v-bind="args"
        v-model="sizes"
        :min-sizes="20"
        :max-sizes="80"
      >
        <template #panel-1>
          <UPlaceholder inset />
        </template>
        <template #panel-2>
          <UPlaceholder inset />
        </template>
      </USplitter>
    </div>
  `,
});

const NestedTemplate: StoryFn<USplitterArgs> = (args: USplitterArgs) => ({
  components: { USplitter, UPlaceholder },
  setup: () => {
    const outerSizes = [30, 70];
    const innerSizes = [50, 50];

    return { args, outerSizes, innerSizes };
  },
  template: `
    <div style="height: 400px;">
      <USplitter v-bind="args" v-model="outerSizes">
        <template #panel-1>
          <UPlaceholder inset />
        </template>
        <template #panel-2>
          <USplitter v-model="innerSizes" orientation="vertical">
            <template #panel-1>
              <UPlaceholder inset />
            </template>
            <template #panel-2>
              <UPlaceholder inset />
            </template>
          </USplitter>
        </template>
      </USplitter>
    </div>
  `,
});

const CustomHandleTemplate: StoryFn<USplitterArgs> = (args: USplitterArgs) => ({
  components: { USplitter, UPlaceholder },
  setup: () => {
    const sizes = args.modelValue || [50, 50];

    return { args, sizes };
  },
  template: `
    <div style="height: 400px;">
      <USplitter v-bind="args" v-model="sizes">
        <template #panel-1>
          <UPlaceholder inset />
        </template>
        <template #panel-2>
          <UPlaceholder inset />
        </template>
        <template #handle>
          <div
            class="size-2 rounded-full bg-grayscale-900"
          />
        </template>
      </USplitter>
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Vertical = VerticalTemplate.bind({});
Vertical.args = {};

export const ThreePanels = ThreePanelsTemplate.bind({});
ThreePanels.args = {};

export const MinMaxSizes = MinMaxTemplate.bind({});
MinMaxSizes.args = {};

export const Nested = NestedTemplate.bind({});
Nested.args = {};

export const CustomHandle = CustomHandleTemplate.bind({});
CustomHandle.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = {
  disabled: true,
};

export const WithPersistence = DefaultTemplate.bind({});
WithPersistence.args = {
  stateKey: "vueless-splitter-demo",
  stateStorage: "local",
};
