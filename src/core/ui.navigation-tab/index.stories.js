import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import UTab from "vueless/ui.navigation-tab";
import UIcon from "vueless/ui.image-icon";

export default {
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
    const slots = getSlotNames(UTab.name);

    return { args, slots };
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
      <UIcon
       name="star"
       size="sm"
      />
      {{label}}
     </div>
    </template>
  `,
};
