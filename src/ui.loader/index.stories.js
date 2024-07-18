import ULoader from "../ui.loader";
import URow from "../ui.container-row";
import UButton from "../ui.button";

import { getArgTypes } from "../service.storybook";

/**
 * The `ULoader` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.loader)
 */
export default {
  id: "9010",
  title: "Loaders and Skeletons / Loader",
  component: ULoader,
  argTypes: {
    ...getArgTypes(ULoader.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoader },
  setup() {
    return { args };
  },
  template: `
    <ULoader v-bind="args" />
  `,
});

const ColorsTemplate = (args, { argTypes } = {}) => ({
  components: { ULoader, URow },
  setup() {
    return {
      args,
      colors: argTypes.color.options,
    };
  },
  template: `
    <URow class="flex-wrap">
      <ULoader
        v-for="(color, index) in colors"
        :color="color"
        v-bind="args"
        :key="index"
      />
    </URow>
  `,
});

const SizesTemplate = (args, { argTypes } = {}) => ({
  components: { ULoader, URow },
  setup() {
    return {
      args,
      sizes: argTypes.size.options,
    };
  },
  template: `
    <URow>
      <ULoader
        v-for="(size, index) in sizes"
        :key="index"
        v-bind="args"
        :size="size"
      />
    </URow>
  `,
});

const LoadingTemplate = (args) => ({
  components: { ULoader, UButton, URow },
  setup() {
    return { args };
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    toggleLoader() {
      this.isLoading = !this.isLoading;
    },
  },
  template: `
    <URow>
      <ULoader v-bind="args" :loading="isLoading" />
      <UButton @click="toggleLoader" size="sm">ToggleLoader</UButton>
    </URow>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const sizes = SizesTemplate.bind({});
sizes.args = {};

export const colors = ColorsTemplate.bind({});
colors.args = {};

export const loading = LoadingTemplate.bind({});
loading.args = {};
