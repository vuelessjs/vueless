import {
  getArgTypes,
  getSlotNames,
  getSlotsFragment,
  getDocsDescription,
} from "../../utils/storybook.ts";

import UPagination from "../../ui.navigation-pagination/UPagination.vue";
import UCol from "../../ui.container-col/UCol.vue";
import URow from "../../ui.container-row/URow.vue";
import UBadge from "../../ui.text-badge/UBadge.vue";
import UIcon from "../../ui.image-icon/UIcon.vue";
import ULabel from "../../ui.form-label/ULabel.vue";

import type { Meta, StoryFn } from "@storybook/vue3";
import type { Props } from "../types.ts";

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
    ...getDocsDescription(UPagination.__name),
  },
} as Meta;

const DefaultTemplate: StoryFn<UPaginationArgs> = (args: UPaginationArgs) => ({
  components: { UPagination },
  setup() {
    const slots = getSlotNames(UPagination.__name);

    return { args, slots };
  },
  template: `
    <UPagination v-bind="args" v-model="args.modelValue">
      ${args.slotTemplate || getSlotsFragment("")}
    </UPagination>
  `,
});

const EnumVariantTemplate: StoryFn<UPaginationArgs> = (args: UPaginationArgs, { argTypes }) => ({
  components: { UPagination, UCol, URow, ULabel },
  setup() {
    return {
      args,
      options: argTypes?.[args.enum]?.options,
    };
  },
  template: `
    <UCol>
      <URow
        v-for="(option, index) in options"
        :key="index"
        align="center"
      >
        <ULabel :label="option">
          <UPagination v-bind="args" :[args.enum]="option" />
        </ULabel>
      </URow>
    </UCol>
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

export const Variant = EnumVariantTemplate.bind({});
Variant.args = { enum: "variant" };

export const Size = EnumVariantTemplate.bind({});
Size.args = { enum: "size" };

export const SetCustomNavigationLabel = DefaultTemplate.bind({});
SetCustomNavigationLabel.args = {
  prevLabel: "◀️",
  nextLabel: "▶️",
  lastLabel: "⏩",
  firstLabel: "⏪",
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
  components: { UPagination, UBadge, UCol, URow, UIcon },
  setup() {
    return { args };
  },
  template: `
    <UCol>
      <UPagination v-bind="args" v-model="args.modelValue">
        <template #first>
          <UBadge label="Slot First" size="sm" />
        </template>
      </UPagination>

      <UPagination v-bind="args" v-model="args.modelValue">
        <template #prev>
          <UBadge label="Slot Prev" size="sm" />
        </template>
      </UPagination>

      <URow align="center">
        <UPagination v-bind="args" v-model="args.modelValue">
          <template #ellipsis>
            <UIcon name="more_horiz" size="sm" internal="storybook" />
          </template>
        </UPagination>
        <span class="text-medium">Slot Ellipsis</span>
      </URow>

      <UPagination v-bind="args" v-model="args.modelValue">
        <template #next>
          <UBadge label="Slot Next" size="sm" />
        </template>
      </UPagination>

      <UPagination v-bind="args" v-model="args.modelValue">
        <template #last>
          <UBadge label="Slot Last" size="sm" />
        </template>
      </UPagination>
    </UCol>
  `,
});
