import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UPage from "../../ui.container-page/UPage.vue";
import UCard from "../../ui.container-card/UCard.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UTextarea from "../../ui.form-textarea/UTextarea.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

interface UPageArgs extends Props {
  slotTemplate?: string;
  enum: "size" | "titleSize";
}

export default {
  id: "5090",
  title: "Containers / Page",
  component: UPage,
  args: {
    title: "User Profile",
    muted: true,
  },
  argTypes: {
    ...getArgTypes(UPage.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UPage.__name),
    },
  },
} as Meta;

const defaultTemplate = `
  <UCard title="Profile Information">
    <URow>
      <UInput label="Full Name" placeholder="John Doe" />
      <UInput label="Email Address" type="email" placeholder="john.doe@example.com" />
    </URow>

    <UTextarea class="mb-7 mt-4" label="Message" placeholder="Enter your message here..." rows="4" />
  </UCard>
`;

const DefaultTemplate: StoryFn<UPageArgs> = (args: UPageArgs) => ({
  components: {
    UPage,
    UCard,
    URow,
    UInput,
    UTextarea,
    UButton,
    UIcon,
    UHeader,
  },
  setup() {
    const slots = getSlotNames(UPage.__name);

    return { args, slots };
  },
  template: `
    <UPage v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UPage>
  `,
});

const EnumVariantTemplate: StoryFn<UPageArgs> = (args: UPageArgs, { argTypes }) => ({
  components: { UPage, UCard, URow, UInput, UTextarea },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <URow v-for="(option, index) in options" :key="index">
      <UPage
        v-bind="args"
        :[args.enum]="option"
        :description="option"
        :config="{ wrapper: 'min-h-max', page: 'min-h-max' }"
      >
        ${defaultTemplate}
      </UPage>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = {
  description: "Manage your profile details and update your personal information.",
};

export const BackLink = DefaultTemplate.bind({});
BackLink.args = {
  backLabel: "Back",
  backTo: {
    path: "/",
  },
};
BackLink.parameters = {
  docs: {
    description: {
      story:
        "Use `backTo` and `backLabel` props to add a route object and a label to the back link.",
    },
  },
};

export const TitleSize = EnumVariantTemplate.bind({});
TitleSize.args = { enum: "titleSize" };

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size" };
Size.parameters = {
  docs: {
    description: {
      story: "Page size (width).",
    },
  },
};

export const Slots: StoryFn<UPageArgs> = (args) => ({
  components: { UPage, UIcon, URow, UCol, UButton, UBadge, UTextarea, UCard, UInput },
  setup() {
    args.config = { wrapper: "min-h-max", page: "min-h-max" };

    return { args };
  },
  template: `
    <UCol gap="lg">
      <UPage v-bind="args" description="Before Title Slot">
        <template #before-title>
          <UIcon name="account_circle" />
        </template>
        ${defaultTemplate}
      </UPage>

      <UPage v-bind="args">
        <template #title>
          <UBadge label="Title Slot" size="lg" />
        </template>
        ${defaultTemplate}
      </UPage>

      <UPage v-bind="args" description="After Title Slot">
        <template #after-title>
          <UIcon name="verified" />
        </template>
        ${defaultTemplate}
      </UPage>

      <UPage v-bind="args" description="Actions Slot">
        <template #actions>
          <URow class="max-w-fit">
            <UButton size="sm" variant="outlined" label="Clear" />
            <UButton size="sm" label="Submit" />
          </URow>
        </template>
        ${defaultTemplate}
      </UPage>

      <UPage v-bind="args" description="Footer Left Slot">
        ${defaultTemplate}
        <template #footer-left>
          <UButton size="sm" label="Cancel" />
        </template>
      </UPage>

      <UPage v-bind="args" description="Footer Right Slot">
        ${defaultTemplate}
        <template #footer-right>
          <UButton size="sm" label="Save Changes" />
        </template>
      </UPage>
    </UCol>
  `,
});
