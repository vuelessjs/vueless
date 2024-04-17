import { getArgTypes, getSlotNames } from "../service.storybook";

import URadio from "../ui.form-radio";
import UBadge from "../ui.text-badge";

export default {
  id: "3140",
  title: "Form Inputs & Controls / Radio",
  component: URadio,
  args: {
    name: "radio1",
    label: "radio",
    value: "1",
    color: "brand",
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
    <URadio v-bind="args" description="description">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </URadio>
  `,
});

const SlotTemplate = (args) => ({
  components: { URadio, UBadge },
  setup() {
    return { args };
  },
  template: `
    <URadio v-bind="args" description="description">
      ${args.slotTemplate}
    </URadio>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true, name: "radio2" };

export const description = DefaultTemplate.bind({});
description.args = { name: "radio3" };

export const checked = DefaultTemplate.bind({});
checked.args = { checked: true, name: "radio4" };

export const slotFooter = SlotTemplate.bind({});
slotFooter.args = {
  name: "radio5",
  label: "radio",
  value: "radio",
  slotTemplate: `
    <template #footer>
       <UBadge label="favourite" color="green" size="sm" />
    </template>
  `,
};
