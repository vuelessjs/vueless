import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UButtonGroupItem from "vueless/ui.button-group-item";
import UIcon from "vueless/ui.image-icon";

export default {
  title: "Buttons & Links / Button Group Item",
  component: UButtonGroupItem,
  args: {
    value: "1",
    label: "Label",
  },
  argTypes: {
    ...getArgTypes(UButtonGroupItem.name),
    value: { control: { type: "text" } },
  },
};

const DefaultTemplate = (args) => ({
  components: { UButtonGroupItem },
  setup() {
    const slots = getSlotNames(UButtonGroupItem.name);

    return { args, slots };
  },
  template: `
    <UButtonGroupItem name="defaultTemplate" v-bind="args">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </UButtonGroupItem>
  `,
});

const SlotTemplate = (args) => ({
  components: { UButtonGroupItem, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UButtonGroupItem label="Label" v-bind="args">
      ${args.slotTemplate}
    </UButtonGroupItem>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const slotLeft = SlotTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon
        name="star"
        color="black"
        size="md"
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
        color="black"
        size="md"
       />
    </template>
  `,
};
