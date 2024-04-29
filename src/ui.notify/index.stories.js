import { notify } from "../ui.notify/services";

import UNotify from "../ui.notify";
import UButton from "../ui.button";

import { getArgTypes } from "../service.storybook";

export default {
  title: "Other / Notify",
  component: UNotify,
  args: {
    type: "success",
    label: "",
    text: "",
  },
  argTypes: {
    ...getArgTypes(UNotify.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UNotify, UButton },
  setup() {
    return { args };
  },
  template: `
    <div>
      <UNotify v-bind="args" />

      <UButton label="show notify" @click="onClick"/>
    </div>
 `,

  methods: {
    onClick() {
      const settings = {
        type: "success",
        label: "Some label",
      };

      notify(settings);
    },
  },
});

const TypesTemplate = (args) => ({
  components: { UNotify, UButton },
  setup() {
    return { args };
  },
  template: `
    <div class="flex gap-4">
      <UNotify />

      <UButton label="Success" @click="onClick('success')"/>
      <UButton label="Warning" @click="onClick('warning')"/>
      <UButton label="Error" @click="onClick('error')"/>
    </div>
 `,

  methods: {
    onClick(type) {
      const settings = { type };

      notify(settings);
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const position = DefaultTemplate.bind({});
position.args = { xPosition: "right", yPosition: "bottom" };

export const types = TypesTemplate.bind({});
types.args = {};
