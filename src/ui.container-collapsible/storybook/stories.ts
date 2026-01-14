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
  class?: string;
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
    <UCollapsible v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UCollapsible>
  `,
});

const EnumTemplate: StoryFn<UCollapsibleArgs> = (args: UCollapsibleArgs, { argTypes }) => ({
  components: { UCollapsible, UButton, UCard, URow },
  setup: () => {
    const openStates = ref<Record<string, boolean>>({});

    return { args, argTypes, getArgs, openStates };
  },
  template: `
    <URow>
      <UCollapsible
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        v-model:open="openStates[option]"
        :key="option"
      >
        ${args.slotTemplate}
      </UCollapsible>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

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

export const XPosition = EnumTemplate.bind({});
XPosition.args = { enum: "xPosition" };

export const YPosition = EnumTemplate.bind({});
YPosition.args = { enum: "yPosition" };
YPosition.parameters = {
  storyClasses: "h-[450px] flex items-center px-6 pt-8 pb-12",
};

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

export const NoCloseOnOutside = DefaultTemplate.bind({});
NoCloseOnOutside.args = { closeOnOutside: false };

export const CloseOnContent = DefaultTemplate.bind({});
CloseOnContent.args = { closeOnContent: true };
