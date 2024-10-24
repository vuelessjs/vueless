import { getArgTypes } from "../../../utils/utilStorybook.js";

import UIcon from "../../../ui.image-icon/UIcon.vue";
import URow from "../../../ui.container-row/URow.vue";
import tooltip from "../vTooltip.js";

/**
 * The `v-tooltip` directive. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/directives/tooltip)
 */
export default {
  id: "7021",
  title: "Directives / Tooltip",
  component: UIcon,
  args: {},
  argTypes: {
    ...getArgTypes(UIcon.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UIcon },
  directives: { tooltip },
  setup() {
    return { args };
  },
  template: `
    <UIcon interactive name="sentiment_satisfied" v-tooltip="args.tooltip" >
  `,
});

const EnumTemplate = (args) => ({
  components: { UIcon, URow },
  directives: { tooltip },
  setup() {
    return { args };
  },
  template: `
    <URow>
      <UIcon 
        v-for="option in args.options" 
        interactive 
        name="sentiment_satisfied" 
        v-tooltip="{ content: option, ...args.tooltip, [args.enum]: option }" 
      >
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { tooltip: "Tooltip" };

export const Settings = DefaultTemplate.bind({});
Settings.args = { tooltip: { content: "Tooltip", placement: "right" } };

export const Placement = EnumTemplate.bind({});
Placement.args = {
  tooltip: {},
  enum: "placement",
  options: [
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "auto",
    "auto-start",
    "auto-end",
  ],
};
