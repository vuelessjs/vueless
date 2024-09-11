import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UTab from "../../ui.navigation-tab/UTab.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

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
  components: { UTab, UIcon },
  setup() {
    const slots = getSlotNames(UTab.name);

    return { args, slots };
  },
  template: `
    <UTab v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </UTab>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const slotDefault = DefaultTemplate.bind({});
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
