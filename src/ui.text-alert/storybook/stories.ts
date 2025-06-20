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
import ULink from "../../ui.button-link/ULink.vue";
import UText from "../../ui.text-block/UText.vue";
import UChip from "../../ui.other-chip/UChip.vue";

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
    title: "Scheduled Maintenance Notice",
    description: `
      Our website will be undergoing scheduled maintenance on March 15th from 2:00 AM to 4:00 AM UTC.
      Some features may be temporarily unavailable during this time. We appreciate your patience!
    `,
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

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumTemplate.bind({});
Colors.args = { enum: "color" };

export const Icon = DefaultTemplate.bind({});
Icon.args = { icon: "handyman" };

export const Closable = DefaultTemplate.bind({});
Closable.args = { closable: true };

export const CloseSlot = DefaultTemplate.bind({});
CloseSlot.args = {
  closable: true,
  slotTemplate: `
    <template #close="{ close }">
      <UButton
        label="Close"
        variant="ghost"
        size="sm"
        class="ml-2"
        @click="close"
      />
    </template>
  `,
};

export const Slots: StoryFn<UAlertArgs> = (args) => ({
  components: { UAlert, URow, UCol, UButton, UBadge, ULink, UText, UChip },
  setup() {
    return { args };
  },
  template: `
    <UCol>
      <UAlert
        title="New Feature Available"
        description="We've just released our new AI-powered analytics dashboard.
          Try it out and let us know what you think!"
        color="success"
        icon="question_mark"
        :config="{ contentWrapper: 'items-center' }"
      >
        <template #left>
          <UChip icon="arrow_outward" color="success" size="3xs">
            <ULink label="Try it out" color="success" size="sm" class="mr-1.5" />
          </UChip>
        </template>
      </UAlert>

      <UAlert
        title="MAINTENANCE"
        description="Scheduled maintenance will begin in 30 minutes. Estimated downtime: 2 hours."
        color="warning"
      >
        <template #title="{ title }">
          <UBadge
            :label="title"
            color="warning"
            variant="outlined"
          />
        </template>
      </UAlert>

      <UAlert
        title="Welcome to Vueless!"
        description="You've successfully joined our community.
          Check out our documentation to get started with building beautiful interfaces."
        color="info"
      >
        <template #description>
          <UCol gap="xs">
            <p>
              You've successfully joined our community. Check out our documentation
              to get started with building beautiful interfaces.
            </p>
            <URow gap="sm">
              <UButton
                label="View Docs"
                variant="subtle"
                size="xs"
                color="info"
              />
              <UButton
                label="Join Discord"
                variant="subtle"
                size="xs"
                color="info"
              />
            </URow>
          </UCol>
        </template>
      </UAlert>
    </UCol>
  `,
});
