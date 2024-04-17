import { getArgTypes } from "../service.storybook";

import UGroup from "../ui.container-group";
import UGroups from "../ui.container-groups";
import UInput from "../ui.form-input";

export default {
  id: "5040",
  title: "Containers / Groups",
  component: UGroups,
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

const DefaultTemplate = (args) => ({
  components: { UGroups, UGroup, UInput },
  setup() {
    return { args };
  },
  template: `
    <UGroups>
      ${args.slotTemplate}
    </UGroups>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  slotTemplate: `
    <template #default>
      <UGroup :upperlined="n !== 1" :title="'Group '+n" v-for="n in 3">
        <UInput placeholder="input" label="Label" />
        <UInput placeholder="input" label="Label" />
      </UGroup>
    </template>
  `,
};
