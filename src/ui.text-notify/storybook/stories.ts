import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import { notify } from "../utilNotify.js";

import UNotify from "../../ui.text-notify/UNotify.vue";
import UButton from "../../ui.button/UButton.vue";
import UCol from "../../ui.container-col/UCol.vue";

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
  setup: () => ({ args, notify }),
  template: `
    <UNotify class="m-4" />

    <UCol>
      <UButton
        label="Success"
        color="success"
        @click="notify({
          type: 'success',
          label: 'Hurray!',
          description: 'The file has been downloaded successfully.',
        })"
      />
      <UButton
        label="Warning"
        color="warning"
        @click="notify({
          type: 'warning',
          label: 'Be aware!',
          description: 'The file has been downloaded, but some data is missing. Please check the file and try again.',
        })"
      />
      <UButton
        label="Error"
        color="error"
        @click="notify({
          type: 'error',
          label: 'Ooops!',
          description: 'The file cant be downloaded, please check the file and try again.',
        })"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Position = DefaultTemplate.bind({});
Position.args = { xPosition: "right", yPosition: "bottom" };
Position.parameters = {
  docs: {
    description: {
      story: "Control notify's position in your layout via `xPosition` and `yPosition` props.",
    },
  },
};

export const Types = TypesTemplate.bind({});
Types.args = {};
