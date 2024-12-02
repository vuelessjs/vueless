import type { Meta, StoryFn } from "@storybook/vue3";

import { ref, computed, onMounted, useTemplateRef } from "vue";

import UAlert from "../../../ui.text-alert/UAlert.vue";
import UButton from "../../../ui.button/UButton.vue";
import UCalendar from "../../../ui.form-calendar/UCalendar.vue";
import clickOutside from "../vClickOutside.ts";
import type { ClickCallback } from "../types.ts";

/**
 * The `v-click-outside` directive. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/directives/clickOutside)
 */
export default {
  id: "7022",
  title: "Directives / Click Outside",
  args: {},
  argTypes: {},
} as Meta;

interface VOnClickOutsideArgs {
  callback: ClickCallback;
}

const DefaultTemplate: StoryFn<VOnClickOutsideArgs> = (args: VOnClickOutsideArgs) => ({
  components: { UButton, UCalendar, UAlert },
  directives: { clickOutside },
  setup() {
    const date = ref(new Date());
    const isShownCalendar = ref(false);

    const buttonLabel = computed(() =>
      isShownCalendar.value ? "Close calendar" : "Open calendar",
    );

    function toggleCalendar() {
      isShownCalendar.value = !isShownCalendar.value;
    }

    function closeCalendar() {
      isShownCalendar.value = false;
    }

    return { date, isShownCalendar, buttonLabel, toggleCalendar, closeCalendar, args };
  },
  template: `
    <UButton :label="buttonLabel" @click="toggleCalendar" v-click-outside="closeCalendar" />

    <UCalendar v-model="date" v-if="isShownCalendar" class="mt-2" />

    <UAlert class="mt-4" variant="secondary">
      <p>
        Click on calendar itself will trigger directive callback, use ignore option to prevent this behavior.
      </p>
    </UAlert>
  `,
});

const SettingsTemplate: StoryFn<VOnClickOutsideArgs> = (args: VOnClickOutsideArgs) => ({
  components: { UButton, UCalendar, UAlert },
  directives: { clickOutside },
  setup() {
    const date = ref(new Date());
    const isShownCalendar = ref(false);
    const calendarRef = useTemplateRef("calendar");
    const clickOutsideOptions = ref({});

    const buttonLabel = computed(() =>
      isShownCalendar.value ? "Close calendar" : "Open calendar",
    );

    onMounted(() => {
      clickOutsideOptions.value = { ignore: [calendarRef] };
    });

    function toggleCalendar() {
      isShownCalendar.value = !isShownCalendar.value;
    }

    function closeCalendar() {
      isShownCalendar.value = false;
    }

    return {
      date,
      isShownCalendar,
      buttonLabel,
      toggleCalendar,
      closeCalendar,
      clickOutsideOptions,
      args,
    };
  },
  template: `
    <UButton :label="buttonLabel" @click="toggleCalendar" v-click-outside="[closeCalendar, clickOutsideOptions]" />

    <div ref="calendar" class="w-fit">
      <UCalendar v-model="date" v-if="isShownCalendar" class="mt-2" />
    </div>

    <UAlert class="mt-4" variant="secondary">
      <p>
        Click on calendar will not trigger directive callback now.
      </p>
    </UAlert>
  `,
});

export const Default = DefaultTemplate.bind({});
Default.args = { callback: () => undefined };

export const Settings = SettingsTemplate.bind({});
Settings.args = {};

Settings.parameters = {
  docs: {
    source: {
      code: `
        <UButton @click="toggleCalendar" v-click-outside="[closeCalendar, { ignore: [calendarRef] }]" />
      `,
    },
  },
};
