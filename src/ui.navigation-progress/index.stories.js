import UProgress from "./index.vue";
import UButton from "../ui.button/index.vue";

import { getArgTypes } from "../service.storybook";

/**
 * The `UProgress` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.navigation-progress)
 */
export default {
  id: "8040",
  title: "Navigation / Progress",
  component: UProgress,
  argTypes: {
    ...getArgTypes(UProgress.name),
  },
};

const DefaultTemplate = (args) => ({
  components: { UProgress, UButton },
  setup() {
    return { args };
  },
  data() {
    return {
      progress: 10,
    };
  },
  methods: {
    updateProgress() {
      this.progress += 10;

      if (this.progress > 100) {
        this.progress = 0;
      }
    },
  },
  template: `
    <UProgress :value="progress" />

    <UButton class="mt-4" @click="updateProgress">Update Progress</UButton>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};
