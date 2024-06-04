import { getArgTypes } from "../service.storybook";

import URow from "../ui.container-row";
import UInput from "../ui.form-input";
import UGroup from "../ui.container-group";
import UButton from "../ui.button";

/**
 * The `URow` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-row)
 */
export default {
  id: "5020",
  title: "Containers / Row",
  component: URow,
  argTypes: {
    ...getArgTypes(URow.name),
  },
};

const defaultSlotTemplate = `
  <template #default>
    <UInput label="Name" />
    <UButton label="Submit" size="xs" block />
  </template>
`;

const DefaultTemplate = (args) => ({
  components: { URow, UInput, UButton },
  setup() {
    return { args };
  },
  template: `
    <URow v-bind="args" class="flex">
      ${args.slotTemplate || defaultSlotTemplate}
    </URow>
  `,
});

const GapTemplate = (args, { argTypes } = {}) => ({
  components: { UGroup, URow, UInput },
  setup() {
    return {
      args,
      gaps: argTypes.gap.options,
    };
  },
  template: `
    <UGroup gap="xl">
      <URow v-for="(gap, index) in gaps" :key="index" v-bind="args" :gap="gap" align="center">
        <UInput :label="gap" />
        <UInput :label="gap" />
      </URow>
    </UGroup>
  `,
});

const AlignTemplate = (args, { argTypes } = {}) => ({
  components: { UGroup, URow, UInput, UButton },
  setup() {
    return {
      args,
      aligns: argTypes.align.options,
    };
  },
  template: `
    <UGroup gap="xl">
      <URow v-for="(align, index) in aligns" :key="index" v-bind="args" :align="align">
        <UButton :label="align" size="xs" block />
        <UInput label="Name" />
      </URow>
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Gap = GapTemplate.bind({});
Gap.args = {};

export const Align = AlignTemplate.bind({});
Align.args = {};

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

export const textBlocksExample = DefaultTemplate.bind({});
textBlocksExample.args = {
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
