import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/storybook.ts";

import UCol from "../../ui.container-col/UCol.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UButton from "../../ui.button/UButton.vue";

/**
 * The `UCol` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-col)
 */
export default {
  id: "5015",
  title: "Containers / Col",
  component: UCol,
  args: {},
  argTypes: {
    ...getArgTypes(UCol.__name),
  },
  parameters: {
    docs: {
      story: {
        iframeHeight: 360,
      },
    },
  },
};

const defaultTemplate = `
  <UInput placeholder="Vasyl" label="Name" />
  <UInput placeholder="Vasylenko" label="Surname" />
  <UInput placeholder="Kyiv" label="Town" />
`;

const DefaultTemplate = (args) => ({
  components: { UCol, UInput, UButton },
  setup() {
    const slots = getSlotNames(UCol.__name);

    return { args, slots };
  },
  template: `
    <UCol v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
      <UInput placeholder="placeholder" label="Label" />
    </template>
  `,
};
SlotDefault.parameters = {
  docs: {
    story: {
      iframeHeight: 240,
    },
  },
};
