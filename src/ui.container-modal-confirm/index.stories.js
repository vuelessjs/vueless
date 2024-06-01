import { getArgTypes } from "../service.storybook";

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
    slotTemplate: `
      <template #default>
       Confirm the action?
      </template>
    `,
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

const DefaultTemplate = (args) => ({
  components: { UModalConfirm, UButton },
  setup() {
    return { args };
  },
  template: `
    <div>
      <UModalConfirm v-bind="args" v-model="args.value">
        ${args.slotTemplate}
      </UModalConfirm>

      <UButton label="show modal" @click="onClick"/>
    </div>
  `,
  methods: {
    onClick() {
      args.value = true;
    },
  },
});

const SlotTemplate = (args) => ({
  components: { UModalConfirm, UButton, UHeader, UIcon },
  setup() {
    return { args };
  },
  template: `
    <div>
      <UModalConfirm v-bind="args" v-model="args.value">
        ${args.slotTemplate}
      </UModalConfirm>

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
  components: { UModalConfirm, UButton, URow },
  setup() {
    return {
      args,
      sizes: argTypes.width.options,
    };
  },
  template: `
    <div>
      <UModalConfirm v-bind="args" v-model="args.value">
        ${args.slotTemplate}
      </UModalConfirm>

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

const ColorTemplate = (args, { argTypes } = {}) => ({
  components: { UModalConfirm, UButton, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <div>
      <UModalConfirm v-bind="args" v-model="args.value">
        ${args.slotTemplate}
      </UModalConfirm>

      <URow>
        <UButton
          v-for="(color, index) in colors"
          :key="index" :label="color" @click="onClick(color)"
        />
      </URow>
    </div>
  `,
  methods: {
    onClick(value) {
      args.color = value;
      args.value = true;
    },
  },
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const withoutCancelButton = DefaultTemplate.bind({});
withoutCancelButton.args = { cancelButton: false };

export const disableAcceptButton = DefaultTemplate.bind({});
disableAcceptButton.args = { confirmDisabled: true };

export const sizes = SizesTemplate.bind({});
sizes.args = { text: "" };

export const color = ColorTemplate.bind({});
sizes.args = { text: "" };

export const slotHeaderLeftBefore = SlotTemplate.bind({});
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

export const slotHeaderLeft = SlotTemplate.bind({});
slotHeaderLeft.args = {
  slotTemplate: `
    <template #header-left>
      <UHeader size="lg" label="Large title" />
    </template>
  `,
};

export const slotHeaderLeftAfter = SlotTemplate.bind({});
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

export const slotHeaderRight = SlotTemplate.bind({});
slotHeaderRight.args = {
  slotTemplate: `
    <template #header-right>
       <UButton label="I'm in the right slot" size="sm" color="gray" />
    </template>
  `,
};

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      🤘🤘🤘
    </template>
  `,
};

export const slotFooterRight = SlotTemplate.bind({});
slotFooterRight.args = {
  slotTemplate: `
    <template #footer-right>
       <UButton label="I'm in the right slot" size="sm" color="gray" />
    </template>
  `,
};
