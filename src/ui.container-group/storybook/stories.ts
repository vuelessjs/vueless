import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UGroup from "../../ui.container-group/UGroup.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import URow from "../../ui.container-row/URow.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UGroupArgs extends Props {
  slotTemplate?: string;
}

export default {
  id: "5030",
  title: "Containers / Group",
  component: UGroup,
  args: {
    title: "User info",
  },
  argTypes: {
    ...getArgTypes(UGroup.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UGroup.__name),
    },
  },
} as Meta;

const defaultTemplate = `
  <UCol>
    <UInput placeholder="Vasyl" label="First Name" />
    <UInput placeholder="Vasylenko" label="Last Name" />
    <UInput placeholder="Kyiv" label="City" />
  </UCol>
`;

const DefaultTemplate: StoryFn<UGroupArgs> = (args: UGroupArgs) => ({
  components: { UGroup, UCol, UInput, UButton },
  setup: () => ({ args, slots: getSlotNames(UGroup.__name) }),
  template: `
    <UGroup v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UGroup>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Upperlined = DefaultTemplate.bind({});
Upperlined.args = { upperlined: true };
Upperlined.parameters = {
  docs: {
    description: {
      story: "Show line above the header.",
    },
  },
};

export const Underlined = DefaultTemplate.bind({});
Underlined.args = { underlined: true };
Underlined.parameters = {
  docs: {
    description: {
      story: "Show line under the header.",
    },
  },
};

export const Slots: StoryFn<UGroupArgs> = (args) => ({
  components: { UGroup, UIcon, UBadge, UButton, URow, UInput, UCol },
  setup() {
    args.config = { wrapper: "mb-8" };

    return { args };
  },
  template: `
      <UGroup v-bind="args" title="Before Title Slot">
        <template #before-title>
          <UIcon name="account_circle" />
        </template>
        ${defaultTemplate}
      </UGroup>

      <UGroup v-bind="args">
        <template #title>
          <UBadge label="Title Slot" size="lg" />
        </template>
        ${defaultTemplate}
      </UGroup>

      <UGroup v-bind="args" title="After Title Slot">
        <template #after-title>
          <UIcon name="verified" />
        </template>
        ${defaultTemplate}
      </UGroup>

      <UGroup v-bind="args" title="Actions Slot">
        <template #actions>
          <URow class="max-w-fit">
            <UButton size="sm" variant="outlined" label="Clear" />
            <UButton size="sm" label="Submit" />
          </URow>
        </template>
        ${defaultTemplate}
      </UGroup>
  `,
});
