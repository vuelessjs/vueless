import { getArgTypes, getDocsDescription } from "../../utils/storybook";

import USplitter from "../USplitter.vue";
import UPlaceholder from "../../ui.container-placeholder/UPlaceholder.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

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
    docs: {
      ...getDocsDescription(USplitter.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<USplitterArgs> = (args: USplitterArgs) => ({
  components: { USplitter, UPlaceholder },
  setup: () => {
    const sizes = args.modelValue || [40, 60];

    return { args, sizes };
  },
  template: `
    <div class="h-80">
      <USplitter v-bind="args" v-model="sizes">
        <template #panel-1>
          <UPlaceholder label="Panel 1" />
        </template>
        <template #panel-2>
          <UPlaceholder label="Panel 2" />
        </template>
      </USplitter>
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const VerticalOrientation = DefaultTemplate.bind({});
VerticalOrientation.args = { vertical: true };

export const GutterSize = DefaultTemplate.bind({});
GutterSize.args = { gutterSize: 16 };

export const MinSizes = DefaultTemplate.bind({});
MinSizes.args = { minSizes: "30%", modelValue: [50, 50] };
MinSizes.parameters = {
  docs: {
    description: {
      story: [
        "Caps how small each panel can get while dragging.",
        "Use one value for every panel or an array for per-panel limits.",
        "Numbers are treated as pixels; strings can use `%` of the splitter axis or a `px` length.",
        "Here each panel stays at least 30% wide.",
      ].join(" "),
    },
  },
};

export const MaxSizes = DefaultTemplate.bind({});
MaxSizes.args = { maxSizes: "65%", modelValue: [50, 50] };
MaxSizes.parameters = {
  docs: {
    description: {
      story: [
        "Caps how large each panel can grow. Omitted means a panel may use the full container.",
        "Here neither panel can exceed 65% width.",
      ].join(" "),
    },
  },
};

export const ResizeStep = DefaultTemplate.bind({});
ResizeStep.args = { resizeStep: 10 };
ResizeStep.parameters = {
  docs: {
    description: {
      story: "Increments/decrements the size of the panels while pressing the arrow keys.",
    },
  },
};

export const StateKeyAndStorage = DefaultTemplate.bind({});
StateKeyAndStorage.args = { stateKey: "splitter-state", stateStorage: "local" };
StateKeyAndStorage.parameters = {
  docs: {
    description: {
      story: [
        "`stateKey` is the storage entry name: when set, the splitter saves panel sizes after each resize",
        "and restores them on the next visit.",
        "`stateStorage` chooses where that data lives—`session` (sessionStorage, cleared when the tab closes)",
        "or `local` (localStorage, persists across sessions).",
        "This story uses local storage so you can reload the page and keep your layout.",
      ].join(" "),
    },
  },
};

export const Nested: StoryFn<USplitterArgs> = (args: USplitterArgs) => ({
  components: { USplitter, UPlaceholder },
  setup: () => {
    const sizes = args.modelValue || [35, 65];

    return { args, sizes };
  },
  template: `
    <div class="h-80">
      <USplitter v-bind="args" v-model="sizes">
        <template #panel-1>
          <UPlaceholder label="Panel 1" />
        </template>
        <template #panel-2>
          <USplitter v-bind="args" v-model="sizes" vertical>
            <template #panel-1>
              <UPlaceholder label="Panel 2" />
            </template>
            <template #panel-2>
              <UPlaceholder label="Panel 3" />
            </template>
          </USplitter>
        </template>
      </USplitter>
    </div>
  `,
});

export const HandleSlot: StoryFn<USplitterArgs> = (args: USplitterArgs) => ({
  components: { USplitter, UPlaceholder, UIcon },
  setup: () => {
    const sizes = args.modelValue || [40, 60];

    return { args, sizes };
  },
  template: `
    <div class="h-80">
      <USplitter v-bind="args" v-model="sizes">
        <template #panel-1>
          <UPlaceholder label="Panel 1" />
        </template>
        <template #panel-2>
          <UPlaceholder label="Panel 2" />
        </template>
        <template #handle>
          <UIcon
            name="drag_handle"
            size="sm"
            color="neutral"
            interactive
            class="rotate-90 cursor-col-resize text-muted"
          />
        </template>
      </USplitter>
    </div>
  `,
});
