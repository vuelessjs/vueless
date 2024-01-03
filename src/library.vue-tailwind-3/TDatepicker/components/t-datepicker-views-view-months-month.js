import { h } from "vue";
import { isSameMonth } from "../../services/date.service";

const TDatepickerViewsViewMonthsMonth = {
  name: "TDatepickerViewsViewMonthsMonth",

  emits: ["click"],

  props: {
    month: {
      type: Date,
      required: true,
    },
    value: {
      type: [Date, Array],
      default: null,
    },
    activeDate: {
      type: Date,
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
    showActiveDate: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    isSelected() {
      const d1 = this.getMonth();
      const d2 = this.value;

      if (d2 instanceof Date) {
        return isSameMonth(d1, d2);
      }

      if (Array.isArray(d2)) {
        return d2.some((d) => isSameMonth(d, d1));
      }

      return false;
    },
    isActive() {
      const d1 = this.getMonth();
      const d2 = this.activeDate;

      return isSameMonth(d1, d2);
    },
    monthFormatted() {
      return this.formatNative(this.getMonth(), "M");
    },
  },

  methods: {
    getClass() {
      if (this.isSelected) {
        return this.getElementCssClass("selectedMonth");
      }

      if (this.isActive && this.showActiveDate) {
        return this.getElementCssClass("activeMonth");
      }

      return this.getElementCssClass("month");
    },
    getMonth() {
      return this.month;
    },
  },

  render() {
    const monthSlot = this.$slots.month
      ? this.$slots.month({
          monthFormatted: this.monthFormatted,
          isSelected: this.isSelected,
          isActive: this.isActive,
          month: this.getMonth(),
          activeDate: this.activeDate,
          value: this.value,
        })
      : this.monthFormatted;

    return h(
      "button",
      {
        class: this.getClass(),
        "aria-label": this.formatNative(this.getMonth(), "F, Y"),
        "data-date": this.formatNative(this.getMonth(), "Y-m"),
        type: "button",
        tabindex: -1,
        onClick: (e) => this.$emit("click", e),
      },
      monthSlot,
    );
  },
};

export default TDatepickerViewsViewMonthsMonth;
