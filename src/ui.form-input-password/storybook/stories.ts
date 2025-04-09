import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UInputPassword from "../UInputPassword.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UInputPasswordArgs extends Props {
  slotTemplate?: string;
}

export default {
  id: "3050",
  title: "Form Inputs & Controls / Input Password",
  component: UInputPassword,
  args: {
    modelValue: "",
  },
  argTypes: {
    ...getArgTypes(UInputPassword.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UInputPasswordArgs> = (args: UInputPasswordArgs) => ({
  components: { UInputPassword },
  setup() {
    const slots = getSlotNames(UInputPassword.__name);

    return { args, slots };
  },
  template: `
    <UInputPassword
      v-bind="args"
      v-model="args.modelValue"
      class="max-w-96"
    >
      ${args.slotTemplate || getSlotsFragment("")}
    </UInputPassword>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
