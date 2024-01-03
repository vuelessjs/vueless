import { h } from "vue";

const TDatepickerViewsViewCalendarHeaders = {
  name: "TDatepickerViewsViewCalendarHeaders",

  props: {
    weekStart: {
      type: Number,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    formatNative: {
      type: Function,
      required: true,
    },
  },

  computed: {
    weekDays() {
      return Array.from({ length: 7 }, (_x, i) => {
        const weekDay = this.weekStart + i;

        if (weekDay >= 7) {
          return weekDay - 7;
        }

        return weekDay;
      }).map(this.getWeekDayName);
    },
  },

  methods: {
    getWeekDayName(weekDay) {
      const date = new Date();

      date.setDate((date.getDate() + (7 + weekDay - date.getDay())) % 7);

      return this.formatNative(date, "D");
    },
  },

  render() {
    return h(
      "div",
      {
        class: this.getElementCssClass("calendarHeaderWrapper"),
      },
      this.weekDays.map((weekDayName) =>
        h(
          "span",
          {
            class: this.getElementCssClass("calendarHeaderWeekDay"),
          },
          weekDayName,
        ),
      ),
    );
  },
};

export default TDatepickerViewsViewCalendarHeaders;
