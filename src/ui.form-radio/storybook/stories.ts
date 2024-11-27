import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import URadio from "../../ui.form-radio/URadio.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { URadioProps } from "../types.ts";

interface URadioArgs extends URadioProps {
  slotTemplate?: string;
  enum: "variant" | "size";
}

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
    ...getArgTypes(URadio.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<URadioArgs> = (args: URadioArgs) => ({
  components: { URadio, UBadge },
  setup() {
    const slots = getSlotNames(URadio.__name);

    return { args, slots };
  },
  template: `
    <URadio v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </URadio>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true, name: "radio2" };

export const Description = DefaultTemplate.bind({});
Description.args = { name: "radio3", description: "description" };

export const Checked = DefaultTemplate.bind({});
Checked.args = { checked: true, name: "radio4" };

export const SlotFooter = DefaultTemplate.bind({});
SlotFooter.args = {
  name: "radio5",
  label: "radio",
  value: "radio",
  slotTemplate: `
    <template #footer>
      <UBadge label="favourite" color="green" size="sm" />
    </template>
  `,
};
