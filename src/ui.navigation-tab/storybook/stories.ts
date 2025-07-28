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
import UChip from "../../ui.other-chip/UChip.vue";
import UText from "../../ui.text-block/UText.vue";
import UAvatar from "../../ui.image-avatar/UAvatar.vue";

import johnDoe from "./assets/john-doe.png";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
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
  setup: () => ({ args, slots: getSlotNames(UTab.__name) }),
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
  setup: () => ({ args }),
  template: `
    <URow>
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
  components: { UTab, URow, UBadge, UAvatar, UChip, UText },
  setup: () => ({ args, johnDoe }),
  template: `
    <URow>
      <UTab v-bind="args" label="What's new?">
        <template #left>
          <UAvatar :src="johnDoe" size="3xs" rounded="full" />
        </template>
      </UTab>

      <UTab v-bind="args" label="Inbox">
        <template #label="{ label }">
          <UChip size="sm">
            <UText :label="label" color="primary" class="mr-1.5" />
          </UChip>
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
