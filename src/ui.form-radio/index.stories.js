import { getArgTypes, getSlotNames, getSlotsFragment } from "../utils/utilstorybook";

import URadio from "../ui.form-radio";
import UBadge from "../ui.text-badge";

/**
 * The `URadio` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-radio)
 */
export default {
  id: "3140",
  title: "Form Inputs & Controls / Radio",
  component: URadio,
  args: {
    name: "radio1",
    label: "Radio",
    value: "1",
    color: "brand",
  },
  argTypes: {
    ...getArgTypes(URadio.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { URadio, UBadge },
  setup() {
    const slots = getSlotNames(URadio.name);

    return { args, slots };
  },
  template: `
    <URadio v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </URadio>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true, name: "radio2" };

export const description = DefaultTemplate.bind({});
description.args = { name: "radio3", description: "description" };

export const checked = DefaultTemplate.bind({});
checked.args = { checked: true, name: "radio4" };

export const slotFooter = DefaultTemplate.bind({});
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
