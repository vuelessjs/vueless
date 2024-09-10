import ULoader from "../ui.loader";
import URow from "../ui.container-row/URow.vue";
import UButton from "../ui.button/UButton.vue";
import { ref } from "vue";

import { getArgTypes, getSlotNames, getSlotsFragment } from "../../utils/utilStorybook.js";

/**
 * The `ULoader` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.loader)
 */
export default {
  id: "9010",
  title: "Loaders and Skeletons / Loader",
  component: ULoader,
  args: {
    loading: true,
  },
  argTypes: {
    ...getArgTypes(ULoader.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoader },
  setup() {
    const slots = getSlotNames(ULoader.name);

    return { args, slots };
  },
  template: `
    <ULoader v-bind="args">
      ${args.slotTemplate || getSlotsFragment()}
    </ULoader>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { ULoader, URow },
  setup() {
    return {
      args,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <URow class="flex-wrap">
      <ULoader
        v-for="(option, index) in options"
        :key="index"
        v-bind="args"
        :[args.enum]="option"
      />
    </URow>
  `,
});

const LoadingTemplate = (args) => ({
  components: { ULoader, UButton, URow },
  setup() {
    function toggleLoader() {
      isLoading.value = !isLoading.value;
    }

    const isLoading = ref(false);

    return { args, isLoading, toggleLoader };
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

export const sizes = EnumVariantTemplate.bind({});
sizes.args = { enum: "size" };

export const colors = EnumVariantTemplate.bind({});
colors.args = { enum: "color" };

export const loading = LoadingTemplate.bind({});
loading.args = {};
