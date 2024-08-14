import ULabel from "../ui.form-label";
import URow from "../ui.container-row";
import UCol from "../ui.container-col";
import UText from "../ui.text-block";
import UIcon from "../ui.image-icon";

import { getArgTypes } from "../service.storybook";

/**
 * The `ULabel` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.form-label)
 */
export default {
  id: "3240",
  title: "Form Inputs & Controls / Label",
  component: ULabel,
  args: {
    label: "Label",
    description: "Description",
  },
  argTypes: {
    ...getArgTypes(ULabel.name),
  },
};

const message = "This is plain text";

const DefaultTemplate = (args) => ({
  components: { ULabel, UText },
  setup() {
    return { args };
  },
  template: `
    <ULabel v-bind="args">
      <UText v-bind="args">${message}</UText>
    </ULabel>
  `,
});

const SlotTemplate = (args) => ({
  components: { ULabel, UText, UIcon },
  setup() {
    return { args };
  },
  template: `
    <ULabel v-bind="args">
      <UText v-bind="args">${message}</UText>
      ${args.slotTemplate}
    </ULabel>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { ULabel, URow, UText },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <ULabel
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
      >
        <UText :size="size">This is <b>"{{ size }}"</b> size.</UText>
      </ULabel>
    </URow>
  `,
});

const LabelPlacementTemplate = (args, { argTypes } = {}) => ({
  components: { ULabel, UCol, UText },
  setup() {
    return {
      args,
      placements: argTypes.align.options,
    };
  },
  template: `
    <UCol>
      <ULabel
        v-for="(align, index) in placements"
        v-bind="args"
        :align="align"
        :key="index"
        class="border border-gray-200 rounded p-4"
      >
        <UText>This is <b>"{{ align }}"</b> label placement.</UText>
      </ULabel>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const LabelPlacement = LabelPlacementTemplate.bind({});
LabelPlacement.args = {};

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Error description" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const slotFooter = SlotTemplate.bind({});
slotFooter.args = {
  slotTemplate: `
    <template #footer>
      <UIcon name="star" color="green" />
    </template>
  `,
};
