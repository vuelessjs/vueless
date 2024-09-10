import { getArgTypes, getSlotNames, getSlotsFragment } from "../utils/utilsStorybook";

import UModal from "../ui.container-modal";
import UButton from "../ui.button/UButton.vue";
import UIcon from "../ui.image-icon";
import UHeader from "../ui.text-header";
import UInput from "../ui.form-input";
import UTextarea from "../ui.form-textarea";
import URow from "../ui.container-row";

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
    ...getArgTypes(UModal.name),
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

    const slots = getSlotNames(UModal.name);

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
      args.width = value;
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

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "width", text: "" };

export const backRoute = DefaultTemplate.bind({});
backRoute.args = { backRoute: { title: "route title" } };

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      Some text
    </template>
  `,
};

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
      <UIcon
        name="archive"
        color="red"
      />
    </template>
    ${defaultTemplate}
  `,
};

export const slotCloseButton = DefaultTemplate.bind({});
slotCloseButton.args = {
  slotTemplate: `
    <template #close-button>
      <UButton size="sm" color="grayscale" label="Close" />
    </template>
    ${defaultTemplate}
  `,
};

export const slotFooterLeft = DefaultTemplate.bind({});
slotFooterLeft.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-left>
      <UButton label="Submit" />
    </template>
  `,
};

export const slotFooterRight = DefaultTemplate.bind({});
slotFooterRight.args = {
  slotTemplate: `
    ${defaultTemplate}
    <template #footer-right>
      <UButton label="Back" />
    </template>
  `,
};
