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
import UAlert from "../../ui.text-alert/UAlert.vue";

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
    <UInput label="First Name" placeholder="John" />
    <UInput label="Last Name" placeholder="Doe" />
    <UAlert
      title="Attention!"
      description="Please check your email for verification."
      color="warning"
      icon="mark_email_unread"
      class="w-full"
    />
  </UCol>
`;

const DefaultTemplate: StoryFn<UGroupArgs> = (args: UGroupArgs) => ({
  components: { UGroup, UCol, UInput, UAlert },
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
  components: { UGroup, UIcon, UBadge, UButton, URow, UInput, UCol, UAlert },
  setup() {
    args.config = { wrapper: "mb-8" };

    return { args };
  },
  template: `
    <UGroup v-bind="args" title="Before Title Slot">
      <template #before-title>
        <UIcon name="account_circle" color="primary" class="mr-1" />
      </template>
      <UCol>
        <UInput label="Username" placeholder="johndoe" />
      </UCol>
    </UGroup>

    <UGroup v-bind="args" title="Title Slot" upperlined>
      <template #title="{ title }">
        <UBadge :label="title" size="lg" color="primary" variant="outlined" />
      </template>
      <UCol>
        <UInput label="Access Level" placeholder="Superuser" />
      </UCol>
    </UGroup>

    <UGroup v-bind="args" title="After Title Slot" upperlined>
      <template #after-title>
        <UIcon name="verified" color="success" />
      </template>
      <UCol>
        <UInput label="Email" placeholder="john@email.com" />
      </UCol>
    </UGroup>

    <UGroup v-bind="args" title="Actions Slot" upperlined>
      <template #actions>
        <URow class="max-w-fit">
          <UButton size="sm" variant="outlined" label="Cancel" />
          <UButton size="sm" label="Save Changes" />
        </URow>
      </template>
      <UCol>
        <UInput label="First Name" placeholder="John" />
        <UInput label="Last Name" placeholder="Doe" />
      </UCol>
    </UGroup>
  `,
});
