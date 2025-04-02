import type { Meta, StoryFn } from "@storybook/vue3";

import UIcon from "../../../ui.image-icon/UIcon.vue";
import URow from "../../../ui.container-row/URow.vue";
import UAlert from "../../../ui.text-alert/UAlert.vue";
import ULink from "../../../ui.button-link/ULink.vue";
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
    <UIcon internal="storybook" interactive name="sentiment_satisfied" v-tooltip="'Tooltip'" />
  `,
});

const SettingsTemplate: StoryFn<VTooltipArgs> = (args: VTooltipArgs) => ({
  components: { UIcon, URow, UAlert, ULink },
  directives: { tooltip },
  setup() {
    return { args };
  },
  template: `
    <URow align="center">
      <UAlert variant="outlined">
        <p>
          See all available settings in <ULink label="Tippy.js docs" href="https://atomiks.github.io/tippyjs/v6/all-props/" underlined />
        </p>
      </UAlert>
      <UIcon
        internal="storybook"
        interactive
        name="sentiment_satisfied"
        v-tooltip="{ content: '<b>Tooltip</b>', placement: 'bottom', allowHTML: true, zIndex: 42 }"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Settings = SettingsTemplate.bind({});
Settings.args = {};
