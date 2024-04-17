import { getArgTypes } from "../service.storybook";

import ULogo from "../ui.image-logo";
import URow from "../ui.container-row";

export default {
  id: "6020",
  title: "Images & Icons / Logo",
  component: ULogo,
  args: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  argTypes: {
    ...getArgTypes(ULogo.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULogo },
  setup() {
    return { args };
  },
  template: `
    <ULogo v-bind="args"/>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { ULogo, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <ULogo
        v-for="(size, index) in sizes"
        :key="index"
        v-bind="args"
        :size="size"
        :title="size"
      />
    </URow>
  `,
});

const SizesTitleTemplate = (args, { argTypes } = {}) => ({
  components: { ULogo, URow },
  setup() {
    return {
      args,
      sizes: argTypes.sizeTitle.options,
    };
  },
  template: `
    <URow>
      <ULogo
        v-for="(size, index) in sizes"
        :key="index"
        v-bind="args"
        :size-title="size"
        :title="size"
        size="md"
      />
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const sizesTitle = SizesTitleTemplate.bind({});
sizesTitle.args = {};

export const title = DefaultTemplate.bind({});
title.args = { title: "some title" };

export const label = DefaultTemplate.bind({});
label.args = { label: "label" };
