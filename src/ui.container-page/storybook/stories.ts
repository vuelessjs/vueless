import { ref } from "vue";

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
import UInputPassword from "../../ui.form-input-password/UInputPassword.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";

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
    title: "Join Our Community",
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
  <UCard
    title="Sign Up"
    description="Enter your email below to get started and create your account."
    class="flex flex-col max-w-[500px]"
  >
    <UCol
      justify="between"
      align="stretch"
      class="h-full"
    >
      <URow
        align="center"
        justify="between"
        gap="sm"
      >
        <UButton
          label="GitHub"
          variant="outlined"
          block
          class="!leading-none"
        />

        <UButton
          label="Google"
          variant="outlined"
          block
          class="!leading-none"
        />
      </URow>

      <UDivider label="OR CONTINUE WITH" />

      <UCol gap="sm" class="w-full">
        <UInput
          label="Email"
          placeholder="johndoe@example.com"
          type="email"
        />
        <UInputPassword v-model="password" label="Password" />
      </UCol>

      <UCheckbox v-model="remember" label="Remember me" />

      <UButton label="Create account" block />
    </UCol>
  </UCard>
`;

const password = ref("");
const remember = ref(false);

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
    UInputPassword,
    UCheckbox,
    UDivider,
  },
  setup: () => ({ args, slots: getSlotNames(UPage.__name), password, remember }),
  template: `
    <UPage v-bind="args">
      ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
    </UPage>
  `,
});

const EnumTemplate: StoryFn<UPageArgs> = (args: UPageArgs, { argTypes }) => ({
  components: {
    UPage,
    UCard,
    URow,
    UCol,
    UInput,
    UTextarea,
    UInputPassword,
    UCheckbox,
    UDivider,
    UButton,
  },
  setup: () => ({ args, argTypes, getArgs, password, remember }),
  template: `
    <UCol class="p-4 bg-primary/5">
      <UPage
        v-for="option in argTypes?.[args.enum]?.options"
        v-bind="getArgs(args, option)"
        :key="option"
        :config="{ wrapper: 'min-h-max', page: 'min-h-max mb-4' }"
      >
        ${defaultTemplate}
      </UPage>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = {
  description: "Manage your profile details and update your personal information.",
};

export const BackLink: StoryFn<UPageArgs> = (args: UPageArgs) => ({
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
    UInputPassword,
    UCheckbox,
    UDivider,
  },
  setup: () => ({
    args,
    showAlert: () => alert("You clicked on a back link!"),
    password,
    remember,
  }),
  template: `
    <UPage
      v-bind="args"
      backLabel="Back"
      :backTo="{ path: '/' }"
      @back="showAlert"
    >
      ${defaultTemplate}
    </UPage>
  `,
});
BackLink.parameters = {
  docs: {
    description: {
      story:
        "Use `backTo` and `backLabel` props to add a route object and a label to the back link.",
    },
  },
};

export const TitleSize = DefaultTemplate.bind({});
TitleSize.args = { titleSize: "2xl" };

export const Sizes = DefaultTemplate.bind({});
Sizes.args = { size: "2xl" };
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

export const BeforeTitleSlot = DefaultTemplate.bind({});
BeforeTitleSlot.args = {
  slotTemplate: `
    <template #before-title>
      <UIcon name="account_circle" color="primary" />
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
      <UIcon name="verified" color="primary" />
    </template>
    ${defaultTemplate}
  `,
};

export const ActionsSlot = DefaultTemplate.bind({});
ActionsSlot.args = {
  slotTemplate: `
    <template #actions>
      <URow class="max-w-fit">
        <UButton size="sm" variant="outlined" label="Clear" />
        <UButton size="sm" label="Submit" />
      </URow>
    </template>
    ${defaultTemplate}
  `,
};

export const FooterLeftSlot = DefaultTemplate.bind({});
FooterLeftSlot.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
      <UButton size="sm" label="Cancel" variant="subtle" />
    </template>
  `,
};

export const FooterRightSlot = DefaultTemplate.bind({});
FooterRightSlot.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-right>
      <UButton size="sm" label="Skip this step" variant="subtle" />
    </template>
  `,
};
