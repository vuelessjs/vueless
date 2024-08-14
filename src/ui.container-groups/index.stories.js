import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UGroups from "../ui.container-groups";
import UGroup from "../ui.container-group";
import UCol from "../ui.container-col";
import UInput from "../ui.form-input";

/**
 * The `UGroups` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-groups)
 */
export default {
  id: "5040",
  title: "Containers / Groups",
  component: UGroups,
  args: {},
  argTypes: {
    ...getArgTypes(UGroups.name),
  },
  parameters: {
    docs: {
      story: {
        iframeHeight: 760,
      },
    },
  },
};

const defaultTemplate = `
  <UGroup :upperlined="n !== 1" :title="'Group '+n" v-for="n in 3">
    <UCol>
      <UInput placeholder="input" label="Label" />
      <UInput placeholder="input" label="Label" />
    </UCol>
  </UGroup>
`;

const DefaultTemplate = (args) => ({
  components: { UGroups, UGroup, UCol, UInput },
  setup() {
    const slots = getSlotNames(UGroups.name);

    return { args, slots };
  },
  template: `
    <UGroups v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UGroups>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
