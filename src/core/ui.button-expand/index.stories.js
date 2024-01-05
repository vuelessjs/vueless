import { getArgTypes } from "vueless/service.storybook";

import UButtonExpand from "vueless/ui.button-expand";
import UButtonExpandItem from "vueless/ui.button-expand-item";

export default {
  title: "Buttons & Links / Button Expand",
  component: UButtonExpand,
  argTypes: {
    ...getArgTypes(UButtonExpand.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UButtonExpand, UButtonExpandItem },
  setup() {
    return { args };
  },
  template: `
    <UButtonExpand v-bind="args">
      ${args.slotTemplate}
    </UButtonExpand>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  slotTemplate: `
    <template #default>
      <UButtonExpandItem
        text="Expand item 1"
        icon-name="star"
      />
      <UButtonExpandItem
        text="Expand item 2"
        icon-name="star-fill"
      />
      <UButtonExpandItem
        text="Expand item 3"
        icon-name="star-fill"
      />
    </template>
  `,
};
