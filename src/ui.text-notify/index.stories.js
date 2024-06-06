import { notify } from "./services";

import UNotify from "../ui.text-notify";
import UButton from "../ui.button";
import UGroup from "../ui.container-group";

import { getArgTypes } from "../service.storybook";

/**
 * The `UNotify` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.text-notify)
 */
export default {
  id: "4035",
  title: "Text & Content / Notify",
  component: UNotify,
  argTypes: {
    ...getArgTypes(UNotify.name),
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
    return { args };
  },
  template: `
    <UNotify class="m-4" v-bind="args" />
    <UButton label="Show notify" @click="onClick"/>
 `,
  methods: {
    onClick() {
      notify({
        type: "success",
        label: "Hurray!",
        description: "The file successfully downloaded.",
      });
    },
  },
});

const TypesTemplate = (args) => ({
  components: { UNotify, UButton, UGroup },
  setup() {
    return { args };
  },
  template: `
    <UNotify class="m-4" />

    <UGroup>
      <UButton label="Success" color="green" @click="onClick('success')"/>
      <UButton label="Warning" color="orange" @click="onClick('warning')"/>
      <UButton label="Error" color="red" @click="onClick('error')"/>
    </UGroup>
 `,
  methods: {
    onClick(type) {
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
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const position = DefaultTemplate.bind({});
position.args = { xPosition: "right", yPosition: "bottom" };

export const types = TypesTemplate.bind({});
types.args = {};
