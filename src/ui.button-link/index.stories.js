import { getArgTypes, getSlotNames } from "../service.storybook";

import ULink from "../ui.button-link";
import UButton from "../ui.button";
import URow from "../ui.container-row";
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
  components: { ULink },
  setup() {
    const slots = getSlotNames(ULink.name);

    return { args, slots };
  },
  template: `
    <ULink v-bind="args">
      <template v-for="(slot, index) of slots" :key="index" v-slot:[slot]>
        <template v-if="args[slot]">{{ args[slot] }}</template>
      </template>
    </ULink>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { ULink, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <ULink
        v-for="(color, index) in colors"
        v-bind="args"
        :color="color"
        :label="color"
        :key="index"
      />
    </URow>
  `,
});

const TypesTemplate = (args, { argTypes } = {}) => ({
  components: { ULink, URow },
  setup() {
    return {
      args,
      types: argTypes.type.options,
    };
  },
  template: `
    <URow>
      <ULink
        v-for="(type, index) in types"
        v-bind="args"
        :label="type"
        :type="type"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { ULink, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <ULink
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :label="getText(size)"
        :key="index"
      />
    </URow>
  `,
  methods: {
    getText(value) {
      return `Link ${value}`;
    },
  },
});

const SlotTemplate = (args) => ({
  components: { UButton, ULink },
  setup() {
    return { args };
  },
  template: `
    <ULink>
      ${args.slotTemplate}
    </ULink>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = {};

export const types = TypesTemplate.bind({});
types.args = {};

export const underlined = ColorsTemplate.bind({});
underlined.args = { underlined: true, dashed: false };

export const dashed = ColorsTemplate.bind({});
dashed.args = { dashed: true };

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

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      <UButton label="Text" />
    </template>
  `,
};
