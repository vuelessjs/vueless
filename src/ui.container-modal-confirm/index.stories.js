import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import UModalConfirm from "../ui.container-modal-confirm";
import UButton from "../ui.button";
import UHeader from "../ui.text-header";
import UIcon from "../ui.image-icon";
import URow from "../ui.container-row";

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
    ...getArgTypes(UModalConfirm.name),
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

    const slots = getSlotNames(UModalConfirm.name);

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
      argTypes[args.enum].name === "color" ? (args.color = value) : (args.width = value);

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

export const withoutCancelButton = DefaultTemplate.bind({});
withoutCancelButton.args = { cancelButton: false };

export const disableAcceptButton = DefaultTemplate.bind({});
disableAcceptButton.args = { confirmDisabled: true };

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "width", text: "" };

export const color = EnumVariantTemplate.bind({});
color.args = { enum: "color", text: "" };

export const slotHeaderLeftBefore = DefaultTemplate.bind({});
slotHeaderLeftBefore.args = {
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

export const slotHeaderLeft = DefaultTemplate.bind({});
slotHeaderLeft.args = {
  slotTemplate: `
    <template #header-left>
      <UHeader size="lg" label="Large title" />
    </template>
    ${defaultTemplate}
  `,
};

export const slotHeaderLeftAfter = DefaultTemplate.bind({});
slotHeaderLeftAfter.args = {
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

export const slotHeaderRight = DefaultTemplate.bind({});
slotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
      <UButton label="I'm in the right slot" size="sm" color="gray" />
    </template>
    ${defaultTemplate}
  `,
};

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      🤘🤘🤘
    </template>
  `,
};

export const slotFooterRight = DefaultTemplate.bind({});
slotFooterRight.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-right>
      <UButton label="I'm in the right slot" size="sm" color="gray" />
    </template>
  `,
};
