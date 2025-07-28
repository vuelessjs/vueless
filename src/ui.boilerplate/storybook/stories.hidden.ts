import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UBoilerplate from "../UBoilerplate.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types.ts";

interface UBoilerplateArgs extends Props {
  slotTemplate?: string;
}

export default {
  id: "{{component_id}}",
  title: "Custom / UBoilerplate",
  component: UBoilerplate,
  args: {
    /* predefine prop values here */
  },
  argTypes: {
    ...getArgTypes(UBoilerplate.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UBoilerplateArgs> = (args: UBoilerplateArgs) => ({
  components: { UBoilerplate },
  setup() {
    const slots = getSlotNames(UBoilerplate.__name);

    return { args, slots };
  },
  template: `
    <UBoilerplate v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UBoilerplate>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
