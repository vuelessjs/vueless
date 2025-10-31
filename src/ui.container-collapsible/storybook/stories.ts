import { ref } from "vue";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UCollapsible from "../UCollapsible.vue";
import UButton from "../../ui.button/UButton.vue";
import UCard from "../../ui.container-card/UCard.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UCollapsibleArgs extends Props {
  slotTemplate?: string;
  enum: "yPosition" | "xPosition";
}

const defaultTemplate = `
  <template #default="{ opened }">
    <UButton :label="opened ? 'Close' : 'Open'" />
  </template>

  <template #content>
    <UCard title="Collapsible Content" description="This is the collapsible content area." />
  </template>
`;

export default {
  id: "5270",
  title: "Containers / Collapsible",
  component: UCollapsible,
  args: {
    slotTemplate: defaultTemplate,
  },
  argTypes: {
    ...getArgTypes(UCollapsible.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UCollapsible.__name),
      story: {
        height: "300px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UCollapsibleArgs> = (args: UCollapsibleArgs) => ({
  components: { UCollapsible, UButton, UCard },
  setup: () => ({ args, slots: getSlotNames(UCollapsible.__name) }),
  template: `
    <UCollapsible v-bind="args" v-model:open="args.open">
      ${args.slotTemplate || getSlotsFragment("")}
    </UCollapsible>
  `,
});

const EnumTemplate: StoryFn<UCollapsibleArgs> = (args: UCollapsibleArgs, { argTypes }) => ({
  components: { UCollapsible, UButton, UCard, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UCollapsible
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        v-model:open="args.open"
        :key="option"
      >
        ${args.slotTemplate}
      </UCollapsible>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const YPositions = EnumTemplate.bind({});
YPositions.args = { enum: "yPosition", slotTemplate: defaultTemplate };

export const XPositions = EnumTemplate.bind({});
XPositions.args = { enum: "xPosition" };

export const NonAbsolute: StoryFn<UCollapsibleArgs> = (args) => ({
  components: { UCollapsible, UButton, UCard, UCol },
  setup() {
    return { args };
  },
  template: `
    <UCol gap="md">
      <UCollapsible :absolute="false">
        <template #default="{ opened }">
          <UButton :label="opened ? 'Close' : 'Open'" />
        </template>
        <template #content>
          <UCard
            title="Non-Absolute Content"
            description="This content is not positioned absolutely, so it flows with the document."
          />
        </template>
      </UCollapsible>
      <div class="p-4 border border-gray-300 rounded">
        <p>This content appears below the collapsible and will be pushed down when it opens.</p>
      </div>
    </UCol>
  `,
});

export const VModel: StoryFn<UCollapsibleArgs> = (args) => ({
  components: { UCollapsible, UButton, UCard, URow },
  setup() {
    const isOpen = ref(false);

    function toggle() {
      isOpen.value = !isOpen.value;
    }

    return { args, isOpen, toggle };
  },
  template: `
    <UCol gap="md">
      <URow gap="md">
        <UButton label="Toggle Collapsible" @click="toggle" />
        <UButton :label="isOpen ? 'Close' : 'Open'" variant="outlined" @click="isOpen = !isOpen" />
      </URow>

      <UCollapsible v-model:open="isOpen">
        <template #default="{ opened }">
          <UButton :label="opened ? 'Opened' : 'Closed'" color="secondary" />
        </template>
        <template #content>
          <UCard
            title="Controlled Content"
            description="This collapsible is controlled by v-model. Use the buttons above to toggle it."
          />
        </template>
      </UCollapsible>
    </UCol>
  `,
});

export const CloseOnOutside: StoryFn<UCollapsibleArgs> = (args) => ({
  components: { UCollapsible, UButton, UCard },
  setup() {
    return { args };
  },
  template: `
    <div class="p-8">
      <p class="mb-4 text-sm text-gray-600">Click outside the collapsible content to close it.</p>
      <UCollapsible close-on-outside>
        <template #default="{ opened }">
          <UButton :label="opened ? 'Close' : 'Open'" />
        </template>
        <template #content>
          <UCard
            title="Click Outside to Close"
            description="This collapsible will close when you click outside of it."
          />
        </template>
      </UCollapsible>
    </div>
  `,
});

export const CloseOnContent: StoryFn<UCollapsibleArgs> = (args) => ({
  components: { UCollapsible, UButton, UCard },
  setup() {
    return { args };
  },
  template: `
    <div class="p-8">
      <p class="mb-4 text-sm text-gray-600">Click on the content to close the collapsible.</p>
      <UCollapsible close-on-content>
        <template #default="{ opened }">
          <UButton :label="opened ? 'Close' : 'Open'" />
        </template>
        <template #content>
          <UCard
            title="Click Content to Close"
            description="Click anywhere on this card to close the collapsible."
          />
        </template>
      </UCollapsible>
    </div>
  `,
});

export const Disabled: StoryFn<UCollapsibleArgs> = (args) => ({
  components: { UCollapsible, UButton, UCard },
  setup() {
    return { args };
  },
  template: `
    <UCollapsible disabled>
      <template #default="{ opened }">
        <UButton :label="opened ? 'Close' : 'Open'" disabled />
      </template>
      <template #content>
        <UCard title="Disabled Content" description="This content cannot be shown." />
      </template>
    </UCollapsible>
  `,
});

export const CustomContent: StoryFn<UCollapsibleArgs> = (args) => ({
  components: { UCollapsible, UButton, UCard, URow },
  setup() {
    return { args };
  },
  template: `
    <URow gap="xl">
      <UCollapsible>
        <template #default="{ opened }">
          <UButton
            :label="opened ? 'Hide Menu' : 'Show Menu'"
            :left-icon="opened ? 'expand_less' : 'expand_more'"
          />
        </template>
        <template #content>
          <UCard class="w-64">
            <div class="p-4 space-y-2">
              <div class="hover:bg-gray-100 p-2 rounded cursor-pointer">Menu Item 1</div>
              <div class="hover:bg-gray-100 p-2 rounded cursor-pointer">Menu Item 2</div>
              <div class="hover:bg-gray-100 p-2 rounded cursor-pointer">Menu Item 3</div>
              <div class="hover:bg-gray-100 p-2 rounded cursor-pointer">Menu Item 4</div>
            </div>
          </UCard>
        </template>
      </UCollapsible>

      <UCollapsible y-position="top">
        <template #default="{ opened }">
          <UButton
            :label="opened ? 'Hide Tooltip' : 'Show Tooltip'"
            variant="outlined"
          />
        </template>
        <template #content>
          <UCard class="w-48">
            <div class="p-3 text-sm">
              This is a tooltip-like collapsible that appears above the trigger.
            </div>
          </UCard>
        </template>
      </UCollapsible>
    </URow>
  `,
});
CustomContent.parameters = {
  docs: {
    story: {
      height: "300px",
    },
  },
};
