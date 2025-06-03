import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UAlert from "../../ui.text-alert/UAlert.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UAlertArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "color" | "variant";
}

export default {
  id: "4030",
  title: "Text & Content / Alert",
  component: UAlert,
  args: {
    title: "Network Error",
  },
  argTypes: {
    ...getArgTypes(UAlert.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UAlert.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UAlertArgs> = (args: UAlertArgs) => ({
  components: { UAlert, UIcon, URow, UButton },
  setup: () => ({ args, slots: getSlotNames(UAlert.__name) }),
  template: `
    <UAlert v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UAlert>
  `,
});

const EnumTemplate: StoryFn<UAlertArgs> = (args: UAlertArgs, { argTypes }) => ({
  components: { UAlert, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol align="stretch">
      <UAlert
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = {
  description:
    "Unable to connect to the server. Please check your internet connection and try again.",
};

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant", title: "{enumValue}" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", title: "{enumValue}" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color", title: "{enumValue}" };

export const Closable = DefaultTemplate.bind({});
Closable.args = { closable: true };

export const CloseSlot = DefaultTemplate.bind({});
CloseSlot.args = {
  closable: true,
  slotTemplate: `
    <template #close="{ close }">
      <UButton
        label="Close"
        variant="solid"
        color="neutral"
        size="sm"
        @click="close"
      />
    </template>
  `,
};

export const Slots: StoryFn<UAlertArgs> = (args) => ({
  components: { UAlert, UIcon, URow, UBadge },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UAlert v-bind="args">
        <template #title>
          <UBadge
            label="Connection lost"
            size="lg"
            color="error"
            variant="outlined"
          />
        </template>
      </UAlert>

      <UAlert v-bind="args">
        <template #description>
          <UBadge
            label="We are trying to reconnect. Please wait a moment or check your network settings."
            color="error"
            variant="soft"
          />
        </template>
      </UAlert>

      <UAlert v-bind="args">
        <template #left>
          <UIcon name="warning" color="warning" />
        </template>
      </UAlert>
    </URow>
  `,
});
