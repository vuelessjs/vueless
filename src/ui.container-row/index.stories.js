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

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UGroup, URow, UInput, UButton },
  setup() {
    const isGapEnum = argTypes[args.enum].name === "gap";

    return {
      args,
      options: argTypes[args.enum].options,
      isGapEnum,
    };
  },
  template: `
    <UGroup gap="xl">
      <URow
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :key="index"
      >
        <template v-if="isGapEnum">
          <UInput :label="option" />
          <UInput :label="option" />
        </template>
        <template v-else>
          <UButton :label="option" size="xs" block />
          <UInput label="Name" />
        </template>
      </URow>
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Gap = EnumVariantTemplate.bind({});
Gap.args = { enum: "gap" };

export const Align = EnumVariantTemplate.bind({});
Align.args = { enum: "align" };

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
