import { getArgTypes, getSlotNames } from "../../utils/storybook.ts";

import UGroups from "../../ui.container-groups/UGroups.vue";
import UGroup from "../../ui.container-group/UGroup.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UInput from "../../ui.form-input/UInput.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { UGroupsProps } from "../types.ts";

interface UGroupsArgs extends UGroupsProps {
  slotTemplate?: string;
}

/**
 * The `UGroups` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-groups)
 */
export default {
  id: "5035",
  title: "Containers / Groups",
  component: UGroups,
  args: {},
  argTypes: {
    ...getArgTypes(UGroups.__name),
  },
  parameters: {
    docs: {
      story: {
        iframeHeight: 360,
      },
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UGroupsArgs> = (args: UGroupsArgs) => ({
  components: { UGroups, UGroup, UCol, UInput },
  setup() {
    const slots = getSlotNames(UGroups.__name);

    return { args, slots };
  },
  template: `
    <UGroups v-bind="args">
      ${args.slotTemplate}
    </UGroups>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  slotTemplate: `
    <UGroup :upperlined="n !== 1" :title="'Group '+n" v-for="n in 3">
      <UCol>
        <UInput placeholder="input" label="Label" />
        <UInput placeholder="input" label="Label" />
      </UCol>
    </UGroup>
  `,
};