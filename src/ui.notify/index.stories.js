import NotifyServiceDefault from "../ui.notify/services";

import UNotify from "../ui.notify";
import UButton from "../ui.button";

import { getArgTypes } from "../service.storybook";

const NotifyService = new NotifyServiceDefault();

export default {
  title: "Other / Notify",
  component: UNotify,
  args: {
    type: "success",
    code: "code",
    title: "",
    text: "",
    duration: "short",
    ignoreDuplicates: false,
  },
  argTypes: {
    ...getArgTypes(UNotify.name),
    type: {
      description: "The type of notify.",
      defaultValue: { summary: "success" },
      options: ["success", "warning", "error"],
      control: {
        type: "radio",
      },
    },
    code: {
      description:
        "Unique translation code, for ex. `categoryCreated`, " +
        "which will be used in i18n translation path, for ex. `UNotify.success.categoryCreated`.",
      defaultValue: { summary: "" },
      control: {
        type: "text",
      },
    },
    title: {
      description: "Notify title.",
      defaultValue: { summary: "" },
      control: {
        type: "text",
      },
    },
    text: {
      description: "Notify text (description).",
      defaultValue: { summary: "" },
      control: {
        type: "text",
      },
    },
    duration: {
      description: "The notify visibility duration.",
      defaultValue: { summary: "short" },
      options: ["short", "medium", "long", "permanent"], //4000, 8000, 12000, 300000
      control: {
        type: "radio",
      },
    },
    ignoreDuplicates: {
      description: "Show only 1 notify at once.",
      defaultValue: { summary: false },
      control: {
        type: "boolean",
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
    <div>
      <UNotify v-bind="args"/>

      <UButton label="show notify" @click="onClick"/>
    </div>
 `,

  methods: {
    onClick() {
      const settings = {
        type: args.type,
        code: args.code,
        title: args.title,
        text: args.text,
        duration: args.duration,
        ignoreDuplicates: args.ignoreDuplicates,
      };

      NotifyService.notify(settings);
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
