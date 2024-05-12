import { getArgTypes, getSlotNames } from "../service.storybook";

import UToggleItem from "../ui.button-toggle-item";
import UIcon from "../ui.image-icon";

export default {
  title: "Buttons & Links / Toggle Item",
  component: UToggleItem,
  args: {
    value: "1",
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UToggleItem.name),
    value: { control: { type: "text" } },
  },
};

const DefaultTemplate = (args) => ({
  components: { UToggleItem },
  setup() {
    const slots = getSlotNames(UToggleItem.name);

    return { args, slots };
  },
  template: `
    <UToggleItem v-bind="args" name="toggle">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UToggleItem>
  `,
});

const SlotTemplate = (args) => ({
  components: { UToggleItem, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UToggleItem v-bind="args" label="Label" >
      ${args.slotTemplate}
    </UToggleItem>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const slotLeft = SlotTemplate.bind({});
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

export const slotRight = SlotTemplate.bind({});
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
