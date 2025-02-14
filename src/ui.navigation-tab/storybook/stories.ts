import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UTab from "../../ui.navigation-tab/UTab.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

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

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
      <div class="flex items-center">
        <UIcon name="star" size="sm" color="inherit" />
      </div>
    </template>
  `,
};
