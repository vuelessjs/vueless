import { h } from "vue";
import TToggle from "./t-toggle";
import VueTailwindService from "../../services/vueTailwind.service";

const { isNumeric } = VueTailwindService;

const TDatepickerTimeSelector = {
  name: "TDatepickerTimeSelector",

  emits: ["submit", "blur", "input"],

  props: {
    parse: {
      type: Function,
      required: true,
    },
    format: {
      type: Function,
      required: true,
    },
    amPm: {
      type: Boolean,
      required: true,
    },
    showSeconds: {
      type: Boolean,
      required: true,
    },
    activeDate: {
      type: Date,
      required: true,
    },
    locale: {
      type: Object,
      required: true,
    },
    getElementCssClass: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      localActiveDate: new Date(this.activeDate.valueOf()),
      alreadyTriedAnInvalidValue: false,
      lastValidValue: "",
      timeInputKeys: [],
    };
  },

  computed: {
    amPmFormatted() {
      if (!this.amPm) {
        return null;
      }

      return this.format(this.localActiveDate, "K");
    },
    minutesFormatted() {
      return this.format(this.localActiveDate, "i");
    },
    hoursFormatted() {
      if (this.amPm) {
        return this.format(this.localActiveDate, "G");
      }

      return this.format(this.localActiveDate, "H");
    },
    secondsFormatted() {
      return this.format(this.localActiveDate, "S");
    },
  },

  watch: {
    timeInputKeys(timeInputKeys) {
      const numbers = timeInputKeys.join("").substr(this.showSeconds ? -6 : -4);
      const minutesInput = this.$refs.minutes;
      const hoursInput = this.$refs.hours;
      const fullTime = numbers
        .padStart(this.showSeconds ? 6 : 4, " ")
        .substr(this.showSeconds ? -6 : -4);

      if (this.showSeconds) {
        const secondsInput = this.$refs.seconds;

        secondsInput.value = fullTime.substr(4, 2).trim();
        minutesInput.value = fullTime.substr(2, 2).trim();
        hoursInput.value = fullTime.substr(0, 2).trim();
      } else {
        minutesInput.value = fullTime.substr(2, 2).trim();
        hoursInput.value = fullTime.substr(0, 2).trim();
      }
    },
    activeDate(activeDate) {
      this.localActiveDate = new Date(activeDate.valueOf());
      this.lastValidValue = "";
      this.alreadyTriedAnInvalidValue = false;
      this.timeInputKeys = [];
    },
  },

  methods: {
    handleFullTimeBlur(e) {
      this.$emit("blur", e);

      if (!this.timeInputKeys.length) {
        return;
      }

      const numbers = this.timeInputKeys
        .filter((key) => isNumeric(key))
        .join("")
        .substr(this.showSeconds ? -6 : -4);
      const fullTime = numbers
        .padStart(this.showSeconds ? 6 : 4, "0")
        .substr(this.showSeconds ? -6 : -4);
      let time;

      if (this.showSeconds) {
        if (this.amPm && Number(fullTime.substr(0, 2)) <= 12) {
          const formattedIntendedTime = `${fullTime.substr(0, 2)}:${fullTime.substr(
            2,
            2,
          )}:${fullTime.substr(4, 2)} ${this.amPmFormatted}`;

          time = this.parse(formattedIntendedTime, "H:i:S K");
        } else {
          const formattedIntendedTime = `${fullTime.substr(0, 2)}:${fullTime.substr(
            2,
            2,
          )}:${fullTime.substr(4, 2)}`;

          time = this.parse(formattedIntendedTime, "G:i:S");
        }
      } else if (this.amPm && Number(fullTime.substr(0, 2)) <= 12) {
        const formattedIntendedTime = `${fullTime.substr(0, 2)}:${fullTime.substr(2, 2)} ${
          this.amPmFormatted
        }`;

        time = this.parse(formattedIntendedTime, "H:i K");
      } else {
        const formattedIntendedTime = `${fullTime.substr(0, 2)}:${fullTime.substr(2, 2)}`;

        time = this.parse(formattedIntendedTime, "G:i");
      }

      if (time instanceof Date && !Number.isNaN(time)) {
        this.setHours(time.getHours());
        this.setMinutes(time.getMinutes());
        this.setSeconds(time.getSeconds());

        this.$emit("input", this.localActiveDate);

        this.$nextTick(() => {
          this.updateSecondsInput();
          this.updateMinutesInput();
          this.updateHoursInput();
        });
      }

      this.focusNextElementFullTimeSelector();
    },
    focusNextElementFullTimeSelector() {
      if (this.amPm) {
        this.$refs.amPm.focus();
      } else {
        this.focusOkButton();
      }
    },
    focusOkButton() {
      this.$refs.okButton.focus();
    },
    handleTimeInputFocus(e) {
      const input = e.target;

      input.focus();
      setTimeout(() => {
        input.setSelectionRange(0, 2);
      }, 1);
    },
    handleTimeInput(e, maxValue, minValue, valueHandler) {
      const input = e.target;
      const { value } = input;

      if (value === "") {
        return;
      }

      const numericValue = Number(value);
      const keyPressed = Number(e.data);

      if (!isNumeric(numericValue)) {
        input.value = this.lastValidValue;

        return;
      }

      if (numericValue > maxValue || numericValue < minValue) {
        if (isNumeric(keyPressed)) {
          if (this.alreadyTriedAnInvalidValue) {
            input.value = String(keyPressed);
            input.dispatchEvent(new Event("input"));
            this.alreadyTriedAnInvalidValue = false;

            return;
          }

          this.alreadyTriedAnInvalidValue = true;
        }

        input.value = this.lastValidValue;

        return;
      }

      valueHandler(numericValue);

      this.alreadyTriedAnInvalidValue = false;
      this.lastValidValue = value;
    },
    setHours(hours) {
      const newDate = new Date(this.localActiveDate.valueOf());

      newDate.setHours(hours);
      this.localActiveDate = newDate;
    },
    setMinutes(minutes) {
      const newDate = new Date(this.localActiveDate.valueOf());

      newDate.setMinutes(minutes);
      this.localActiveDate = newDate;
    },
    setSeconds(seconds) {
      const newDate = new Date(this.localActiveDate.valueOf());

      newDate.setSeconds(seconds);
      this.localActiveDate = newDate;
    },
    updateSecondsInput() {
      if (!this.showSeconds) {
        return;
      }

      const seconds = this.$refs.seconds;

      if (seconds) {
        seconds.value = this.secondsFormatted;
      }
    },
    updateMinutesInput() {
      const minutes = this.$refs.minutes;

      if (minutes) {
        minutes.value = this.minutesFormatted;
      }
    },
    updateHoursInput() {
      const hours = this.$refs.hours;

      if (hours) {
        hours.value = this.hoursFormatted;
      }
    },
    focus() {
      const timeInput = this.$refs.timeInput;

      if (timeInput) {
        timeInput.focus();
      }
    },
  },

  render() {
    const subElements = [];

    const label = h(
      "label",
      {
        class: this.getElementCssClass("timepickerTimeLabel"),
      },
      this.locale.timeLabel,
    );

    const timePickerInputs = [
      h("input", {
        ref: "hours",
        class: this.getElementCssClass("timepickerInput"),
        value: this.hoursFormatted,
        inputmode: "numeric",
        type: "text",
        contenteditable: false,
        onInput: (e) => {
          const maxHours = this.amPm ? 12 : 23;
          const minHours = this.amPm ? 1 : 0;

          this.handleTimeInput(e, maxHours, minHours, (hours) => {
            if (this.amPm) {
              if (hours === 12) {
                this.setHours(this.amPmFormatted === this.locale.amPM[1] ? hours : 0);
              } else {
                this.setHours(this.amPmFormatted === this.locale.amPM[1] ? hours + 12 : hours);
              }
            } else {
              this.setHours(hours);
            }
          });
        },
        onBlur: (e) => {
          this.$emit("blur", e);
          this.$emit("input", this.localActiveDate);
          this.$nextTick(() => {
            this.updateHoursInput();
          });
        },
        onFocus: (e) => {
          this.handleTimeInputFocus(e);
        },
      }),
      h(
        "span",
        {
          class: this.getElementCssClass("timepickerTimeSeparator"),
          contenteditable: false,
        },
        ":",
      ),
      h("input", {
        ref: "minutes",
        class: this.getElementCssClass("timepickerInput"),
        value: this.minutesFormatted,
        inputmode: "numeric",
        type: "text",
        contenteditable: false,
        onInput: (e) => {
          const maxMinutes = 59;
          const minMinutes = 0;

          this.handleTimeInput(e, maxMinutes, minMinutes, this.setMinutes);
        },
        onBlur: (e) => {
          this.$emit("blur", e);
          this.$emit("input", this.localActiveDate);
          this.$nextTick(() => {
            this.updateMinutesInput();
          });
        },
        onFocus: (e) => {
          this.handleTimeInputFocus(e);
        },
      }),
    ];

    if (this.showSeconds) {
      timePickerInputs.push(
        h(
          "span",
          {
            class: this.getElementCssClass("timepickerTimeSeparator"),
            contenteditable: false,
          },
          ":",
        ),
      );

      timePickerInputs.push(
        h("input", {
          ref: "seconds",
          class: this.getElementCssClass("timepickerInput"),
          value: this.secondsFormatted,
          inputmode: "numeric",
          type: "text",
          contenteditable: false,
          onInput: (e) => {
            const maxSeconds = 59;
            const minSeconds = 0;

            this.handleTimeInput(e, maxSeconds, minSeconds, this.setSeconds);
          },
          onBlur: (e) => {
            this.$emit("blur", e);
            this.$emit("input", this.localActiveDate);
            this.$nextTick(() => {
              this.updateSecondsInput();
            });
          },
          onFocus: (e) => {
            this.handleTimeInputFocus(e);
          },
        }),
      );
    }

    const timePickerElements = [
      h(
        "div",
        {
          ref: "timeInput",
          class: this.getElementCssClass("timepickerTimeFieldsWrapper"),
          style: {
            caretColor: "transparent",
          },
          tabindex: 0,
          inputmode: "numeric",
          contenteditable: true,
          onKeydown: (e) => {
            if (e.target !== this.$refs.timeInput) {
              return;
            }

            e.preventDefault();

            const { key } = e;

            if (key === "Enter") {
              this.focusNextElementFullTimeSelector();
            } else if (key === "Backspace") {
              this.timeInputKeys.pop();
            }

            if (isNumeric(key)) {
              this.timeInputKeys.push(key);
            }
          },
          onBlur: this.handleFullTimeBlur,
        },
        timePickerInputs,
      ),
    ];

    if (this.amPm) {
      timePickerElements.push(
        h(TToggle, {
          ref: "amPm",
          model: this.amPmFormatted,
          value: this.locale.amPM[1],
          uncheckedValue: this.locale.amPM[0],
          checkedPlaceholder: this.locale.amPM[0],
          uncheckedPlaceholder: this.locale.amPM[1],
          checkedLabel: this.locale.amPM[1],
          uncheckedLabel: this.locale.amPM[0],
          fixedClasses: {
            wrapper: "",
            wrapperChecked: "",
            wrapperDisabled: "",
            wrapperCheckedDisabled: "",
            button: "",
            buttonChecked: "",
            checkedPlaceholder: "",
            uncheckedPlaceholder: "",
          },
          classes: {
            wrapper: this.getElementCssClass("timepickerAmPmWrapper"),
            wrapperChecked: this.getElementCssClass("timepickerAmPmWrapperChecked"),
            wrapperDisabled: this.getElementCssClass("timepickerAmPmWrapperDisabled"),
            wrapperCheckedDisabled: this.getElementCssClass("timepickerAmPmWrapperCheckedDisabled"),
            button: this.getElementCssClass("timepickerAmPmButton"),
            buttonChecked: this.getElementCssClass("timepickerAmPmButtonChecked"),
            checkedPlaceholder: this.getElementCssClass("timepickerAmPmCheckedPlaceholder"),
            uncheckedPlaceholder: this.getElementCssClass("timepickerAmPmUncheckedPlaceholder"),
          },
          onBlur: (e) => this.$emit("blur", e),
          onInput: (amOrPM) => {
            const formattedDate = this.format(
              new Date(this.localActiveDate.valueOf()),
              "Y-m-d G:i:S",
            );
            const newActiveDate = this.parse(`${formattedDate} ${amOrPM}`, "Y-m-d G:i:S K");

            this.$emit("input", newActiveDate);
          },
          onKeydown: (e) => {
            const { key } = e;

            if (key === "Enter") {
              this.focusOkButton();
            }
          },
        }),
      );
    }

    timePickerElements.push(
      h(
        "a",
        {
          ref: "okButton",
          href: "#",
          class: this.getElementCssClass("timepickerOkButton"),
          onBlur: (e) => this.$emit("blur", e),
          onClick: (e) => {
            e.preventDefault();

            this.$emit("submit", this.localActiveDate);
          },
        },
        this.locale.okLabel,
      ),
    );

    const timePickerWrapper = h(
      "div",
      {
        class: this.getElementCssClass("timepickerTimeWrapper"),
      },
      timePickerElements,
    );

    subElements.push(label);
    subElements.push(timePickerWrapper);

    return h(
      "div",
      {
        class: this.getElementCssClass("timepickerWrapper"),
      },
      subElements,
    );
  },
};

export default TDatepickerTimeSelector;
