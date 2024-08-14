import { getArgTypes } from "../service.storybook";

import UAvatar from "../ui.image-avatar";
import URow from "../ui.container-row";
import UCol from "../ui.container-col";

/**
 * The `UAvatar` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.image-avatar)
 */
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
  components: { UCol, URow, UAvatar },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <UCol gap="xl">
      <URow>
        <UAvatar
          v-for="(size, index) in sizes"
          :key="index"
          v-bind="args"
          :size="size"
          :label="size"
        />
      </URow>
      <URow>
        <UAvatar
          v-for="(size, index) in sizes"
          :key="index"
          v-bind="args"
          :size="size"
          :label="''"
        />
      </URow>
    </UCol>
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { UCol, URow, UAvatar },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <UCol gap="xl">
      <URow>
        <UAvatar
          v-for="(color, index) in colors"
          v-bind="args"
          :color="color"
          :key="index"
          :label="color"
        />
      </URow>
      <URow>
        <UAvatar
          v-for="(color, index) in colors"
          :key="index"
          v-bind="args"
          :color="color"
          :label="''"
        />
      </URow>
    </UCol>
  `,
});

const RoundedTemplate = (args, { argTypes } = {}) => ({
  components: { UCol, UAvatar, URow },
  setup() {
    return {
      args,
      roundedValues: argTypes.rounded.options,
    };
  },
  template: `
    <UCol>
      <URow>
        <UAvatar
          v-for="(rounded, index) in roundedValues"
          :key="index"
          v-bind="args"
          :rounded="rounded"
          :label="rounded"
        />
      </URow>
    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { size: "3xl" };

export const src = DefaultTemplate.bind({});
src.args = {
  src: "https://avatars.githubusercontent.com/u/16276298?v=4",
  size: "3xl",
};

export const label = DefaultTemplate.bind({});
label.args = { label: "Name Surname", size: "3xl" };

/**
 * Hold cursor above an avatar to see value.
 */
export const sizes = SizesTemplate.bind({});
sizes.args = {};

/**
 * Hold cursor above an avatar to see value.
 */
export const rounded = RoundedTemplate.bind({});
rounded.args = { label: "John Doe", color: "orange" };

/**
 * Hold cursor above an avatar to see value.
 */
export const colors = ColorsTemplate.bind({});
colors.args = {};

/**
 * Hold cursor above an avatar to see value.
 */
export const bordered = ColorsTemplate.bind({});
bordered.args = { bordered: true };
