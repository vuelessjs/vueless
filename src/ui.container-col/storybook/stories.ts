import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UButton from "../../ui.button/UButton.vue";
import UPage from "../../ui.container-page/UPage.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UColArgs extends Props {
  slotTemplate?: string;
  enum: "gap" | "align" | "content" | "justify";
}

export default {
  id: "5015",
  title: "Containers / Col",
  component: UCol,
  args: {},
  argTypes: {
    ...getArgTypes(UCol.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UCol.__name),
    },
  },
} as Meta;

const defaultTemplate = `
  <UInput placeholder="Vasyl" label="Name" class="max-w-96" />
  <UInput placeholder="Vasylenko" label="Surname" class="max-w-96" />
  <UInput placeholder="Kyiv" label="City" class="max-w-96" />
`;

const DefaultTemplate: StoryFn<UColArgs> = (args: UColArgs) => ({
  components: { UCol, UInput, UButton, UPage },
  setup: () => ({ args, slots: getSlotNames(UCol.__name) }),
  template: `
    <UCol v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UCol>
  `,
});

const EnumTemplate: StoryFn<UColArgs> = (args: UColArgs, { argTypes }) => ({
  components: { UCol, UButton, URow, UInput },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow gap="lg" :class="{ '!flex-col': args.enum === 'content' }">
      <UCol
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        class="w-full h-[200px] border border-primary rounded p-2"
      >
        <UButton :label="args.enum" />
        <UButton :label="option" />
        <div v-if="args.enum === 'content'" class="flex flex-col gap-2">
          ${defaultTemplate}
        </div>
      </UCol>
    </URow>
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
    story: {
      height: "200px",
    },
  },
};

export const Gap = EnumTemplate.bind({});
Gap.args = { enum: "gap" };
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
      story: "Items horizontal align (align-items).",
    },
  },
};

export const Content = EnumTemplate.bind({});
Content.args = { enum: "content", wrap: true };
Content.parameters = {
  docs: {
    description: {
      story: "Items horizontal align for multi-row flex containers (align-content).",
    },
  },
};

export const Justify = EnumTemplate.bind({});
Justify.args = { enum: "justify" };
Justify.parameters = {
  docs: {
    description: {
      story: "Items vertical align (justify-content).",
    },
  },
};

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
    <UButton label="Submit" />
      <UInput placeholder="Provide today's new data..." label="Daily report" />
    </template>
  `,
};
