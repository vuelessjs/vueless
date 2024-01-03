import { getArgTypes } from "vueless/service.storybook";

import UGroup from "vueless/ui.container-group";
import UInput from "vueless/ui.form-input";
import UButton from "vueless/ui.button";

export default {
  title: "Containers / Group",
  component: UGroup,
  args: {
    title: "Form group",
    slotTemplate: `
    <template #default>
      <UInput placeholder="Vasyl" label="Name" />

      <UInput placeholder="Vasylenko" label="Surname" />

      <UInput placeholder="Kyiv" label="Town" />
    </template>
  `,
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

const DefaultTemplate = (args) => ({
  components: { UGroup, UInput, UButton },
  setup() {
    return { args };
  },
  template: `
    <UGroup v-bind="args">
      ${args.slotTemplate}
    </UGroup>
  `,
});

export const title = DefaultTemplate.bind({});
title.args = {
  title: "Some title",
};

export const withoutUpperlined = DefaultTemplate.bind({});
withoutUpperlined.args = { upperlined: false };

export const underlined = DefaultTemplate.bind({});
underlined.args = { underlined: true, upperlined: false };

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
      <UButton size="sm" text="Some button"/>
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
