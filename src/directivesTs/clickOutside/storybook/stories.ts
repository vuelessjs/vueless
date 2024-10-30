import type { Meta } from "@storybook/vue3";
import { getArgTypes } from "../../../utils/utilStorybook.js";

import { ref, computed, onMounted, useTemplateRef } from "vue";

import UAlert from "../../../ui.text-alert/UAlert.vue";
import UButton from "../../../ui.button/UButton.vue";
import UCalendar from "../../../ui.form-calendar/UCalendar.vue";
import clickOutside from "../vClickOutside.ts";

/**
 * The `v-click-outside` directive. | [View on GitHub](https://github.com/vuelessjs/vueless/tree/main/src/directives/clickOutside)
 */
export default {
  id: "7022",
  title: "Directives / Click Outside",
  component: UButton,
  args: {},
  argTypes: {
    ...getArgTypes(UButton.__name),
  } as Meta,
};

const DefaultTemplate = () => ({
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

    return { date, isShownCalendar, buttonLabel, toggleCalendar, closeCalendar };
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

const SettingsTemplate = () => ({
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

export const Settings = SettingsTemplate.bind({});
