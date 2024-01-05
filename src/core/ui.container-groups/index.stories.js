import { getArgTypes } from "vueless/service.storybook";

import UGroup from "vueless/ui.container-group";
import UGroups from "vueless/ui.container-groups";
import UInput from "vueless/ui.form-input";

export default {
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

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      <UGroup :upperlined="!n" :title="'Group '+n" v-for="n in 3">
        <UInput placeholder="input" label="Label" />
        <UInput placeholder="input" label="Label" />
      </UGroup>
    </template>
  `,
};
