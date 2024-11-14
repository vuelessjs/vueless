import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UToggleItem from "../../ui.button-toggle-item/UToggleItem.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UToggleItemProps } from "../types.ts";

interface UToggleItemArgs extends UToggleItemProps {
  slotTemplate?: string;
}

/**
 * The `UToggleItem` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.button-toggle-item)
 */
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

export const SlotLeft = DefaultTemplate.bind({});
SlotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};

export const SlotRight = DefaultTemplate.bind({});
SlotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};
