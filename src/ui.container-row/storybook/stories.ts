import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import URow from "../../ui.container-row/URow.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UButton from "../../ui.button/UButton.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface URowArgs extends Props {
  slotTemplate?: string;
  enum: "gap" | "align";
}

export default {
  id: "5020",
  title: "Containers / Row",
  component: URow,
  argTypes: {
    ...getArgTypes(URow.__name),
  },
  parameters: {
    ...getDocsDescription(URow.__name),
  },
} as Meta;

const defaultTemplate = `
  <UInput label="Name" />
  <UButton label="Submit" size="xs" block />
`;

const DefaultTemplate: StoryFn<URowArgs> = (args: URowArgs) => ({
  components: { URow, UInput, UButton },
  setup() {
    const slots = getSlotNames(URow.__name);

    return { args, slots };
  },
  template: `
    <URow v-bind="args" class="flex">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </URow>
  `,
});

const EnumVariantTemplate: StoryFn<URowArgs> = (args: URowArgs, { argTypes }) => ({
  components: { UCol, URow, UInput, UButton },
  setup() {
    const isGapEnum = argTypes?.[args.enum]?.name === "gap";

    return {
      args,
      options: argTypes?.[args.enum]?.options,
      isGapEnum,
    };
  },
  template: `
    <UCol gap="xl">
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
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Gap = EnumVariantTemplate.bind({});
Gap.args = { enum: "gap" };

export const Align = EnumVariantTemplate.bind({});
Align.args = { enum: "align" };

export const NoMobile = DefaultTemplate.bind({});
NoMobile.args = {
  noMobile: true,
  slotTemplate: `
    <UInput label="Name" />
    <UInput label="Lastname" />
  `,
};

export const NestedRows = DefaultTemplate.bind({});
NestedRows.args = {
  slotTemplate: `
    <UInput label="Name" />

    <URow>
      <UInput label="Lastname" />
      <UInput label="Age"/>
    </URow>
  `,
};

export const TextBlocksExample = DefaultTemplate.bind({});
TextBlocksExample.args = {
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
