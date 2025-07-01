import { ref } from "vue";

import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UGroup from "../../ui.container-group/UGroup.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UInputPassword from "../../ui.form-input-password/UInputPassword.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import URow from "../../ui.container-row/URow.vue";
import UAlert from "../../ui.text-alert/UAlert.vue";
import UHeader from "../../ui.text-header/UHeader.vue";

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
    <UAlert description="Please check your email for verification." color="info" />
    <UInput v-model="email" label="Email" placeholder="john@email.com" type="email" />
    <UInputPassword v-model="password" label="Password" placeholder="********" />
  </UCol>
`;

const DefaultTemplate: StoryFn<UGroupArgs> = (args: UGroupArgs) => ({
  components: {
    UGroup,
    UCol,
    UInput,
    UInputPassword,
    UAlert,
    UButton,
    UIcon,
    UBadge,
    URow,
    UHeader,
  },
  setup: () => ({ args, slots: getSlotNames(UGroup.__name), email: ref(""), password: ref("") }),
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

export const BeforeTitleSlot = DefaultTemplate.bind({});
BeforeTitleSlot.args = {
  slotTemplate: `
    <template #before-title>
      <UIcon name="account_circle" color="primary" class="mr-1" />
    </template>
    ${defaultTemplate}
  `,
};

export const TitleSlot = DefaultTemplate.bind({});
TitleSlot.args = {
  slotTemplate: `
    <template #title="{ title }">
      <UHeader :label="title" color="primary" />
    </template>
    ${defaultTemplate}
  `,
};

export const AfterTitleSlot = DefaultTemplate.bind({});
AfterTitleSlot.args = {
  slotTemplate: `
    <template #after-title>
      <UIcon name="verified" color="success" />
    </template>
    ${defaultTemplate}
  `,
};

export const ActionsSlot = DefaultTemplate.bind({});
ActionsSlot.args = {
  slotTemplate: `
    <template #actions>
      <URow class="max-w-fit">
        <UButton size="xs" variant="outlined" label="Cancel" />
        <UButton size="xs" label="Save Changes" />
      </URow>
    </template>
    ${defaultTemplate}
  `,
};
