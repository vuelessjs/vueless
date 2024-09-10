import { getArgTypes, getSlotNames, getSlotsFragment } from "../utils/utilstorybook";

import UGroup from "../ui.container-group";
import UCol from "../ui.container-col";
import UInput from "../ui.form-input";
import UButton from "../ui.button/UButton.vue";

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

const defaultTemplate = `
  <UCol>
    <UInput placeholder="Vasyl" label="Name" />
    <UInput placeholder="Vasylenko" label="Surname" />
    <UInput placeholder="Kyiv" label="Town" />
  </UCol>
`;

const DefaultTemplate = (args) => ({
  components: { UGroup, UCol, UInput, UButton },
  setup() {
    const slots = getSlotNames(UGroup.name);

    return { args, slots };
  },
  template: `
    <UGroup v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
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

export const nestedGroups = DefaultTemplate.bind({});
nestedGroups.args = {
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

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <UInput placeholder="placeholder" label="Label" />
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
    ${defaultTemplate}
  `,
};
slotRight.parameters = {
  docs: {
    story: {
      iframeHeight: 200,
    },
  },
};
