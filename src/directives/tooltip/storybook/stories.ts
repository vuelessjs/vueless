import type { Meta, StoryFn } from "@storybook/vue3";

import UIcon from "../../../ui.image-icon/UIcon.vue";
import UCol from "../../../ui.container-col/UCol.vue";
import UAlert from "../../../ui.text-alert/UAlert.vue";
import ULink from "../../../ui.button-link/ULink.vue";
import UText from "../../../ui.text-block/UText.vue";
import tooltip from "../vTooltip.ts";

import type { Props } from "tippy.js";

interface VTooltipArgs {
  tooltipOptions: Partial<Props> | string;
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
    <UIcon interactive name="sentiment_satisfied" v-tooltip="'Tooltip'" />
  `,
});

const TooltipSettingsTemplate: StoryFn<VTooltipArgs> = (args: VTooltipArgs) => ({
  components: { UIcon, UCol, UAlert, ULink, UText },
  directives: { tooltip },
  setup() {
    return { args };
  },
  template: `
    <UCol>
      <UIcon
        interactive
        name="sentiment_satisfied"
        v-tooltip="{ content: '<b>Tooltip</b>', placement: 'bottom', allowHTML: true }"
      />
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const TooltipSettings = TooltipSettingsTemplate.bind({});
TooltipSettings.args = {};
TooltipSettings.parameters = {
  docs: {
    description: {
      story: `
This story demonstrates how to pass custom options to the v-tooltip directive,
including HTML content and tooltip placement. For more settings,
refer to the <a href="https://atomiks.github.io/tippyjs/v6/all-props/" target="_blank" class="!no-underline">Tippy.js documentation</a>.
      `,
    },
  },
};
