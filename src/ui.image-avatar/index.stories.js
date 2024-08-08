import { getArgTypes } from "../service.storybook";

import UAvatar from "../ui.image-avatar";
import URow from "../ui.container-row";
import UGroup from "../ui.container-group";

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

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { UGroup, URow, UAvatar },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UGroup gap="xl">
      <URow>
        <UAvatar
          v-for="(option, index) in options"
          :key="index"
          v-bind="args"
          :[args.enum]="option"
          :label="option"
        />
      </URow>
      <URow>
        <UAvatar
          v-for="(option, index) in options"
          :key="index"
          v-bind="args"
          :[args.enum]="option"
          :label="''"
        />
      </URow>
    </UGroup>
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
export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

/**
 * Hold cursor above an avatar to see value.
 */
export const rounded = EnumVariantTemplate.bind({});
rounded.args = { enum: "rounded", label: "John Doe", color: "orange" };

/**
 * Hold cursor above an avatar to see value.
 */
export const colors = EnumVariantTemplate.bind({});
colors.args = { enum: "color" };

/**
 * Hold cursor above an avatar to see value.
 */
export const bordered = EnumVariantTemplate.bind({});
bordered.args = { enum: "color", bordered: true };
