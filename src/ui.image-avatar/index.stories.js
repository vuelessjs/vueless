import { getArgTypes } from "../service.storybook";

import UAvatar from "../ui.image-avatar";
import URow from "../ui.container-row";

export default {
  id: "6030",
  title: "Images & Icons / Avatar",
  component: UAvatar,
  argTypes: {
    ...getArgTypes(UAvatar.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UAvatar },
  setup() {
    return { args };
  },
  template: `
    <UAvatar v-bind="args" />
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { UAvatar, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <UAvatar
        v-for="(size, index) in sizes"
        v-bind="args"
        :size="size"
        :key="index"
      />
    </URow>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UAvatar, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow>
      <UAvatar
        v-for="(color, index) in colors"
        v-bind="args"
        :color="color"
        :key="index"
      />
    </URow>
  `,
  created() {
    this.mxArgTypes = argTypes;
  },
});

const RoundedTemplate = (args, { argTypes } = {}) => ({
  components: { UAvatar, URow },
  setup() {
    return {
      args,
      roundedValues: argTypes.rounded.options,
    };
  },
  template: `
    <URow>
      <UAvatar
        v-for="(rounded, index) in roundedValues"
        v-bind="args"
        :rounded="rounded"
        :key="index"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = { userName: "Name" };

export const rounded = RoundedTemplate.bind({});
rounded.args = { userName: "Name", color: "orange" };

export const bordered = ColorsTemplate.bind({});
bordered.args = { userName: "Name", bordered: true };

export const roundedFull = DefaultTemplate.bind({});
roundedFull.args = { userName: "Name", rounded: "full" };

export const userName = DefaultTemplate.bind({});
userName.args = { userName: "Name Surname" };
