import { ref } from "vue";
import {
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

interface UModalArgs extends Props {
  slotTemplate?: string;
  enum: "size";
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
  <URow>
    <UInput label="Full Name" placeholder="John Doe" />
    <UInput label="Email Address" type="email" placeholder="john.doe@example.com" />
  </URow>

  <UTextarea class="mb-7" label="Message" placeholder="Enter your message here..." rows="4" />
`;

const DefaultTemplate: StoryFn<UModalArgs> = (args: UModalArgs) => ({
  components: { UModal, URow, UButton, UIcon, UHeader, UInput, UTextarea },
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

const EnumVariantTemplate: StoryFn<UModalArgs> = (args: UModalArgs, { argTypes }) => ({
  components: { UModal, UButton, URow, UInput, UTextarea },
  setup() {
    type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

    function onClick(value: ModalSize) {
      args.size = value;
      args.modelValue = true;
    }

    return {
      args,
      options: argTypes?.[args.enum]?.options,
      onClick,
    };
  },
  template: `
    <div>
      <UModal v-bind="args" v-model="args.modelValue">
        ${defaultTemplate}
      </UModal>

      <URow>
        <UButton
          v-for="(option, index) in options"
          :key="index"
          :label="option"
          @click="onClick(option)"
        />
      </URow>
    </div>
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

export const Divider = DefaultTemplate.bind({});
Divider.args = {
  divider: true,
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
      <UButton label="Back" />
    </template>`,
};
Divider.parameters = {
  docs: {
    description: {
      story: "Show divider between content and footer.",
    },
  },
};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

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

export const Slots: StoryFn<UModalArgs> = (args) => ({
  components: { UModal, UIcon, UButton, UCol, UBadge, UInput, UTextarea, URow },
  setup() {
    const modalStates = ref({
      beforeTitle: false,
      title: false,
      afterTitle: false,
      actions: false,
      footerLeft: false,
      footerRight: false,
    });

    return { args, modalStates };
  },
  template: `
    <UCol gap="lg">
      <div>
        <UModal v-bind="args" v-model="modalStates.beforeTitle">
          <template #before-title>
            <UIcon name="account_circle" size="sm" />
          </template>
          ${defaultTemplate}
        </UModal>
        <UButton label="Show before-title slot modal" @click="modalStates.beforeTitle = true"/>
      </div>

      <div>
        <UModal v-bind="args" v-model="modalStates.title">
          <template #title>
            <UBadge label="Subscription Upgrade" size="lg" />
          </template>
          ${defaultTemplate}
        </UModal>
        <UButton label="Show title slot modal" @click="modalStates.title = true"/>
      </div>

      <div>
        <UModal v-bind="args" v-model="modalStates.afterTitle">
          <template #after-title>
            <UIcon name="verified" size="sm" />
          </template>
          ${defaultTemplate}
        </UModal>
        <UButton label="Show after-title slot modal" @click="modalStates.afterTitle = true"/>
      </div>

      <div>
        <UModal v-bind="args" v-model="modalStates.actions">
          <template #actions="{ close }">
            <UButton size="sm" color="grayscale" label="Close" @click="close" />
          </template>
          ${defaultTemplate}
        </UModal>
        <UButton label="Show actions slot modal" @click="modalStates.actions = true"/>
      </div>

      <div>
        <UModal v-bind="args" v-model="modalStates.footerLeft">
          ${defaultTemplate}
          <template #footer-left>
            <UButton label="Back" />
          </template>
        </UModal>
        <UButton label="Show footer-left modal" @click="modalStates.footerLeft = true"/>
      </div>

      <div>
        <UModal v-bind="args" v-model="modalStates.footerRight">
          ${defaultTemplate}
          <template #footer-right>
            <UButton label="Submit" />
          </template>
        </UModal>
        <UButton label="Show footer-right modal" @click="modalStates.footerRight = true"/>
      </div>
    </UCol>
  `,
});
