import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UKey from "../../ui.text-key/UKey.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UKeyArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size" | "color";
  outerEnum: "variant";
}

export default {
  id: "4096",
  title: "Text & Content / Key",
  component: UKey,
  args: {
    value: "K",
  },
  argTypes: {
    ...getArgTypes(UKey.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UKey.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UKeyArgs> = (args: UKeyArgs) => ({
  components: { UKey },
  setup: () => ({ args, slots: getSlotNames(UKey.__name) }),
  template: `
    <UKey v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UKey>
  `,
});

const EnumTemplate: StoryFn<UKeyArgs> = (args: UKeyArgs, { argTypes }) => ({
  components: { UKey, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UKey
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </URow>
  `,
});

const MultiEnumTemplate: StoryFn<UKeyArgs> = (args: UKeyArgs, { argTypes }) => ({
  components: { UKey, URow, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol>
      <URow v-for="outerOption in argTypes?.[args.outerEnum]?.options" :key="outerOption">
        <UKey
          v-for="option in argTypes?.[args.enum]?.options"
          v-bind="getArgs(args, option, outerOption)"
          :key="option"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = MultiEnumTemplate.bind({});
Colors.args = { outerEnum: "variant", enum: "color", value: "K" };

export const SystemKeys: StoryFn<UKeyArgs> = (args) => ({
  components: { UKey, URow, UCol },
  setup() {
    return { args };
  },
  template: `
    <UCol>
      <URow>
        <UKey value="command" />
        <UKey value="shift" />
        <UKey value="alt" />
        <UKey value="ctrl" />
      </URow>
      <URow>
        <UKey value="enter" />
        <UKey value="delete" />
        <UKey value="escape" />
        <UKey value="tab" />
      </URow>
      <URow>
        <UKey value="up" />
        <UKey value="down" />
        <UKey value="left" />
        <UKey value="right" />
      </URow>
      <URow>
        <UKey value="pageup" />
        <UKey value="pagedown" />
        <UKey value="home" />
        <UKey value="end" />
      </URow>
    </UCol>
  `,
});

export const Shortcuts: StoryFn<UKeyArgs> = (args) => ({
  components: { UKey, URow, UCol },
  setup() {
    return { args };
  },
  template: `
    <UCol>
      <URow>
        <UKey value="command" />
        <span>+</span>
        <UKey value="K" />
      </URow>
      <URow>
        <UKey value="ctrl" />
        <span>+</span>
        <UKey value="shift" />
        <span>+</span>
        <UKey value="P" />
      </URow>
      <URow>
        <UKey value="alt" />
        <span>+</span>
        <UKey value="F4" />
      </URow>
    </UCol>
  `,
});

export const Slots: StoryFn<UKeyArgs> = (args) => ({
  components: { UKey, URow },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UKey value="K">
        <template #default="{ value }">
          Custom: {{ value }}
        </template>
      </UKey>
    </URow>
  `,
});
