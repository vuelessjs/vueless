import { h } from "vue";

const TDatepickerViewsViewYearsYear = {
  name: "TDatepickerViewsViewYearsYear",

  emits: ["click"],

  props: {
    year: {
      type: Date,
      required: true,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    value: {
      type: [Date, Array],
      default: null,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
    showActiveDate: {
      type: Boolean,
      required: true,
    },
    formatNative: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
    };
  },

  computed: {
    isSelected() {
      const d1 = this.getYear();
      const d2 = this.value;

      if (d2 instanceof Date) {
        return d1.getFullYear() === d2.getFullYear();
      }

      if (Array.isArray(d2)) {
        return d2.some((d) => d.getFullYear() === d1.getFullYear());
      }

      return false;
    },
    isActive() {
      const d1 = this.getYear();
      const d2 = this.activeDate;

      return d2 && d1.getFullYear() === d2.getFullYear();
    },
    yearFormatted() {
      return this.formatNative(this.getYear(), "Y");
    },
  },

  watch: {
    activeDate(activeDate) {
      this.localActiveDate = new Date(activeDate.valueOf());
    },
  },

  methods: {
    getClass() {
      if (this.isSelected) {
        return this.getElementCssClass("selectedYear");
      }

      if (this.isActive && this.showActiveDate) {
        return this.getElementCssClass("activeYear");
      }

      return this.getElementCssClass("year");
    },
    getYear() {
      return this.year;
    },
  },

  render() {
    const yearSlot = this.$slots.year
      ? this.$slots.year({
          yearFormatted: this.yearFormatted,
          isSelected: this.isSelected,
          isActive: this.isActive,
          year: this.getYear(),
          activeDate: this.activeDate,
          value: this.value,
        })
      : this.yearFormatted;

    return h(
      "button",
      {
        class: this.getClass(),
        "aria-label": this.yearFormatted,
        "data-date": this.yearFormatted,
        type: "button",
        tabindex: -1,
        onClick: (e) => this.$emit("click", e),
      },
      yearSlot,
    );
  },
};

export default TDatepickerViewsViewYearsYear;
