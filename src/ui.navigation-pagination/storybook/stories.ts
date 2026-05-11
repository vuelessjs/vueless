import {
  getArgs,
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook";

import UPagination from "../../ui.navigation-pagination/UPagination.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";

import type { Meta, StoryFn } from "@storybook/vue3-vite";
import type { Props } from "../types";

interface UPaginationArgs extends Props {
  slotTemplate?: string;
  enum: "variant" | "size";
}

export default {
  id: "8050",
  title: "Navigation / Pagination",
  component: UPagination,
  args: {
    modelValue: 1,
    total: 900,
  },
  argTypes: {
    ...getArgTypes(UPagination.__name),
  },
  parameters: {
    docs: {
      ...getDocsDescription(UPagination.__name),
    },
  },
} as Meta;

const DefaultTemplate: StoryFn<UPaginationArgs> = (args: UPaginationArgs) => ({
  components: { UPagination },
  setup: () => ({ args, slots: getSlotNames(UPagination.__name) }),
  template: `
    <UPagination v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UPagination>
  `,
});

const EnumTemplate: StoryFn<UPaginationArgs> = (args: UPaginationArgs, { argTypes }) => ({
  components: { UPagination },
  setup: () => ({ args, argTypes, getArgs }),
  template: `
    <UPagination
      v-for="option in argTypes?.[args.enum]?.options"
      v-bind="getArgs(args, option)"
      :key="option"
      v-model="args.modelValue"
      class="mb-4"
    />
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Disabled = DefaultTemplate.bind({});
Disabled.args = { disabled: true };

export const PerPage = DefaultTemplate.bind({});
PerPage.args = { perPage: 100 };
PerPage.parameters = {
  docs: {
    description: {
      story: "Use `perPage` prop to control number of items shown per page.",
    },
  },
};

export const Limit = DefaultTemplate.bind({});
Limit.args = { limit: 11 };
Limit.parameters = {
  docs: {
    description: {
      story: "`limit` prop controls the limit of visible pages.",
    },
  },
};

export const Variants = EnumTemplate.bind({});
Variants.args = { enum: "variant" };

export const Sizes = EnumTemplate.bind({});
Sizes.args = { enum: "size" };

export const SetCustomNavigationLabel = DefaultTemplate.bind({});
SetCustomNavigationLabel.args = {
  prevLabel: "Prev",
  nextLabel: "Next",
  lastLabel: "Last",
  firstLabel: "First",
};
SetCustomNavigationLabel.parameters = {
  docs: {
    description: {
      story:
        // eslint-disable-next-line vue/max-len
        "Feel free to customize each navigation button via the respective prop (`firstLabel`, `prevLabel`, `nextLabel`, `lastLabel`).",
    },
  },
};

export const HideEllipsis = DefaultTemplate.bind({});
HideEllipsis.args = { ellipsis: false };
HideEllipsis.parameters = {
  docs: {
    description: {
      story: "You can hide ellipsis by setting `ellipsis` prop to `false`.",
    },
  },
};

export const HideNavButtons = DefaultTemplate.bind({});
HideNavButtons.args = { showLast: false, showFirst: false };
HideNavButtons.parameters = {
  docs: {
    description: {
      story:
        "If you need to hide first / last navigation buttons - set `showFirst` / `showLast` props to `false`.",
    },
  },
};

export const Slots: StoryFn<UPaginationArgs> = (args) => ({
  components: { UPagination, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UPagination v-bind="args" v-model="args.modelValue">
      <template #first>
        <UIcon name="keyboard_tab_rtl" color="primary" size="xs" />
      </template>

      <template #prev>
        <UIcon name="arrow_back" color="primary" size="xs" />
      </template>

      <template #ellipsis>
        <UIcon name="more_horiz" color="primary" size="xs" />
      </template>

      <template #next>
        <UIcon name="arrow_forward" color="primary" size="xs" />
      </template>

      <template #last>
        <UIcon name="keyboard_tab" color="primary" size="xs" />
      </template>
    </UPagination>
  `,
});
