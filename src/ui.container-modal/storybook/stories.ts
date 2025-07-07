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
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UText from "../../ui.text-block/UText.vue";
import UInputPassword from "../../ui.form-input-password/UInputPassword.vue";
import UCheckbox from "../../ui.form-checkbox/UCheckbox.vue";
import UDivider from "../../ui.container-divider/UDivider.vue";

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
    title: "Sign Up",
    modelValue: true,
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

    <UButton label="Create account" block class="mt-4" />
  </UCol>
`;

const password = ref("");

const DefaultTemplate: StoryFn<UModalArgs> = (args: UModalArgs) => ({
  components: {
    UModal,
    URow,
    UCol,
    UButton,
    UIcon,
    UHeader,
    UInput,
    UInputPassword,
    UCheckbox,
    UDivider,
  },
  setup() {
    function onClick() {
      args.modelValue = true;

      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 500);
    }

    const slots = getSlotNames(UModal.__name);

    return { args, slots, onClick, password };
  },
  template: `
    <div>
      <UModal v-bind="args" v-model="args.modelValue" size="sm">
        ${args.slotTemplate || getSlotsFragment(defaultTemplate)}
      </UModal>

      <UButton label="Show modal" @click="onClick" />
    </div>
  `,
});

const EnumTemplate: StoryFn<UModalArgs> = (args: UModalArgs, { argTypes }) => ({
  components: {
    UModal,
    UButton,
    URow,
    UInput,
    UCol,
    UCheckbox,
    UInputPassword,
    UDivider,
  },
  setup: () => ({ args, argTypes, getArgs, password }),
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
        ${defaultTemplate}
      </UModal>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Description = DefaultTemplate.bind({});
Description.args = {
  description: "Enter your email below to get started and create your account.",
};

export const NoCloseOnEscAndOverlay = DefaultTemplate.bind({});
NoCloseOnEscAndOverlay.args = {
  closeOnEsc: false,
  closeOnOverlay: false,
};

export const Inner: StoryFn<UModalArgs> = (args: UModalArgs) => ({
  components: { UModal, UButton, UCol, UText, URow },
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
      <UModal title="Subscription canceling" v-model="showMainModal">
        <UCol gap="sm">
          <UText
            label="
              Are you sure you want to cancel your subscription?
              This action will remove access to premium features and cannot be undone.
            "
          />

          <UButton
            label="View Plan Details"
            variant="outlined"
            color="neutral"
            size="sm"
            @click="openInnerModal"
          />
        </UCol>

        <UModal
          v-model="showInnerModal"
          title="Current Plan Details"
          description="
            Your current plan includes unlimited access to premium content,
            priority support, and exclusive features.
          "
          inner
        >
          <UText label="Consider downgrading instead of canceling." />

          <template #footer-right>
            <URow>
              <UButton label="Downgrade" color="neutral" variant="subtle" />
            </URow>
          </template>
        </UModal>

        <template #footer-right>
          <UButton label="Cancel subscription" color="error" variant="subtle" @click="showMainModal = false" />
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
      <UButton label="Back" color="neutral" variant="subtle" />
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

export const BackLink: StoryFn<UModalArgs> = (args: UModalArgs) => ({
  components: { UModal, UButton, UCheckbox, UCol, URow, UDivider, UInput, UInputPassword },
  setup() {
    function onClick() {
      args.modelValue = true;
    }

    const showAlert = () => alert("You clicked on a back link!");

    return { args, onClick, password, showAlert };
  },
  template: `
    <div>
      <UModal
        v-bind="args"
        v-model="args.modelValue"
        size="sm"
        backLabel="Back"
        :backTo="{ path: '/' }"
        @back="showAlert"
      >
        ${defaultTemplate}
      </UModal>

      <UButton label="Show modal" @click="onClick"/>
    </div>
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
  config: { closeButton: "p-0" },
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
