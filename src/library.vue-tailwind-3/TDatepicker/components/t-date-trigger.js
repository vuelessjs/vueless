import { h } from "vue";

const TDatepickerTrigger = {
  name: "TDatepickerTrigger",

  emits: ["clear", "click", "input", "keydown", "blur", "focus"],

  props: {
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: undefined,
    },
    autofocus: {
      type: Boolean,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: undefined,
    },
    tabindex: {
      type: [String, Number],
      default: undefined,
    },
    inputName: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    show: {
      type: Function,
      default: undefined,
    },
    hideIfFocusOutside: {
      type: Function,
      default: undefined,
    },
    conjunction: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: true,
    },
    range: {
      type: Boolean,
      required: true,
    },
    clearable: {
      type: Boolean,
      required: true,
    },
    locale: {
      type: Object,
      required: true,
    },
    userFormatedDate: {
      type: [String, Array],
      required: true,
    },
    formatedDate: {
      type: [String, Array],
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
    hasFocus: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    hasValue() {
      if (Array.isArray(this.value)) {
        return this.value.length > 0;
      }

      return !!this.value;
    },
  },

  methods: {
    clearButtonClickHandler(e) {
      this.$emit("clear", e);
    },
  },

  render() {
    const formattedDate = this.formatedDate;

    let formText = "";

    if (Array.isArray(this.userFormatedDate)) {
      const conjunction = this.range ? this.locale.rangeSeparator : this.conjunction;

      formText = this.userFormatedDate.join(conjunction);
    } else {
      formText = this.userFormatedDate;
    }

    const subElements = [
      h("input", {
        ref: "input",
        class: this.getElementCssClass("input"),
        readonly: !this.hasFocus ? this.readonly : true,
        inputmode: "none",
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        autocomplete: "off",
        autofocus: this.autofocus,
        type: "text",
        required: this.required,
        placeholder: this.placeholder,
        tabindex: this.tabindex,
        value: formText,

        onClick: (e) => {
          if (this.show) {
            this.show();
          }

          this.$emit("click", e);
        },
        onInput: (e) => {
          this.$emit("input", e);
        },
        onKeydown: (e) => {
          this.$emit("keydown", e);
        },
        onBlur: (e) => {
          if (this.hideIfFocusOutside) {
            this.hideIfFocusOutside(e);
          }

          this.$emit("blur", e);
        },
        onFocus: (e) => {
          if (this.show) {
            this.show();
          }

          this.$emit("focus", e);
        },
      }),
    ];

    if (this.clearable && this.hasValue) {
      const clearButtonSlot = this.$slots.clearButton
        ? this.$slots.clearButton({
            className: this.getElementCssClass("clearButtonIcon"),
            formatedDate: this.formatedDate,
            userFormatedDate: this.userFormatedDate,
            value: this.value,
            activeDate: this.activeDate,
          })
        : [
            h(
              "svg",
              {
                fill: "currentColor",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                class: this.getElementCssClass("clearButtonIcon"),
              },
              [
                h("polygon", {
                  points: `10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 
                    17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 
                    11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644`,
                }),
              ],
            ),
          ];

      subElements.push(
        h(
          "button",
          {
            ref: "clearButton",
            class: this.getElementCssClass("clearButton"),
            type: "button",
            tabindex: -1,
            onClick: this.clearButtonClickHandler,
          },
          clearButtonSlot,
        ),
      );
    }

    if (this.multiple) {
      const dates = Array.isArray(formattedDate) ? formattedDate : [formattedDate];
      const hiddenInputs = dates.map((date) =>
        h("input", {
          type: "hidden",
          value: date,
          name: this.name,
          disabled: this.disabled,
          readonly: this.readonly,
          required: this.required,
        }),
      );

      subElements.push(...hiddenInputs);
    } else {
      subElements.push(
        h("input", {
          type: "hidden",
          value: Array.isArray(formattedDate)
            ? formattedDate.join(this.conjunction)
            : formattedDate,
          name: this.name,
          disabled: this.disabled,
          readonly: this.readonly,
          required: this.required,
        }),
      );
    }

    return h(
      "div",
      {
        class: this.getElementCssClass("inputWrapper"),
      },
      subElements,
    );
  },
};

export default TDatepickerTrigger;
