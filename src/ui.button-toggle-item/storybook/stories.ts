import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UToggleItem from "../../ui.button-toggle-item/UToggleItem.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UToggleItemArgs extends Props {
  slotTemplate?: string;
}

export default {
  title: "Buttons & Links / Toggle Item",
  component: UToggleItem,
  args: {
    value: "1",
    label: "Label",
    modelValue: "",
  },
  argTypes: {
    ...getArgTypes(UToggleItem.__name),
    value: { control: { type: "text" } },
  },
  parameters: {
    docs: {
      ...getDocsDescription(UToggleItem.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UToggleItemArgs> = (args: UToggleItemArgs) => ({
  components: { UToggleItem, UIcon },
  setup() {
    const slots = getSlotNames(UToggleItem.__name);

    return { args, slots };
  },
  template: `
    <UToggleItem
        v-bind="args"
        v-model="args.modelValue"
        name="toggle"
      >
        ${args.slotTemplate || getSlotsFragment("")}
    </UToggleItem>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const Slots: StoryFn<UToggleItemArgs> = (args) => ({
  components: { UToggleItem, UIcon, URow },
  setup() {
    return { args };
  },
  template: `
  <URow>
    <UToggleItem label="Download">
      <template #left>
        <UIcon
          name="download"
          color="green"
          size="sm"
        />
      </template>
    </UToggleItem>

    <UToggleItem label="Edit">
      <template #right>
        <UIcon
          name="edit"
          color="orange"
          size="sm"
        />
      </template>
    </UToggleItem>
  </URow>
  `,
});
