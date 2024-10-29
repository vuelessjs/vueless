import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

import ULink from "../../ui.button-link/ULink.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";

/**
 * The `ULink` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.button-link)
 */
export default {
  id: "1060",
  title: "Buttons & Links / Link",
  component: ULink,
  args: {
    label: "Link",
  },
  argTypes: {
    ...getArgTypes(ULink.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULink, UButton, UIcon },
  setup() {
    const slots = getSlotNames(ULink.__name);

    return { args, slots };
  },
  template: `
    <ULink v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </ULink>
  `,
});

const EnumVariantTemplate = (args, { argTypes }) => ({
  components: { ULink, URow },
  setup() {
    function getText(value) {
      return `Link ${value}`;
    }

    let prefixedOptions = argTypes[args.enum].options;

    if (argTypes[args.enum].name === "size") {
      prefixedOptions = prefixedOptions.map((option) => getText(option));
    }

    return { args, options: argTypes[args.enum].options, prefixedOptions };
  },
  template: `
    <URow>
      <ULink
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
        :label="prefixedOptions[index]"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Sizes = EnumVariantTemplate.bind({});
Sizes.args = { enum: "size" };

export const Colors = EnumVariantTemplate.bind({});
Colors.args = { enum: "color" };

export const Types = EnumVariantTemplate.bind({});
Types.args = { enum: "type" };

export const Underlined = EnumVariantTemplate.bind({});
Underlined.args = { enum: "color", underlined: true, dashed: false };

export const Dashed = EnumVariantTemplate.bind({});
Dashed.args = { enum: "color", dashed: true };

export const Href = DefaultTemplate.bind({});
Href.args = { href: "https://storybook.js.org/docs/react/get-started/introduction" };

export const Route = DefaultTemplate.bind({});
Route.args = { name: "routerName" };

export const TargetBlank = DefaultTemplate.bind({});
TargetBlank.args = {
  href: "https://storybook.js.org/docs/react/get-started/introduction",
  targetBlank: true,
};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const NoRing = DefaultTemplate.bind({});
NoRing.args = { noRing: true };

export const SlotDefault = DefaultTemplate.bind({});
SlotDefault.args = {
  slotTemplate: `
    <template #default>
      <UButton label="Text" />
    </template>
  `,
};

export const SlotLeft = DefaultTemplate.bind({});
SlotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon name="star" size="xs" />
    </template>
  `,
};

export const SlotRight = DefaultTemplate.bind({});
SlotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon name="star" size="xs" />
    </template>
  `,
};
