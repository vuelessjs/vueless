import {
  getArgs,
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
  enum: "size" | "titleSize" | "variant";
}

export default {
  id: "5090",
  title: "Containers / Page",
  component: UPage,
  args: {
    title: "User Profile",
  },
  argTypes: {
    ...getArgTypes(UPage.__name),
  },
  parameters: {
    storyClasses: "p-0",
    docs: {
      ...getDocsDescription(UPage.__name),
    },
  },
} as Meta;

const defaultTemplate = `
  <UCard title="Profile Information">
    <UCol align="stretch">
      <URow>
        <UInput label="Full Name" placeholder="John Doe" />
        <UInput label="Email Address" type="email" placeholder="john.doe@example.com" />
      </URow>

      <UTextarea label="Message" placeholder="Enter your message here..." rows="4" />
    </UCol>
  </UCard>
`;

const DefaultTemplate: StoryFn<UPageArgs> = (args: UPageArgs) => ({
  components: {
    UPage,
    UCard,
    URow,
    UCol,
    UInput,
    UTextarea,
    UButton,
    UIcon,
    UHeader,
  },
  setup: () => ({ args, slots: getSlotNames(UPage.__name) }),
  template: `
    <UPage v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UPage>
  `,
});

const EnumTemplate: StoryFn<UPageArgs> = (args: UPageArgs, { argTypes }) => ({
  components: { UPage, UCard, URow, UCol, UInput, UTextarea },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UPage
      v-for="option in argTypes?.[args.enum]?.options"
      v-bind="getArgs(args, option)"
      :key="option"
      :config="{ wrapper: 'min-h-max', page: 'min-h-max' }"
    >
      ${defaultTemplate}
    </UPage>
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

export const TitleSize = EnumTemplate.bind({});
TitleSize.args = { enum: "titleSize", description: "{enumValue}" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", description: "{enumValue}" };
Sizes.parameters = {
  docs: {
    description: {
      story: "Page size (width).",
    },
  },
};

export const Variant = EnumTemplate.bind({});
Variant.args = { enum: "variant", description: "{enumValue}" };
Variant.parameters = {
  docs: {
    description: {
      story: "Page variant.",
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
