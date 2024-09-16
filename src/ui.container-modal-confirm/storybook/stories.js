import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UModalConfirm from "../../ui.container-modal-confirm/UModalConfirm.vue";
import UButton from "../../ui.button/UButton.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import URow from "../../ui.container-row/URow.vue";

/**
 * The `UModalConfirm` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-modal-confirm)
 */
export default {
  id: "5080",
  title: "Containers / Modal Confirm",
  component: UModalConfirm,
  args: {
    title: "Modal Confirm title",
    confirmLabel: "Confirm",
    modelValue: false,
  },
  argTypes: {
    ...getArgTypes(UModalConfirm.__name),
  },
  parameters: {
    docs: {
      story: {
        height: "360px",
      },
    },
  },
};

const defaultTemplate = "Confirm the action?";

const DefaultTemplate = (args) => ({
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

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UModalConfirm, UButton, URow },
  setup() {
    function onClick(value) {
      argTypes[args.enum].name === "confirmColor"
        ? (args.confirmColor = value)
        : (args.width = value);

      args.modelValue = true;
    }

    return {
      args,
      onClick,
      options: argTypes[args.enum].options,
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

export const WithoutCancelButton = DefaultTemplate.bind({});
WithoutCancelButton.args = { cancelButton: false };

export const DisableAcceptButton = DefaultTemplate.bind({});
DisableAcceptButton.args = { confirmDisabled: true };

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "width" };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "confirmColor" };

export const SlotHeaderLeftBefore = DefaultTemplate.bind({});
SlotHeaderLeftBefore.args = {
  slotTemplate: `
    <template #header-left-before>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotHeaderLeft = DefaultTemplate.bind({});
SlotHeaderLeft.args = {
  slotTemplate: `
    <template #header-left>
      <UHeader size="lg" label="Large title" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotHeaderLeftAfter = DefaultTemplate.bind({});
SlotHeaderLeftAfter.args = {
  slotTemplate: `
    <template #header-left-after>
      <UIcon
        name="star"
        color="gray"
      />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotHeaderRight = DefaultTemplate.bind({});
SlotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
      <UButton label="I'm in the right slot" size="sm" color="gray" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
      🤘🤘🤘
    </template>
  `,
};

export const SlotFooterRight = DefaultTemplate.bind({});
SlotFooterRight.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-right>
      <UButton label="I'm in the right slot" size="sm" color="gray" />
    </template>
  `,
};
