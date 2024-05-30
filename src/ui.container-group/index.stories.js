import { getArgTypes } from "../service.storybook";

import UGroup from "../ui.container-group";
import UInput from "../ui.form-input";
import UButton from "../ui.button";

export default {
  id: "5030",
  title: "Containers / Group",
  component: UGroup,
  args: {
    title: "Form group",
  },
  argTypes: {
    ...getArgTypes(UGroup.name),
  },
  parameters: {
    docs: {
      story: {
        iframeHeight: 360,
      },
    },
  },
};

const defaultSlotTemplate = `
  <template #default>
    <UInput placeholder="Vasyl" label="Name" />
    <UInput placeholder="Vasylenko" label="Surname" />
    <UInput placeholder="Kyiv" label="Town" />
  </template>
`;

const DefaultTemplate = (args) => ({
  components: { UGroup, UInput, UButton },
  setup() {
    return { args };
  },
  template: `
    <UGroup v-bind="args">
      ${args.slotTemplate || defaultSlotTemplate}
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: "Some title",
};

export const upperlined = DefaultTemplate.bind({});
upperlined.args = { upperlined: false, underlined: true };

export const underlined = DefaultTemplate.bind({});
underlined.args = { upperlined: true, underlined: false };

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      <UInput placeholder="placeholder" label="Label" />
    </template>
  `,
};
slotDefault.parameters = {
  docs: {
    story: {
      iframeHeight: 240,
    },
  },
};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      <UButton size="sm" label="Edit"/>
    </template>
  `,
};
slotRight.parameters = {
  docs: {
    story: {
      iframeHeight: 200,
    },
  },
};
