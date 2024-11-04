import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import { notify } from "../utilNotify.js";

import UNotify from "../../ui.text-notify/UNotify.vue";
import UButton from "../../ui.button/UButton.vue";
import UCol from "../../ui.container-col/UCol.vue";

/**
 * The `UNotify` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-notify)
 */
export default {
  id: "4035",
  title: "Text & Content / Notify",
  component: UNotify,
  argTypes: {
    ...getArgTypes(UNotify.__name),
  },
  parameters: {
    docs: {
      story: {
        height: "280px",
      },
    },
  },
};

const DefaultTemplate = (args) => ({
  components: { UNotify, UButton },
  setup() {
    function onClick() {
      notify({
        type: "success",
        label: "Hurray!",
        description: "The file successfully downloaded.",
      });
    }

    const slots = getSlotNames(UNotify.__name);

    return { args, slots, onClick };
  },
  template: `
    <UNotify class="m-4" v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UNotify>
    <UButton label="Show notify" @click="onClick"/>
  `,
});

const TypesTemplate = (args) => ({
  components: { UNotify, UButton, UCol },
  setup() {
    function onClick(type) {
      if (type === "success") {
        notify({
          type,
          label: "Hurray!",
          description: "The file successfully downloaded.",
        });
      }

      if (type === "warning") {
        notify({
          type,
          label: "Be aware!",
          description: "The file have been downloaded, but some data is missing.",
        });
      }

      if (type === "error") {
        notify({
          type,
          label: "Ooops!",
          description: "The file can't be downloaded, please check the fields and try again.",
        });
      }
    }

    return { args, onClick };
  },
  template: `
    <UNotify class="m-4" />

    <UCol>
      <UButton label="Success" color="green" @click="onClick('success')"/>
      <UButton label="Warning" color="orange" @click="onClick('warning')"/>
      <UButton label="Error" color="red" @click="onClick('error')"/>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Position = DefaultTemplate.bind({});
Position.args = { xPosition: "right", yPosition: "bottom" };

export const Types = TypesTemplate.bind({});
Types.args = {};
