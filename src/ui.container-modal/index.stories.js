import { getArgTypes } from "../service.storybook";

import UModal from "../ui.container-modal";
import UButton from "../ui.button";
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
    value: false,
    slotDefaultTemplate: `
      <template #default>
        <URow>
          <UInput label="Name" />
          <UInput label="Lastname" />
        </URow>

        <UTextarea class="mb-7" label="Comments" rows="3" />
      </template>
    `,
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

const DefaultTemplate = (args) => ({
  components: { UModal, URow, UButton, UIcon, UHeader, UInput, UTextarea },
  setup() {
    return { args };
  },
  template: `
    <div>
      <UModal v-bind="args" v-model="args.value">
        ${args.slotDefaultTemplate}
        ${args.slotTemplate || ""}
      </UModal>

      <UButton label="show modal" @click="onClick"/>
    </div>
  `,
  methods: {
    onClick() {
      args.value = true;
    },
  },
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UModal, UButton, URow, UInput, UTextarea },
  setup() {
    return {
      args,
      sizes: argTypes.width.options,
    };
  },
  template: `
    <div>
      <UModal v-bind="args" v-model="args.value">
        ${args.slotDefaultTemplate}
        ${args.slotTemplate || ""}
      </UModal>

      <URow>
        <UButton
          v-for="(size, index) in sizes"
          :key="index" :label="size" @click="onClick(size)"
        />
      </URow>
    </div>
  `,
  methods: {
    onClick(value) {
      args.width = value;
      args.value = true;
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = { text: "" };

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
  `,
};

export const slotHeaderLeft = DefaultTemplate.bind({});
slotHeaderLeft.args = {
  slotTemplate: `
    <template #header-left>
      <UHeader size="lg" label="Large title" />
    </template>
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
  `,
};

export const slotHeaderRight = DefaultTemplate.bind({});
slotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
       <UButton size="sm" color="gray" label="some button" />
    </template>
  `,
};

export const slotFooterLeft = DefaultTemplate.bind({});
slotFooterLeft.args = {
  slotTemplate: `
    <template #footer-left>
      <UButton label="Submit" />
    </template>
  `,
};

export const slotFooterRight = DefaultTemplate.bind({});
slotFooterRight.args = {
  slotTemplate: `
    <template #footer-right>
      <UButton label="Back" />
    </template>
  `,
};
