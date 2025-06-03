import { ref } from "vue";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UModal from "../../ui.container-modal/UModal.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UTextarea from "../../ui.form-textarea/UTextarea.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UCol from "../../ui.container-col/UCol.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";
import type { UnknownObject } from "../../types.ts";

interface UModalArgs extends Props {
  slotTemplate?: string;
  enum: "size";
  modelValues?: UnknownObject;
}

export default {
  id: "5070",
  title: "Containers / Modal",
  component: UModal,
  args: {
    title: "Subscription Upgrade",
    modelValue: false,
  },
  argTypes: {
    ...getArgTypes(UModal.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UModal.__name),
      story: {
        height: "500px",
      },
    },
  },
} as Meta;

const defaultTemplate = `
  <UCol align="stretch">
    <URow>
      <UInput label="Full Name" placeholder="John Doe" />
      <UInput label="Email Address" type="email" placeholder="john.doe@example.com" />
    </URow>

    <UTextarea label="Message" placeholder="Enter your message here..." rows="4" />
  </UCol>
`;

const DefaultTemplate: StoryFn<UModalArgs> = (args: UModalArgs) => ({
  components: { UModal, URow, UCol, UButton, UIcon, UHeader, UInput, UTextarea, UBadge },
  setup() {
    function onClick() {
      args.modelValue = true;
    }

    const slots = getSlotNames(UModal.__name);

    return { args, slots, onClick };
  },
  template: `
    <div>
      <UModal v-bind="args" v-model="args.modelValue">
        ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
      </UModal>

      <UButton label="Show modal" @click="onClick"/>
    </div>
  `,
});

const EnumTemplate: StoryFn<UModalArgs> = (args: UModalArgs, { argTypes }) => ({
  components: { UModal, UButton, URow, UInput, UTextarea, UCol },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UButton
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        :label="option"
        @click="args.modelValues[option] = !args.modelValues[option]"
      />

      <UModal
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        v-bind="getArgs(args, option)"
        v-model="args.modelValues[option]"
      >
        You are about to complete the subscription upgrade.
        Any unsaved changes or unfinished processes will be lost.
      </UModal>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = {
  description: "Upgrade your subscription to unlock premium features and benefits.",
};

export const Inner: StoryFn<UModalArgs> = (args: UModalArgs) => ({
  components: { UModal, UButton },
  setup() {
    const showMainModal = ref(false);
    const showInnerModal = ref(false);

    function openMainModal() {
      showMainModal.value = true;
    }

    function openInnerModal() {
      showInnerModal.value = true;
    }

    return { args, showMainModal, showInnerModal, openMainModal, openInnerModal };
  },
  template: `
    <div>
      <UModal v-bind="args" v-model="showMainModal">
        <p>
          Are you sure you want to cancel your subscription?
          This action will remove access to premium features and cannot be undone.
        </p>
        <UButton label="View Plan Details" @click="openInnerModal"/>

        <UModal
          v-model="showInnerModal"
          title="Current Plan Details"
          description="
            Your current plan includes unlimited access to premium content,
            priority support, and exclusive features.
          "
          inner
        >
          <p>Consider downgrading instead of canceling</p>
        </UModal>

        <template #footer-right>
          <UButton label="Cancel" variant="outlined" @click="showMainModal = false" />
          <UButton label="Confirm" @click="showMainModal = false" />
        </template>
      </UModal>

      <UButton label="Manage Subscription" @click="openMainModal"/>
    </div>
  `,
});
Inner.parameters = {
  docs: {
    description: {
      story: "Add extra top margin for modal inside another modal.",
    },
  },
};

export const WithoutDivider = DefaultTemplate.bind({});
WithoutDivider.args = {
  divided: false,
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
      <UButton label="Back" />
    </template>`,
};
WithoutDivider.parameters = {
  docs: {
    description: {
      story: "Hide divider between content and footer.",
    },
  },
};

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size", modelValues: {} };

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

export const BeforeTitleSlot = DefaultTemplate.bind({});
BeforeTitleSlot.args = {
  slotTemplate: `
    <template #before-title>
      <UIcon name="account_circle" size="sm" />
    </template>
    <template #default>
      You are about to complete the subscription upgrade. Any unsaved changes or unfinished processes will be lost.
    </template>
  `,
};

export const TitleSlot = DefaultTemplate.bind({});
TitleSlot.args = {
  slotTemplate: `
    <template #title>
      <UBadge label="Subscription Upgrade" size="lg" />
    </template>
    <template #default>
      You are about to complete the subscription upgrade. Any unsaved changes or unfinished processes will be lost.
    </template>
  `,
};

export const AfterTitleSlot = DefaultTemplate.bind({});
AfterTitleSlot.args = {
  slotTemplate: `
    <template #after-title>
      <UIcon name="verified" size="sm" />
    </template>
    <template #default>
      You are about to complete the subscription upgrade. Any unsaved changes or unfinished processes will be lost.
    </template>
  `,
};

export const ActionsSlot = DefaultTemplate.bind({});
ActionsSlot.args = {
  config: { closeButton: "p-0" },
  slotTemplate: `
    <template #actions="{ close }">
      <UButton size="sm" color="grayscale" label="Close" @click="close" />
    </template>
    <template #default>
      You are about to complete the subscription upgrade. Any unsaved changes or unfinished processes will be lost.
    </template>
  `,
};

export const FooterLeftSlot = DefaultTemplate.bind({});
FooterLeftSlot.args = {
  slotTemplate: `
    <template #footer-left>
      <UButton label="Back" />
    </template>
    <template #default>
      You are about to complete the subscription upgrade. Any unsaved changes or unfinished processes will be lost.
    </template>
  `,
};

export const FooterRightSlot = DefaultTemplate.bind({});
FooterRightSlot.args = {
  slotTemplate: `
    <template #footer-right>
      <UButton label="Submit" />
    </template>
    <template #default>
      You are about to complete the subscription upgrade. Any unsaved changes or unfinished processes will be lost.
    </template>
  `,
};
