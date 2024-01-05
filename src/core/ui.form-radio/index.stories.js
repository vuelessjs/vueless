import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import URadio from "vueless/ui.form-radio";

export default {
  title: "Form Inputs & Controls / Radio",
  component: URadio,
  args: {
    name: "radio1",
    label: "radio",
    description: "description",
    value: "1",
  },
  argTypes: {
    ...getArgTypes(URadio.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { URadio },
  setup() {
    const slots = getSlotNames(URadio.name);

    return { args, slots };
  },
  template: `
    <URadio v-bind="args" >
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </URadio>
  `,
});

const SlotTemplate = (args) => ({
  components: { URadio },
  setup() {
    return { args };
  },
  template: `
    <URadio v-bind="args">
      ${args.slotTemplate}
    </URadio>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true, name: "radio2" };

export const description = DefaultTemplate.bind({});
description.args = { description: "Some description", name: "radio3" };

export const checked = DefaultTemplate.bind({});
checked.args = { checked: true, name: "radio4" };

export const descriptionSlot = SlotTemplate.bind({});
descriptionSlot.args = {
  name: "radio4",
  label: "radio",
  value: "radio",
  slotTemplate: `
    <template #description>
       <div>slot description</div>
    </template>
  `,
};
