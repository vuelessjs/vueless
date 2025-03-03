import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UTab from "../../ui.navigation-tab/UTab.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UTabArgs extends Props {
  slotTemplate?: string;
}

export default {
  id: "8010",
  title: "Navigation / Tab",
  component: UTab,
  args: {
    label: "Tab",
  },
  argTypes: {
    ...getArgTypes(UTab.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UTab.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UTabArgs> = (args: UTabArgs) => ({
  components: { UTab, UIcon },
  setup() {
    const slots = getSlotNames(UTab.__name);

    return { args, slots };
  },
  template: `
    <UTab v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UTab>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const IconProps: StoryFn<UTabArgs> = (args) => ({
  components: { UTab, URow },
  setup() {
    return { args };
  },
  template: `
    <URow no-mobile>
      <UTab
        v-bind="args"
        label="Inbox"
        left-icon="inbox"
      />
      <UTab
        v-bind="args"
        icon="inbox_customize"
      />
      <UTab
        v-bind="args"
        label="Spam"
        right-icon="error"
      />
    </URow>
  `,
});

export const Slots: StoryFn<UTabArgs> = (args) => ({
  components: { UTab, URow, UBadge },
  setup() {
    return { args };
  },
  template: `
    <URow no-mobile>
      <UTab v-bind="args" label="What's new?">
        <template #left>
          <UBadge label="Info" size="sm" />
        </template>
      </UTab>

      <UTab v-bind="args" label="Inbox">
        <template #label="{ label }">
          <UBadge :label="label" size="sm" />
        </template>
      </UTab>

      <UTab v-bind="args" >
        <template #right>
          <UBadge label="New!" size="sm" />
        </template>
      </UTab>
    </URow>
  `,
});
