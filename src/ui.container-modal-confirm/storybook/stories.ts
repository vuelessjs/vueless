import { ref } from "vue";
import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UModalConfirm from "../../ui.container-modal-confirm/UModalConfirm.vue";
import UModal from "../../ui.container-modal/UModal.vue";
import UButton from "../../ui.button/UButton.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";
import type { UnknownObject } from "../../types.ts";

interface UModalConfirmArgs extends Props {
  width: string;
  slotTemplate?: string;
  enum: "size" | "confirmColor";
  modelValues?: UnknownObject;
}

export default {
  id: "5080",
  title: "Containers / Modal Confirm",
  component: UModalConfirm,
  args: {
    title: "Confirm Subscription Upgrade?",
    confirmLabel: "Confirm",
    modelValue: false,
  },
  argTypes: {
    ...getArgTypes(UModalConfirm.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UModalConfirm.__name),
      story: {
        height: "360px",
      },
    },
  },
} as Meta;

const defaultTemplate = `
  You are about to complete the subscription upgrade. Any unsaved changes or unfinished processes will be lost.
`;

const DefaultTemplate: StoryFn<UModalConfirmArgs> = (args: UModalConfirmArgs) => ({
  components: { UModalConfirm, UButton, UHeader, UIcon, UModal, UBadge },
  setup() {
    function onClick() {
      args.modelValue = true;
    }

    const slots = getSlotNames(UModalConfirm.__name);

    return { args, slots, onClick };
  },
  template: `
    <div>
      <UModalConfirm v-bind="args" v-model="args.modelValue">
        ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
      </UModalConfirm>

      <UButton label="Show modal" @click="onClick"/>
    </div>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = {
  description: "Are you sure you want to upgrade? Your new plan will take effect immediately.",
};

export const ConfirmLabel = DefaultTemplate.bind({});
ConfirmLabel.args = { confirmLabel: "Upgrade" };
ConfirmLabel.parameters = {
  docs: {
    description: {
      story: "Set confirm button label.",
    },
  },
};

export const Inner: StoryFn<UModalConfirmArgs> = (args: UModalConfirmArgs) => ({
  components: { UModalConfirm, UButton, UModal },
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
      <UModalConfirm v-bind="args" v-model="showMainModal">
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
      </UModalConfirm>

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

export const Divider = DefaultTemplate.bind({});
Divider.args = {
  divided: true,
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
      <UButton label="Submit" />
    </template>`,
};
Divider.parameters = {
  docs: {
    description: {
      story: "Show divider between content and footer.",
    },
  },
};

export const WithoutCancelButton = DefaultTemplate.bind({});
WithoutCancelButton.args = { cancelHidden: true };

export const DisableConfirmButton = DefaultTemplate.bind({});
DisableConfirmButton.args = { confirmDisabled: true };

export const Sizes: StoryFn<UModalConfirmArgs> = (args: UModalConfirmArgs, { argTypes }) => ({
  components: { UModalConfirm, UButton, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UButton
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        :label="option"
        @click="args.modelValues[option] = !args.modelValues[option]"
      />

      <UModalConfirm
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        v-bind="getArgs(args, option)"
        v-model="args.modelValues[option]"
      >
        ${defaultTemplate}
      </UModalConfirm>
    </URow>
  `,
});
Sizes.args = { enum: "size", modelValues: {} };

export const Colors: StoryFn<UModalConfirmArgs> = (args: UModalConfirmArgs, { argTypes }) => ({
  components: { UModalConfirm, UButton, URow },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <URow>
      <UButton
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        :label="option"
        :color="option"
        @click="args.modelValues[option] = !args.modelValues[option]"
      />

      <UModalConfirm
        v-for="option in argTypes?.[args.enum]?.options"
        :key="option"
        v-bind="getArgs(args, option)"
        v-model="args.modelValues[option]"
      >
        ${defaultTemplate}
      </UModalConfirm>
    </URow>
  `,
});
Colors.args = { enum: "confirmColor", modelValues: {} };

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
  config: { confirmModal: { closeButton: "p-0" } },
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
      <UButton label="Restore" color="grayscale" />
    </template>
    <template #default>
      You are about to complete the subscription upgrade. Any unsaved changes or unfinished processes will be lost.
    </template>
  `,
};
