import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UToggleItem from "../../ui.button-toggle-item/UToggleItem.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

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
};

const DefaultTemplate = (args) => ({
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
        ${args.slotTemplate || getSlotsFragment()}
    </UToggleItem>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon
        name="star"
        color="green"
      />
    </template>
  `,
};
