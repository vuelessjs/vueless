import { h } from "vue";
import HtmlInput from "../../base/HtmlInput";

const isChecked = (model, value) => {
  if (Array.isArray(model)) {
    return model.indexOf(value) >= 0;
  }

  return model === value;
};

var Key;

(function (Key) {
  Key[(Key["LEFT"] = 37)] = "LEFT";
  Key[(Key["UP"] = 38)] = "UP";
  Key[(Key["RIGHT"] = 39)] = "RIGHT";
  Key[(Key["DOWN"] = 40)] = "DOWN";
  Key[(Key["ENTER"] = 13)] = "ENTER";
  Key[(Key["ESC"] = 27)] = "ESC";
  Key[(Key["SPACE"] = 32)] = "SPACE";
  Key[(Key["BACKSPACE"] = 8)] = "BACKSPACE";
})(Key || (Key = {}));

const TToggle = {
  name: "TToggle",

  mixins: [HtmlInput],

  emits: ["keydown", "click", "focus", "blur", "change", "update:checked"],

  props: {
    value: {
      type: [String, Object, Number, Boolean, Array],
      default: true,
    },
    uncheckedValue: {
      type: [String, Object, Number, Boolean, Array],
      default: false,
    },
    modelValue: {
      // v-model
      type: [String, Object, Number, Boolean, Array],
      default: undefined,
    },
    checked: {
      type: Boolean,
      default: undefined,
    },
    tabindex: {
      type: [String, Number],
      default: 0,
    },
    uncheckedPlaceholder: {
      type: String,
      default: undefined,
    },
    checkedPlaceholder: {
      type: String,
      default: undefined,
    },
    uncheckedLabel: {
      type: String,
      default: undefined,
    },
    checkedLabel: {
      type: String,
      default: undefined,
    },
    classes: {
      type: Object,
      default() {
        return {
          wrapper: `bg-gray-100 rounded-full border-2 border-transparent 
            focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50`,
          wrapperChecked: `bg-blue-500 rounded-full border-2 border-transparent 
            focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50`,
          wrapperDisabled: `bg-gray-100 rounded-full border-2 border-transparent 
            focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50`,
          wrapperCheckedDisabled: `bg-blue-500 rounded-full border-2 border-transparent 
            focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50`,
          button:
            "h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-gray-400 text-xs",
          buttonChecked:
            "h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-blue-500 text-xs",
          checkedPlaceholder:
            "rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs",
          uncheckedPlaceholder:
            "rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs",
        };
      },
    },
    fixedClasses: {
      type: [String, Array, Object],
      default() {
        return {
          wrapper:
            "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200",
          wrapperChecked:
            "relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200",
          wrapperDisabled: `relative inline-flex flex-shrink-0 cursor-pointer
             transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed`,
          wrapperCheckedDisabled: `relative inline-flex flex-shrink-0 cursor-pointer
             transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed`,
          button:
            "inline-block absolute transform translate-x-0 transition ease-in-out duration-200",
          buttonChecked:
            "inline-block absolute transform translate-x-full transition ease-in-out duration-200",
          checkedPlaceholder: "inline-block",
          uncheckedPlaceholder: "inline-block",
        };
      },
    },
  },

  data() {
    const checked =
      typeof this.checked === "boolean" && typeof this.modelValue === "undefined"
        ? this.checked
        : isChecked(this.modelValue, this.value);

    return {
      isChecked: checked,
    };
  },

  computed: {
    isDisabled() {
      return this.disabled || this.readonly;
    },
    currentValue() {
      return this.isChecked ? this.value : this.uncheckedValue;
    },
  },

  watch: {
    model(model) {
      this.isChecked = isChecked(model, this.value);
    },
    isChecked(checked) {
      let localValue;

      if (Array.isArray(this.modelValue)) {
        localValue = [...this.modelValue];
        const index = localValue.indexOf(this.value);

        if (checked && index < 0) {
          localValue.push(this.value);
        } else if (!checked && index >= 0) {
          localValue.splice(index, 1);
        }
      } else {
        localValue = this.currentValue;
      }

      this.$emit("update:modelValue", localValue);
      this.$emit("change", localValue);
      // Emit update event to prop
      this.$emit("update:checked", checked);
    },
  },

  methods: {
    blurHandler(e) {
      this.$emit("blur", e);
    },

    focusHandler(e) {
      this.$emit("focus", e);
    },

    getElement() {
      return this.$el;
    },

    blur() {
      this.getElement().blur();
    },

    click() {
      this.getElement().click();
    },

    spaceHandler(e) {
      e.preventDefault();
      this.toggleValue();
    },
    clickHandler() {
      this.toggleValue();
    },
    toggleValue() {
      if (this.isDisabled) {
        return;
      }

      this.isChecked = !this.isChecked;
    },
    setChecked(checked) {
      this.isChecked = checked;
    },

    focus(options) {
      this.getElement().focus(options);
    },
  },

  render() {
    let wrapperClass;

    if (this.isDisabled) {
      if (this.isChecked) {
        wrapperClass = this.getElementCssClass("wrapperCheckedDisabled");
      } else {
        wrapperClass = this.getElementCssClass("wrapperDisabled");
      }
    } else if (this.isChecked) {
      wrapperClass = this.getElementCssClass("wrapperChecked");
    } else {
      wrapperClass = this.getElementCssClass("wrapper");
    }

    let defaultSlot = this.$slots.default
      ? this.$slots.default({
          value: this.currentValue,
          uncheckedValue: this.uncheckedValue,
          isChecked: this.isChecked,
        })
      : null;

    if (!defaultSlot) {
      defaultSlot = this.isChecked ? this.checkedLabel : this.uncheckedLabel;
    }

    let checkedslot = this.$slots.checked
      ? this.$slots.checked({
          value: this.currentValue,
          uncheckedValue: this.uncheckedValue,
          isChecked: this.isChecked,
        })
      : null;

    if (this.checkedPlaceholder && !checkedslot) {
      checkedslot = this.checkedPlaceholder;
    }

    let uncheckedSlot = this.$slots.unchecked
      ? this.$slots.unchecked({
          value: this.currentValue,
          uncheckedValue: this.uncheckedValue,
          isChecked: this.isChecked,
        })
      : null;

    if (this.uncheckedPlaceholder && !uncheckedSlot) {
      uncheckedSlot = this.uncheckedPlaceholder;
    }

    return h(
      "span",
      {
        class: wrapperClass,
        role: "checkbox",
        id: this.id,
        tabindex: this.tabindex,
        autofocus: this.autofocus,
        "aria-checked": this.isChecked ? "true" : "false",
        onBlur: this.blurHandler,
        onFocus: this.focusHandler,
        onClick: (e) => {
          this.clickHandler();
          this.$emit("click", e);
        },
        onKeydown: (e) => {
          if (e.keyCode === Key.SPACE) {
            this.spaceHandler(e);
          }

          this.$emit("keydown", e);
        },
      },
      [
        h("input", {
          ref: "input",
          value: this.currentValue,
          type: "hidden",
          name: this.name,
          disabled: this.disabled,
          readonly: this.readonly,
          required: this.required,
        }),
        h(
          "span",
          {
            class: this.getElementCssClass("checkedPlaceholder"),
            "aria-hidden": "true",
          },
          checkedslot,
        ),
        h(
          "span",
          {
            class: this.getElementCssClass("uncheckedPlaceholder"),
            "aria-hidden": "true",
          },
          uncheckedSlot,
        ),
        h(
          "span",
          {
            ref: "button",
            class: this.isChecked
              ? this.getElementCssClass("buttonChecked")
              : this.getElementCssClass("button"),
            "aria-hidden": "true",
          },
          defaultSlot,
        ),
      ],
    );
  },
};

export default TToggle;
