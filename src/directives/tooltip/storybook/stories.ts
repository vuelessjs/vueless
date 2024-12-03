import type { Meta, StoryFn } from "@storybook/vue3";

import UIcon from "../../../ui.image-icon/UIcon.vue";
import URow from "../../../ui.container-row/URow.vue";
import tooltip from "../vTooltip.ts";

import type { Props } from "tippy.js";

interface VTooltipArgs {
  tooltipOptions: Partial<Props> | string;
}

interface VTooltipEnumArgs extends VTooltipArgs {
  enum: keyof Props;
  options: unknown[];
}

/**
 * The `v-tooltip` directive. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/directives/tooltip)
 */
export default {
  id: "7021",
  title: "Directives / Tooltip",
  args: {},
  argTypes: {},
} as Meta;

const DefaultTemplate: StoryFn<VTooltipArgs> = (args: VTooltipArgs) => ({
  components: { UIcon },
  directives: { tooltip },
  setup() {
    return { args };
  },
  template: `
    <UIcon interactive name="sentiment_satisfied" v-tooltip="args.tooltipOptions" />
  `,
});

const EnumTemplate: StoryFn<VTooltipEnumArgs> = (args: VTooltipEnumArgs) => ({
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
        v-tooltip="{ content: option, ...args.tooltipOptions, [args.enum]: option }"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { tooltipOptions: "Tooltip" };

export const Settings = DefaultTemplate.bind({});
Settings.args = { tooltipOptions: { content: "Tooltip", placement: "right" } };

Settings.parameters = {
  docs: {
    source: {
      // Do not break this line, this will lead to wrong formatting.
      code: `<UIcon interactive name="sentiment_satisfied" v-tooltip="{ content: 'Tooltip', placement: 'right' }">`,
    },
  },
};

export const Placement = EnumTemplate.bind({});
Placement.args = {
  tooltipOptions: {},
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

Placement.parameters = {
  docs: {
    source: {
      code: `<UIcon interactive name="sentiment_satisfied" v-tooltip="{ content: 'top', placement: 'top' }">`,
    },
  },
};
