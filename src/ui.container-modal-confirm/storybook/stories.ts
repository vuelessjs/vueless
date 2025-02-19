import { ref } from "vue";
import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UModalConfirm from "../../ui.container-modal-confirm/UModalConfirm.vue";
import UButton from "../../ui.button/UButton.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";
import type { BrandColors } from "../../types.ts";

interface UModalConfirmArgs extends Props {
  width: string;
  slotTemplate?: string;
  enum: "size" | "confirmColor";
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
  <p>You are about to complete the subscription upgrade. Any unsaved changes or unfinished processes will be lost.</p>
`;

const DefaultTemplate: StoryFn<UModalConfirmArgs> = (args: UModalConfirmArgs) => ({
  components: { UModalConfirm, UButton, UHeader, UIcon },
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

      <UButton label="show modal" @click="onClick"/>
    </div>
  `,
});

const EnumVariantTemplate: StoryFn<UModalConfirmArgs> = (
  args: UModalConfirmArgs,
  { argTypes },
) => ({
  components: { UModalConfirm, UButton, URow },
  setup() {
    function onClick(value: string) {
      argTypes?.[args.enum]?.name === "confirmColor"
        ? (args.confirmColor = value as BrandColors)
        : (args.width = value);

      args.modelValue = true;
    }

    return {
      args,
      onClick,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <div>
      <UModalConfirm v-bind="args" v-model="args.modelValue">
        ${defaultTemplate}
      </UModalConfirm>

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

export const Inner = DefaultTemplate.bind({});
Inner.args = { inner: true };
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

export const DisableAcceptButton = DefaultTemplate.bind({});
DisableAcceptButton.args = { confirmDisabled: true };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "confirmColor" };

export const Slots: StoryFn<UModalConfirmArgs> = (args) => ({
  components: { UModalConfirm, UIcon, UButton, UCol, UBadge, URow },
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
        <UModalConfirm v-bind="args" v-model="modalStates.beforeTitle">
          <template #before-title>
            <UIcon name="subscriptions" size="sm" />
          </template>
          ${defaultTemplate}
        </UModalConfirm>
        <UButton label="Show before-title slot modal" @click="modalStates.beforeTitle = true"/>
      </div>

      <div>
        <UModalConfirm v-bind="args" v-model="modalStates.title">
          <template #title>
            <UBadge label="Confirm Subscription Upgrade?" size="lg" />
          </template>
          ${defaultTemplate}
        </UModalConfirm>
        <UButton label="Show title slot modal" @click="modalStates.title = true"/>
      </div>

      <div>
        <UModalConfirm v-bind="args" v-model="modalStates.afterTitle">
          <template #after-title>
            <UIcon name="verified" size="sm" />
          </template>
          ${defaultTemplate}
        </UModalConfirm>
        <UButton label="Show after-title slot modal" @click="modalStates.afterTitle = true"/>
      </div>

      <div>
        <UModalConfirm v-bind="args" v-model="modalStates.actions">
          <template #actions="{ close }">
            <UButton size="sm" color="grayscale" label="Close" @click="close" />
          </template>
          ${defaultTemplate}
        </UModalConfirm>
        <UButton label="Show actions slot modal" @click="modalStates.actions = true"/>
      </div>

      <div>
        <UModalConfirm v-bind="args" v-model="modalStates.footerLeft">
          ${defaultTemplate}
          <template #footer-left>
            <UButton label="Back" />
          </template>
        </UModalConfirm>
        <UButton label="Show footer-left modal" @click="modalStates.footerLeft = true"/>
      </div>

      <div>
        <UModalConfirm v-bind="args" v-model="modalStates.footerRight">
          ${defaultTemplate}
          <template #footer-right>
            <UButton label="Submit" />
          </template>
        </UModalConfirm>
        <UButton label="Show footer-right modal" @click="modalStates.footerRight = true"/>
      </div>
    </UCol>
  `,
});
