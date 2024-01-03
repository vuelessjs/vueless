import { getArgTypes } from "vueless/service.storybook";

import UModalConfirm from "vueless/ui.container-modal-confirm";
import UButton from "vueless/ui.button";
import UHeader from "vueless/ui.text-header";
import UIcon from "vueless/ui.image-icon";
import URow from "vueless/ui.container-row";

export default {
  title: "Containers / Modal Confirm",
  component: UModalConfirm,
  args: {
    title: "Modal Confirm title",
    actionButtonText: "Confirm",
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

      <UButton text="show modal" @click="onClick"/>
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

      <UButton text="show modal" @click="onClick"/>
    </div>
  `,
  methods: {
    onClick() {
      args.value = true;
    },
  },
});

const SizesTemplate = (args, { argTypes }) => ({
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
          :key="index" :text="size" @click="onClick(size)"
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
      <UHeader size="lg" text="Large title" />
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
       <UButton text="I'm in the right slot" size="sm" color="gray" />
    </template>
  `,
};
