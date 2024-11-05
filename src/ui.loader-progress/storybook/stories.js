import { getArgTypes, getSlotNames } from "../../utils/storybook.ts";

import ULoaderProgress from "../ULoaderProgress.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import { useLoaderProgress } from "../useLoaderProgress.js";
import { loaderProgressOff, loaderProgressOn } from "../utilLoaderProgress.js";

/**
 * The `ULoaderProgress` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.loader-progress)
 */
export default {
  id: "9020",
  title: "Loaders and Skeletons / Loader Progress",
  component: ULoaderProgress,
  argTypes: {
    ...getArgTypes(ULoaderProgress.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoaderProgress, UButton, URow },
  setup() {
    const { loaderProgressOn, loaderProgressOff } = useLoaderProgress();
    const slots = getSlotNames(ULoaderProgress.__name);

    return { args, slots, loaderProgressOn, loaderProgressOff };
  },
  template: `
    <ULoaderProgress v-bind="args" resources="https://api.publicapis.org/entries"/>

    <URow gap="sm">
      <UButton label="On" size="sm" @click="loaderProgressOn('https://api.publicapis.org/entries')" />
      <UButton label="Off" size="sm" @click="loaderProgressOff('https://api.publicapis.org/entries')" />
    </URow>
  `,
});

const EnumVariantTemplate = (args, { argTypes }) => ({
  components: { ULoaderProgress, UButton, UCol, URow, UBadge },
  setup() {
    return {
      args,
      loaderProgressOff,
      loaderProgressOn,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UCol>
      <URow gap="sm" class="pb-4">
        <UButton label="On" size="sm" @click="loaderProgressOn('https://api.publicapis.org/images')" />
        <UButton label="Off" size="sm" @click="loaderProgressOff('https://api.publicapis.org/images')" />
      </URow>

      <URow
        align="center"
        v-for="(option, index) in options"
        :key="index"
      >
        <UBadge
          :label="option"
          :[args.enum]="option"
        />
        <ULoaderProgress
          resources="https://api.publicapis.org/images"
          class="static"
          :[args.enum]="option"
          v-bind="args"
        />
      </URow>

    </UCol>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { loading: false };

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };
