import { getArgTypes, getSlotNames } from "../../utils/utilStorybook.js";

import ULoaderTop from "../../ui.loader-top/ULoaderTop.vue";
import UButton from "../../ui.button/UButton.vue";
import URow from "../../ui.container-row/URow.vue";
import UCol from "../../ui.container-col/UCol.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";

import { useLoaderTop } from "../useLoaderTop.js";
import { loaderTopOff, loaderTopOn } from "../utilLoaderTop.js";

/**
 * The `ULoaderTop` component. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/ui.loader-top)
 */
export default {
  id: "9020",
  title: "Loaders and Skeletons / Loader Top",
  component: ULoaderTop,
  argTypes: {
    ...getArgTypes(ULoaderTop.__name),
  },
};

const DefaultTemplate = (args) => ({
  components: { ULoaderTop, UButton, URow },
  setup() {
    const { loaderTopOn, loaderTopOff } = useLoaderTop();

    const slots = getSlotNames(ULoaderTop.__name);

    return { args, slots, loaderTopOn, loaderTopOff };
  },
  template: `
    <ULoaderTop v-bind="args" resources="https://api.publicapis.org/entries"/>

    <URow gap="sm">
      <UButton label="On" size="sm" @click="loaderTopOn('https://api.publicapis.org/entries')" />
      <UButton label="Off" size="sm" @click="loaderTopOff('https://api.publicapis.org/entries')" />
    </URow>
  `,
});

const EnumVariantTemplate = (args, { argTypes } = {}) => ({
  components: { ULoaderTop, UButton, UCol, URow, UBadge },
  setup() {
    return {
      args,
      loaderTopOff,
      loaderTopOn,
      options: argTypes[args.enum].options,
    };
  },
  template: `
    <UCol>
      <URow gap="sm" class="pb-4">
        <UButton label="On" size="sm" @click="loaderTopOn('https://api.publicapis.org/images')" />
        <UButton label="Off" size="sm" @click="loaderTopOff('https://api.publicapis.org/images')" />
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
        <ULoaderTop
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
Default.args = {};

export const Color = EnumVariantTemplate.bind({});
Color.args = { enum: "color" };
