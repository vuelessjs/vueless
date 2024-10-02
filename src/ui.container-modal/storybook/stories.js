import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import UModal from "../../ui.container-modal/UModal.vue";
import UButton from "../../ui.button/UButton.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UHeader from "../../ui.text-header/UHeader.vue";
import UInput from "../../ui.form-input/UInput.vue";
import UTextarea from "../../ui.form-textarea/UTextarea.vue";
import URow from "../../ui.container-row/URow.vue";

/**
 * The `UModal` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.container-modal)
 */
export default {
  id: "5070",
  title: "Containers / Modal",
  component: UModal,
  args: {
    title: "Modal title",
    modelValue: false,
  },
  argTypes: {
    ...getArgTypes(UModal.__name),
  },
  parameters: {
    docs: {
      story: {
        height: "500px",
      },
    },
  },
};

const defaultTemplate = `
  <URow>
    <UInput label="Name" />
    <UInput label="Lastname" />
  </URow>

  <UTextarea class="mb-7" label="Comments" rows="3" />
`;

const DefaultTemplate = (args) => ({
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

      <UButton label="show modal" @click="onClick"/>
    </div>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UModal, UButton, URow, UInput, UTextarea },
  setup() {
    function onClick(value) {
      args.size = value;
      args.modelValue = true;
    }

    return {
      args,
      options: argTypes[args.enum].options,
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

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const BackRoute = DefaultTemplate.bind({});
BackRoute.args = { backRoute: { title: "route title" } };

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
      Some text
    </template>
  `,
};

export const SlotBeforeTitle = DefaultTemplate.bind({});
SlotBeforeTitle.args = {
  slotTemplate: `
    <template #before-title>
      <UIcon name="star" color="gray" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotAfterTitle = DefaultTemplate.bind({});
SlotAfterTitle.args = {
  slotTemplate: `
    <template #after-title>
      <UIcon name="star" color="gray" />
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

export const SlotHeaderRight = DefaultTemplate.bind({});
SlotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
      <UIcon
        name="archive"
        color="red"
      />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotCloseButton = DefaultTemplate.bind({});
SlotCloseButton.args = {
  slotTemplate: `
    <template #close-button>
      <UButton size="sm" color="grayscale" label="Close" />
    </template>
    ${defaultTemplate}
  `,
};

export const SlotFooterLeft = DefaultTemplate.bind({});
SlotFooterLeft.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
      <UButton label="Submit" />
    </template>
  `,
};

export const SlotFooterRight = DefaultTemplate.bind({});
SlotFooterRight.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-right>
      <UButton label="Back" />
    </template>
  `,
};
