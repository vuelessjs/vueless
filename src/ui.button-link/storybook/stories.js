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
    ...getArgTypes(ULink.name),
    route: { control: { type: "text" } },
  },
};

const DefaultTemplate = (args) => ({
  components: { ULink, UButton, UIcon },
  setup() {
    const slots = getSlotNames(ULink.name);

    return { args, slots };
  },
  template: `
    <ULink v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </ULink>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
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

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const colors = EnumVariantTemplate.bind({});
colors.args = { enum: "color" };

export const types = EnumVariantTemplate.bind({});
types.args = { enum: "type" };

export const underlined = EnumVariantTemplate.bind({});
underlined.args = { enum: "color", underlined: true, dashed: false };

export const dashed = EnumVariantTemplate.bind({});
dashed.args = { enum: "color", dashed: true };

export const url = DefaultTemplate.bind({});
url.args = { url: "https://storybook.js.org/docs/react/get-started/introduction" };

export const route = DefaultTemplate.bind({});
route.args = { name: "SomeRouterRouteName" };

export const targetBlank = DefaultTemplate.bind({});
targetBlank.args = {
  url: "https://storybook.js.org/docs/react/get-started/introduction",
  targetBlank: true,
};

export const disabled = DefaultTemplate.bind({});
disabled.args = { disabled: true };

export const noRing = DefaultTemplate.bind({});
noRing.args = { noRing: true };

export const slotDefault = DefaultTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      <UButton label="Text" />
    </template>
  `,
};

export const slotLeft = DefaultTemplate.bind({});
slotLeft.args = {
  slotTemplate: `
    <template #left>
      <UIcon name="star" size="xs" />
    </template>
  `,
};

export const slotRight = DefaultTemplate.bind({});
slotRight.args = {
  slotTemplate: `
    <template #right>
      <UIcon name="star" size="xs" />
    </template>
  `,
};
