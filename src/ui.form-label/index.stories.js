import ULabel from "../ui.form-label";
import UCol from "../ui.container-col";
import UText from "../ui.text-block";
import UIcon from "../ui.image-icon";

import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

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

const defaultTemplate = "This is plain text";

const DefaultTemplate = (args) => ({
  components: { ULabel, UText, UIcon },
  setup() {
    const slots = getSlotNames(ULabel.name);

    return { args, slots };
  },
  template: `
    <ULabel v-bind="args">
      <UText v-bind="args">${getSlotsFragment(defaultTemplate)}</UText>
      ${args.slotTemplate ? args.slotTemplate : ""}
    </ULabel>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { ULabel, UCol, UText },
  setup() {
    function getText(value, name) {
      return name === "size"
        ? `This is "<b>${value}</b>" size.`
        : `This is "<b>${value}</b>" label placement.`;
    }

    const { name, options } = argTypes[args.enum];
    const prefixedOptions = options.map((option) => getText(option, name));

    return {
      args,
      options: argTypes[args.enum].options,
      prefixedOptions,
    };
  },
  template: `
    <UCol>
      <ULabel
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :key="index"
        class="border border-gray-200 rounded p-4"
      >
        <UText :[args.enum]="option" v-html="prefixedOptions[index]" />
      </ULabel>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const LabelPlacement = EnumVariantTemplate.bind({});
LabelPlacement.args = { enum: "align" };

export const Error = DefaultTemplate.bind({});
Error.args = { error: "Error description" };

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const slotFooter = DefaultTemplate.bind({});
slotFooter.args = {
  slotTemplate: `
    <template #footer>
      <UIcon name="star" color="green" />
    </template>
  `,
};
