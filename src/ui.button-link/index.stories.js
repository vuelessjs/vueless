import { getArgTypes, getSlotNames, getSlotsFragment } from "../service.storybook";

import ULink from "../ui.button-link";
import UButton from "../ui.button";
import URow from "../ui.container-row";

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
  components: { ULink, UButton },
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
    const options = argTypes[args.enum].options;

    let prefixedOptions = [];

    if (argTypes[args.enum].name === "size") {
      prefixedOptions = options.map((option) => getText(option));
    } else {
      prefixedOptions = options;
    }

    function getText(value) {
      return `Link ${value}`;
    }

    return { args, options: argTypes[args.enum].options, prefixedOptions };
  },
  template: `
    <URow>
      <ULink
        v-for="(option, index) in options"
        v-bind="args"
        :[args.enum]="option"
        :label="prefixedOptions[index]"
        :key="index"
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
