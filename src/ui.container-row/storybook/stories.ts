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
  enum: "gap" | "align" | "justify" | "content";
}

export default {
  id: "5020",
  title: "Containers / Row",
  component: URow,
  argTypes: {
    ...getArgTypes(URow.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(URow.__name),
    },
  },
} as Meta;

const defaultTemplate = `
  <UInput label="Name" placeholder="Please enter your name..." />
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
        class="border border-brand-500 rounded-sm p-2"
        :class="{ 'h-24': args.enum === 'align' }"
      >
        <template v-if="isGapEnum">
          <UInput :label="option" />
          <UInput :label="option" />
        </template>
        <template v-else>
          <UButton :label="args.enum" />
          <UButton :label="option" />
        </template>
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Reverse = DefaultTemplate.bind({});
Reverse.args = { reverse: true };
Reverse.parameters = {
  docs: {
    description: {
      story: "Reverse nested items order.",
    },
  },
};

export const Gap = EnumVariantTemplate.bind({});
Gap.args = { enum: "gap", config: { wrapper: "border-none" } };
Gap.parameters = {
  docs: {
    description: {
      story: "The distance between nested elements.",
    },
  },
};

export const Align = EnumVariantTemplate.bind({});
Align.args = { enum: "align" };
Align.parameters = {
  docs: {
    description: {
      story: "Items vertical align (align-items).",
    },
  },
};

export const Justify = EnumVariantTemplate.bind({});
Justify.args = { enum: "justify" };
Justify.parameters = {
  docs: {
    description: {
      story: "Items horizontal align (justify-content).",
    },
  },
};

export const NoMobile = DefaultTemplate.bind({});
NoMobile.args = {
  noMobile: true,
  slotTemplate: `
    <UInput label="First Name" />
    <UInput label="Last Name" />
  `,
};
NoMobile.parameters = {
  docs: {
    description: {
      story: "Disables mobile adaptivity.",
    },
  },
};

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
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
    </template>
  `,
};
