import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UCard from "../../ui.container-card/UCard.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UCardArgs extends Props {
  slotTemplate?: string;
}

export default {
  id: "5060",
  title: "Containers / Card",
  component: UCard,
  args: {
    title: "User Profile",
  },
  argTypes: {
    ...getArgTypes(UCard.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UCard.__name),
    },
  },
} as Meta;

const defaultTemplate = `
  <UCol>
    <p>
      The <strong>Card</strong> component is a versatile UI element designed to present
      structured content in an organized manner. It can be used for displaying
      user profiles, product details, notifications, or any other grouped information.
    </p>
    <p>
      With a clean layout that includes a title and content area, this component
      is ideal for dashboards, settings pages, and interactive modals. You can
      customize it further by adding buttons, images, icons, or additional
      sections as needed.
    </p>
    <p>
      Whether you're building a simple info box or a detailed summary card, this
      component helps maintain a visually consistent and responsive design.
    </p>
  </UCol>
`;

const DefaultTemplate: StoryFn<UCardArgs> = (args: UCardArgs) => ({
  components: { UCard, UCol, UButton, UInput, UIcon, UHeader, URow },
  setup() {
    const slots = getSlotNames(UCard.__name);

    return { args, slots };
  },
  template: `
    <UCard v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UCard>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = { description: "Displays key details about a user, product, or feature." };

export const Slots: StoryFn<UCardArgs> = (args) => ({
  components: { UCard, UIcon, URow, UCol, UButton, UBadge },
  setup() {
    return { args };
  },
  template: `
    <UCol gap="lg">
      <UCard v-bind="args" description="Before Title Slot">
        <template #before-title>
          <UIcon name="account_circle" size="sm" />
        </template>
        ${defaultTemplate}
      </UCard>

      <UCard v-bind="args">
        <template #title>
          <UBadge label="Title Slot" size="lg" />
        </template>
        ${defaultTemplate}
      </UCard>

      <UCard v-bind="args" description="After Title Slot">
        <template #after-title>
          <UIcon name="verified" size="sm" />
        </template>
        ${defaultTemplate}
      </UCard>

      <UCard v-bind="args" description="Actions Slot">
        <template #actions>
          <URow class="max-w-fit">
            <UButton size="sm" label="Follow" />
            <UButton size="sm" label="Message" />
          </URow>
        </template>
        ${defaultTemplate}
      </UCard>

      <UCard v-bind="args" description="Footer Left Slot">
        ${defaultTemplate}
        <template #footer-left>
          <UButton size="sm" label="Cancel" />
        </template>
      </UCard>

      <UCard v-bind="args" description="Footer Right Slot">
        ${defaultTemplate}
        <template #footer-right>
          <UButton size="sm" label="Save Changes" />
        </template>
      </UCard>
    </UCol>
  `,
});
