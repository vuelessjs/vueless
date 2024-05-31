import ULabel from "../ui.form-label";
import URow from "../ui.container-row";
import UButton from "../ui.button/index";
import UBadge from "../ui.text-badge";

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

const DefaultTemplate = (args) => ({
  components: { ULabel },
  setup() {
    return { args };
  },
  template: `
    <ULabel v-bind="args" />
  `,
});

const SlotTemplate = (args) => ({
  components: { ULabel, UBadge },
  setup() {
    return { args };
  },
  template: `
    <ULabel v-bind="args">
      ${args.slotTemplate}
    </ULabel>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { ULabel, URow },
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
      />
    </URow>
  `,
});

const placementTemplate = (args, { argTypes } = {}) => ({
  components: { ULabel, URow, UButton },
  setup() {
    return {
      args,
      placements: argTypes.placement.options,
    };
  },
  template: `
    <URow>
      <ULabel
        v-for="(placement, index) in placements"
        v-bind="args"
        :align="placement"
        :key="index"
      >
        <UButton text="Button"/>
      </ULabel>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = SizesTemplate.bind({});
Sizes.args = {};

export const Placement = placementTemplate.bind({});
Placement.args = {};

export const Error = DefaultTemplate.bind({});
Error.args = { error: "some error" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const slotFooter = SlotTemplate.bind({});
slotFooter.args = {
  slotTemplate: `
    <template #footer>
      <UBadge label="favourite" color="green" size="sm" />
    </template>
  `,
};
