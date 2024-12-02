import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UGroup from "../../ui.container-group/UGroup.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UGroupProps } from "../types.ts";

interface UGroupArgs extends UGroupProps {
  slotTemplate?: string;
}

/**
 * The `UGroup` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-group)
 */
export default {
  id: "5030",
  title: "Containers / Group",
  component: UGroup,
  args: {
    title: "Form group",
  },
  argTypes: {
    ...getArgTypes(UGroup.__name),
  },
  parameters: {
    docs: {
      story: {
        iframeHeight: 360,
      },
    },
    ...getDocsDescription(UGroup.__name),
  },
} as Meta;

const defaultTemplate = `
  <UCol>
    <UInput placeholder="Vasyl" label="Name" />
    <UInput placeholder="Vasylenko" label="Surname" />
    <UInput placeholder="Kyiv" label="Town" />
  </UCol>
`;

const DefaultTemplate: StoryFn<UGroupArgs> = (args: UGroupArgs) => ({
  components: { UGroup, UCol, UInput, UButton },
  setup() {
    const slots = getSlotNames(UGroup.__name);

    return { args, slots };
  },
  template: `
    <UGroup v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { title: "Some title" };

export const Upperlined = DefaultTemplate.bind({});
Upperlined.args = { upperlined: false, underlined: true };

export const Underlined = DefaultTemplate.bind({});
Underlined.args = { upperlined: true, underlined: false };

export const NestedGroups = DefaultTemplate.bind({});
NestedGroups.args = {
  title: "",
  slotTemplate: `
    <UGroup :upperlined="n !== 1" :title="'Group '+n" v-for="n in 3">
      <UCol>
        <UInput placeholder="input" label="Label" />
        <UInput placeholder="input" label="Label" />
      </UCol>
    </UGroup>
  `,
};

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <UInput placeholder="placeholder" label="Label" />
  `,
};
SlotDefault.parameters = {
  docs: {
    story: {
      iframeHeight: 240,
    },
  },
};

export const SlotRight = DefaultTemplate.bind({});
SlotRight.args = {
  slotTemplate: `
    <template #right>
      <UButton size="sm" label="Edit"/>
    </template>
    ${defaultTemplate}
  `,
};
SlotRight.parameters = {
  docs: {
    story: {
      iframeHeight: 200,
    },
  },
};
