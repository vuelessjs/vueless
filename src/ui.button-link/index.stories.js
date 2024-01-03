import { getArgTypes, getSlotNames } from "vueless/service.storybook";

import ULink from "vueless/ui.button-link";
import UButton from "vueless/ui.button";
import URow from "vueless/ui.container-row";
export default {
  title: "Buttons & Links / Link",
  component: ULink,
  args: {
    text: "Link",
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

const ColorsTemplate = (args, { argTypes }) => ({
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
        :color="color"
        :text="color"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes }) => ({
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
        :size="size"
        :text="getText(size)"
        v-bind="args"
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
    <ULink text="Test" v-bind="args">
      ${args.slotTemplate}
    </ULink>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const slotDefault = SlotTemplate.bind({});
slotDefault.args = {
  slotTemplate: `
    <template #default>
      <UButton variant="secondary" text="Text" />
    </template>
  `,
};

export const dashed = ColorsTemplate.bind({});
dashed.args = { dashed: true };

export const url = DefaultTemplate.bind({});
url.args = { url: "https://storybook.js.org/docs/react/get-started/introduction" };

export const urlTargetBlank = DefaultTemplate.bind({});
urlTargetBlank.args = {
  url: "https://storybook.js.org/docs/react/get-started/introduction",
  targetBlank: true,
};
