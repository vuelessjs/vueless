import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import {
  notify,
  notifySuccess,
  notifyWarning,
  notifyError,
  clearNotifications,
  setDelayedNotify,
  getDelayedNotify,
} from "../utilNotify.js";

import UNotify from "../../ui.text-notify/UNotify.vue";
import UButton from "../../ui.button/UButton.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UNotifyArgs extends Props {
  slotTemplate?: string;
}

export default {
  id: "4040",
  title: "Text & Content / Notify",
  component: UNotify,
  argTypes: {
    ...getArgTypes(UNotify.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UNotify.__name),
      story: {
        height: "280px",
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UNotifyArgs> = (args: UNotifyArgs) => ({
  components: { UNotify, UButton },
  setup: () => ({ args, slots: getSlotNames(UNotify.__name), notify }),
  template: `
    <UNotify class="m-4" v-bind="args">
      ${args.slotTemplate || getSlotsFragment("")}
    </UNotify>
    <UButton
      label="Show notify"
      @click="notify({
        type: 'success',
        label: 'Hurray!',
        description: 'The file has been downloaded successfully.',
      })"
    />
  `,
});

const TypesTemplate: StoryFn<UNotifyArgs> = (args: UNotifyArgs) => ({
  components: { UNotify, UButton, UCol },
  setup: () => ({ args, notify, notifyWarning, notifyError }),
  template: `
    <UNotify class="m-4" notify-id="type" />

    <UCol>
      <UButton
        label="Success"
        color="success"
        @click="notify({
          type: 'success',
          description: 'The file has been downloaded successfully.',
          notifyId: 'type'
        })"
      />
      <UButton
        label="Warning"
        color="warning"
        @click="notifyWarning({
          label: 'Be aware!',
          description: 'The file has been downloaded, but some data is missing. Please check the file and try again.',
          notifyId: 'type'
        })"
      />
      <UButton
        label="Error"
        color="error"
        @click="notifyError({
          label: 'Ooops!',
          description: 'The file cant be downloaded, please check the file and try again.',
          notifyId: 'type'
        })"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Position: StoryFn<UNotifyArgs> = (args: UNotifyArgs) => ({
  components: { UNotify, UButton, UCol, URow },
  setup: () => ({ args, notify }),
  template: `
    <UNotify class="m-4" v-bind="args" notify-id="top-left" xPosition="left" yPosition="top"  />
    <UNotify class="m-4" v-bind="args" notify-id="top-right" xPosition="right" yPosition="top" />
    <UNotify class="m-4" v-bind="args" notify-id="bottom-left" xPosition="left" yPosition="bottom" />
    <UNotify class="m-4" v-bind="args" notify-id="bottom-right" xPosition="right" yPosition="bottom" />

    <UCol justify="center" class="h-full">
      <URow justify="center" block>
        <UButton
          label="Top left"
          @click="notify({
            type: 'success',
            label: 'Hurray!',
            description: 'The file has been downloaded successfully.',
            notifyId: 'top-left',
          })"
        />

        <UButton
          label="Top right"
          @click="notify({
            type: 'success',
            label: 'Hurray!',
            description: 'The file has been downloaded successfully.',
            notifyId: 'top-right',
          })"
        />
      </URow>

      <URow justify="center" block>
        <UButton
          label="Bottom left"
          @click="notify({
            type: 'success',
            label: 'Hurray!',
            description: 'The file has been downloaded successfully.',
            notifyId: 'bottom-left',
          })"
        />

        <UButton
          label="Bottom right"
          @click="notify({
            type: 'success',
            label: 'Hurray!',
            description: 'The file has been downloaded successfully.',
            notifyId: 'bottom-right',
          })"
        />
      </URow>
    </UCol>
  `,
});
Position.parameters = {
  storyClasses: "h-[280px]",
  docs: {
    description: {
      story: "Control notify's position in your layout via `xPosition` and `yPosition` props.",
    },
  },
};

export const Types = TypesTemplate.bind({});
Types.args = {};
Types.parameters = {
  docs: {
    description: {
      story: `
