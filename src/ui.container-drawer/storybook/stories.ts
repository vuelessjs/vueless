import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UDrawer from "../../ui.container-drawer/UDrawer.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import USkeleton from "../../ui.skeleton/USkeleton.vue";
import USkeletonText from "../../ui.skeleton-text/USkeletonText.vue";
import USkeletonInput from "../../ui.skeleton-input/USkeletonInput.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";
import type { UnknownObject } from "../../types";

interface UDrawerArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "position";
  modelValues?: UnknownObject;
}

export default {
  id: "5000",
  title: "Containers / Drawer",
  component: UDrawer,
  args: {
    title: "Sign Up",
    modelValue: false,
  },
  argTypes: {
    ...getArgTypes(UDrawer.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UDrawer.__name),
      story: {
        height: "550px",
      },
    },
  },
} as Meta;

const defaultTemplate = `
  <UCol
    justify="between"
    align="stretch"
    class="h-full min-w-96"
    gap="xl"
  >
    <USkeletonText />

    <URow
      align="center"
      justify="between"
      gap="sm"
    >
      <USkeleton class="h-12" />
      <USkeleton class="h-12" />
    </URow>

    <UCol gap="sm" block>
      <USkeletonInput label label-align="top" />
      <USkeletonInput label label-align="top" />
    </UCol>
  </UCol>
`;

const DefaultTemplate: StoryFn<UDrawerArgs> = (args: UDrawerArgs) => ({
  components: {
    UDrawer,
    URow,
    UCol,
    UButton,
    UIcon,
    UHeader,
    USkeleton,
    USkeletonText,
    USkeletonInput,
  },
  setup() {
    function onClick() {
      args.modelValue = true;
    }

    const slots = getSlotNames(UDrawer.__name);

    return { args, slots, onClick };
  },
  template: `
    <UCol>
      <UDrawer v-bind="args" v-model="args.modelValue">
        ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
      </UDrawer>

      <UButton label="Show drawer" @click="onClick" />
    </UCol>
  `,
});

const EnumTemplate: StoryFn<UDrawerArgs> = (args: UDrawerArgs, { argTypes }) => ({
  components: {
    UDrawer,
    UButton,
    URow,
    UCol,
    USkeleton,
    USkeletonText,
    USkeletonInput,
  },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UButton
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        :label="option"
        @click="args.modelValues[option] = !args.modelValues[option]"
      />

      <UDrawer
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        v-bind="getArgs(args, option)"
        v-model="args.modelValues[option]"
      >
        ${defaultTemplate}
      </UDrawer>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = {
  description: "Enter your email below to get started and create your account.",
};

export const NoHandle = DefaultTemplate.bind({});
NoHandle.args = { handle: false };

export const Inset = DefaultTemplate.bind({});
Inset.args = { inset: true };

export const NoCloseOnEscAndOverlay = DefaultTemplate.bind({});
NoCloseOnEscAndOverlay.args = {
  closeOnEsc: false,
  closeOnOverlay: false,
};

export const Position = EnumTemplate.bind({});
Position.args = { enum: "position", modelValues: {} };

export const Variant = EnumTemplate.bind({});
Variant.args = { enum: "variant", modelValues: {} };

export const BeforeTitleSlot = DefaultTemplate.bind({});
BeforeTitleSlot.args = {
  slotTemplate: `
    <template #before-title>
      <UIcon name="account_circle" size="sm" color="primary" />
    </template>
    <template #default>
      ${defaultTemplate}
    </template>
  `,
};

export const TitleSlot = DefaultTemplate.bind({});
TitleSlot.args = {
  slotTemplate: `
    <template #title="{ title }">
      <UHeader :label="title" color="primary" />
    </template>
    <template #default>
      ${defaultTemplate}
    </template>
  `,
};

export const AfterTitleSlot = DefaultTemplate.bind({});
AfterTitleSlot.args = {
  slotTemplate: `
    <template #after-title>
      <UIcon name="verified" size="sm" color="primary" />
    </template>
    <template #default>
      ${defaultTemplate}
    </template>
  `,
};

export const ActionsSlot = DefaultTemplate.bind({});
ActionsSlot.args = {
  slotTemplate: `
    <template #actions="{ close }">
      <UButton
        label="Close"
        size="sm"
        color="grayscale"
        variant="subtle"
        @click="close"
      />
    </template>
    <template #default>
      ${defaultTemplate}
    </template>
  `,
};

export const HandleSlot = DefaultTemplate.bind({});
HandleSlot.args = {
  slotTemplate: `
    <template #default>
      ${defaultTemplate}
    </template>
    <template #handle>
      <UIcon name="arrow_forward_ios" size="sm" color="neutral" />
    </template>
  `,
};

export const FooterLeftSlot = DefaultTemplate.bind({});
FooterLeftSlot.args = {
  slotTemplate: `
    <template #default>
      ${defaultTemplate}
    </template>

    <template #footer-left>
      <UButton label="Back" variant="subtle" color="neutral" />
    </template>
  `,
};

export const FooterRightSlot = DefaultTemplate.bind({});
FooterRightSlot.args = {
  slotTemplate: `
    <template #default>
      ${defaultTemplate}
    </template>

    <template #footer-right>
      <UButton label="Submit" variant="subtle" />
    </template>
  `,
};
