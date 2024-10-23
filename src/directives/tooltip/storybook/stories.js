import { getArgTypes } from "../../../utils/utilStorybook.js";

import UIcon from "../../../ui.image-icon/UIcon.vue";
import tooltip from "../vTooltip.js";

/**
 * The `UDataList` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.data-list)
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

export const Default = DefaultTemplate.bind({});
Default.args = { tooltip: "Tooltip" };

export const Settings = DefaultTemplate.bind({});
Settings.args = { tooltip: { content: "Tooltip", placement: "right" } };