Control the predefined notification type using the \`type\` parameter in the \`notify\` function
<b>OR</b> using \`notifySuccess\`, \`notifyWarning\`, \`notifyError\` shortcut methods
to trigger notification of a specific type.
      `,
    },
  },
};

export const Duration: StoryFn<UNotifyArgs> = (args: UNotifyArgs) => ({
  components: { UNotify, UButton },
  setup: () => ({ args, notify }),
  template: `
    <UNotify class="m-4" v-bind="args" notify-id="duration" />

    <UButton
      label="Show notify"
      @click="notify({
        type: 'success',
        label: 'Hurray!',
        description: 'The file has been downloaded successfully.',
        notifyId: 'duration',
        duration: 1000,
      })"
    />
  `,
});
Duration.parameters = {
  docs: {
    description: {
      story:
        "Control the notification duration using the `duration` parameter in the `notify` function.",
    },
  },
};

export const IgnoreDuplicates: StoryFn<UNotifyArgs> = (args: UNotifyArgs) => ({
  components: { UNotify, UButton },
  setup: () => ({ args, notifySuccess }),
  template: `
    <UNotify class="m-4" v-bind="args" notify-id="ignore-duplicates" />

    <UButton
      label="Show notify"
      @click="notifySuccess({
        label: 'Hurray!',
        description: 'The file has been downloaded successfully.',
        notifyId: 'ignore-duplicates',
        ignoreDuplicates: true,
      })"
    />
  `,
});
IgnoreDuplicates.parameters = {
  docs: {
    description: {
      story: `
The \`ignoreDuplicates\` parameter prevents multiple notifications
with the same \`description\` from appearing at the same time.
      `,
    },
  },
};

export const ClearNotifications: StoryFn<UNotifyArgs> = (args: UNotifyArgs) => ({
  components: { UNotify, UButton, UCol },
  setup: () => ({ args, notifySuccess, clearNotifications }),
  template: `
    <UNotify class="m-4" v-bind="args" notify-id="clear" />

    <UCol>
      <UButton
        label="Show notify"
        @click="notifySuccess({
          label: 'Hurray!',
          description: 'The file has been downloaded successfully.',
          notifyId: 'clear',
        })"
      />

      <UButton label="Clear all" color="neutral" @click="clearNotifications('clear')" />
    </UCol>
  `,
});
ClearNotifications.parameters = {
  docs: {
    description: {
      story: `
\`clearNotifications\` method allows you to clear active notifications of a specific instance.
      `,
    },
  },
};

export const DelayedNotifications: StoryFn<UNotifyArgs> = (args: UNotifyArgs) => ({
  components: { UNotify, UButton, UCol, URow },
  setup: () => ({ args, setDelayedNotify, getDelayedNotify }),
  template: `
    <UNotify
      class="m-4"
      v-bind="args"
      notify-id="delayed-notify-1"
      xPosition="left"
      yPosition="bottom"
    />

    <UNotify
      class="m-4"
      v-bind="args"
      notify-id="delayed-notify-2"
      xPosition="right"
      yPosition="bottom"
    />

    <URow block justify="between">
      <UCol>
        <UButton
          label="Set notify 1"
          @click="setDelayedNotify({
            type: 'success',
            label: 'Hurray!',
            description: 'Notification 1: The file has been downloaded successfully.',
            notifyId: 'delayed-notify-1',
          })"
        />

        <UButton label="Get notify 1" color="neutral" @click="getDelayedNotify('delayed-notify-1')" />
      </UCol>

      <UCol>
        <UButton
          label="Set notify 2"
          @click="setDelayedNotify({
            type: 'success',
            label: 'Hurray!',
            description: 'Notification 2: The file has been downloaded successfully.',
            notifyId: 'delayed-notify-2',
          })"
        />

        <UButton label="Get notify 2" color="neutral" @click="getDelayedNotify('delayed-notify-2')" />
      </UCol>
    </URow>
  `,
});
DelayedNotifications.parameters = {
  docs: {
    description: {
      story: `
Use \`setDelayedNotify\` and \`getDelayedNotify\` methods to create
a delayed notification which you can trigger any time later.
      `,
    },
  },
};
