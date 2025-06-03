import {
  getArgs,
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
  setup: () => ({ args, slots: getSlotNames(URow.__name) }),
  template: `
    <URow v-bind="args" class="flex">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </URow>
  `,
});

const EnumTemplate: StoryFn<URowArgs> = (args: URowArgs, { argTypes }) => ({
  components: { UCol, URow, UInput, UButton },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="xl">
      <URow
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="border border-primary border-dashed rounded-medium p-4"
        :class="{ 'h-24': args.enum === 'align' }"
      >
        <UButton :label="args.enum" />
        <UButton :label="option" />
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

export const Gap = EnumTemplate.bind({});
Gap.args = { enum: "gap", config: { wrapper: "border-none" } };
Gap.parameters = {
  docs: {
    description: {
      story: "The distance between nested elements.",
    },
  },
};

export const Align = EnumTemplate.bind({});
Align.args = { enum: "align" };
Align.parameters = {
  docs: {
    description: {
      story: "Items vertical align (align-items).",
    },
  },
};

export const Content: StoryFn<URowArgs> = (args: URowArgs, { argTypes }) => ({
  components: { UCol, UButton, URow, UInput },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UCol gap="lg">
      <URow
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        align="normal"
        wrap
        gap="xs"
        class="w-full h-[300px] border border-primary border-dashed rounded-medium p-4"
      >
        <UButton label="content" class="w-[45%]" />
        <UButton :label="option" class="w-[45%]" />
        <UButton label="content" class="w-[45%]" />
        <UButton :label="option" class="w-[45%]" />
      </URow>
    </UCol>
  `,
});
Content.args = { enum: "content" };
Content.parameters = {
  docs: {
    description: {
      story: "Items horizontal align for multi-row flex containers (align-content).",
    },
  },
};

export const Justify = EnumTemplate.bind({});
Justify.args = { enum: "justify", block: true };
Justify.parameters = {
  docs: {
    description: {
      story: "Items horizontal align (justify-content).",
    },
  },
};

export const DefaultSlot = DefaultTemplate.bind({});
DefaultSlot.args = {
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
