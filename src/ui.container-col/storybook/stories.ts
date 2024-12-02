import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCol from "../../ui.container-col/UCol.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UColProps } from "../types.ts";

interface UColArgs extends UColProps {
  slotTemplate?: string;
}

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
    ...getDocsDescription(UCol.__name),
  },
} as Meta;

const defaultTemplate = `
  <UInput placeholder="Vasyl" label="Name" />
  <UInput placeholder="Vasylenko" label="Surname" />
  <UInput placeholder="Kyiv" label="Town" />
`;

const DefaultTemplate: StoryFn<UColArgs> = (args: UColArgs) => ({
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
