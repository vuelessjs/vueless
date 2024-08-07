import { getArgTypes } from "../service.storybook";

import UTab from "../ui.navigation-tab";
import UIcon from "../ui.image-icon";

/**
 * The `UTab` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.navigation-tab)
 */
export default {
  id: "8010",
  title: "Navigation / Tab",
  component: UTab,
  args: {
    label: "Tab",
  },
  argTypes: {
    ...getArgTypes(UTab.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UTab },
  setup() {
    return { args };
  },
  template: `
    <UTab v-bind="args" />
  `,
});

const SlotTemplate = (args) => ({
  components: { UTab, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UTab v-bind="args">
      ${args.slotTemplate}
    </UTab>
  `,
});

export const defaultTemplate = DefaultTemplate.bind({});
defaultTemplate.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  label: "Tag",
  slotTemplate: `
    <template #default>
      <div class="flex items-center">
        <UIcon name="star" size="sm" />
        {{label}}
      </div>
    </template>
  `,
};
