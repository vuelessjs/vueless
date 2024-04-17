import { getArgTypes } from "../service.storybook";

import URow from "../ui.container-row";
import UInput from "../ui.form-input";

export default {
  id: "5020",
  title: "Containers / Row",
  component: URow,
  argTypes: {
    ...getArgTypes(URow.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { URow, UInput },
  setup() {
    return { args };
  },
  template: `
    <URow v-bind="args">
      ${args.slotTemplate}
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {
  slotTemplate: `
    <UInput label="Name" />
    <UInput label="Lastname" />
  `,
};

export const noMobile = DefaultTemplate.bind({});
noMobile.args = {
  noMobile: true,
  slotTemplate: `
    <UInput label="Name" />
    <UInput label="Lastname" />
  `,
};

export const nestedRows = DefaultTemplate.bind({});
nestedRows.args = {
  slotTemplate: `
    <UInput label="Name" />

    <URow>
      <UInput label="Lastname" />
      <UInput label="Age"/>
    </URow>
  `,
};

export const textBlocks = DefaultTemplate.bind({});
textBlocks.args = {
  slotTemplate: `
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum.
    </p>
  `,
};
