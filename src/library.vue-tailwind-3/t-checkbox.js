import { defineComponent, h } from "vue";
import HtmlInput from "./base/HtmlInput";

/* eslint-disable no-shadow */
let Key;

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

let Key$1 = Key;

const TCheckbox = {
  name: "TCheckbox",
  mixins: [HtmlInput],
  emits: [
    "update:indeterminate",
    "update:checked",
    "update:modelValue",
    "input",
    "change",
    "blur",
    "focus",
  ],
  props: {
    value: {
      type: [String, Object, Number, Boolean, Array],
      default: true,
    },
    uncheckedValue: {
      type: [String, Object, Number, Boolean, Array],
      default: false,
    },
    indeterminate: {
      type: [Boolean, String],
      default: undefined,
    },
    checked: {
      type: [Boolean, String],
      default: undefined,
    },
    modelValue: {
      // v-model
      type: [String, Object, Number, Boolean, Array],
      default: undefined,
    },
    wrapped: {
      type: Boolean,
      default: false,
    },
    wrapperTag: {
      type: String,
      default: "label",
    },
    inputWrapperTag: {
      type: String,
      default: "span",
    },
    labelTag: {
      type: String,
      default: "span",
    },
    label: {
      type: [String, Number],
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: `text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-0
        disabled:opacity-50 disabled:cursor-not-allowed`,
    },
  },
  data() {
    return {
      localValue: this.modelValue,
    };
  },
  render() {
    const renderFun = this.render;
    // eslint-disable-next-line max-len
    const createWrappedFunc = this.renderWrapped;

    if (this.wrapped) {
      return createWrappedFunc(h);
    }

    return renderFun(h);
  },
  computed: {
    isChecked: {
      get() {
        if (this.modelValue === undefined) {
          return this.checked;
        }

        if (Array.isArray(this.modelValue)) {
          return this.modelValue.indexOf(this.value) >= 0;
        }

        return this.modelValue === this.value;
      },
      set(checked) {
        this.localValue = checked;
      },
    },
  },
  watch: {
    isChecked(isChecked) {
      const input = this.getInput();

      if (input.checked !== isChecked) {
        input.checked = isChecked;
      }
    },
    indeterminate(indeterminate) {
      this.setIndeterminate(indeterminate);
    },
    checked(checked) {
      this.setChecked(checked);
    },
  },
  methods: {
    getInput() {
      return this.$refs.input;
    },
    getAttributes() {
      return {
        checked: this.isChecked,
        value: this.value,
        id: this.id,
        type: "checkbox",
        name: this.name,
        disabled: this.disabled,
        readonly: this.readonly,
        required: this.required,
        autofocus: !this.wrapped ? this.autofocus : undefined,
        tabindex: this.wrapped && this.tabindex !== undefined ? -1 : this.tabindex,
      };
    },
    renderWrapped(createElement) {
      const childElements = [];
      const input = this.render(createElement);
      const inputWrapperClass = this.getElementCssClass("inputWrapper");
      const checkedInputWrapperClass = this.getElementCssClass(
        "inputWrapperChecked",
        this.getElementCssClass("inputWrapper"),
      );

      childElements.push(
        createElement(
          this.inputWrapperTag,
          {
            ref: "inputWrapper",
            class: this.isChecked ? checkedInputWrapperClass : inputWrapperClass,
          },
          [input],
        ),
      );
      const labelClass = this.getElementCssClass("label");
      const checkedLabelClass = this.getElementCssClass(
        "labelChecked",
        this.getElementCssClass("label"),
      );
      let label;

      if (this.$slots.default() !== undefined) {
        label = this.$slots.default({
          isChecked: this.isChecked,
          value: this.isChecked ? this.value : this.uncheckedValue,
          label: this.label,
        });
      } else {
        label = typeof this.label === "number" ? String(this.label) : this.label;
      }

      childElements.push(
        createElement(
          this.labelTag,
          {
            ref: "label",
            class: this.isChecked ? checkedLabelClass : labelClass,
          },
          label,
        ),
      );
      const wrapperClass = this.getElementCssClass("wrapper");
      const checkedWrapperClass = this.getElementCssClass(
        "wrapperChecked",
        this.getElementCssClass("wrapper"),
      );

      return createElement(
        this.wrapperTag,
        {
          ref: "wrapper",
          class: this.isChecked ? checkedWrapperClass : wrapperClass,
          for: this.id,
          tabindex: this.tabindex,
          autofocus: this.autofocus,
          onKeydown: (e) => {
            if (e.keyCode === Key$1.SPACE) {
              this.wrapperSpaceHandler(e);
            }
          },
        },
        childElements,
      );
    },
    render(createElement) {
      return createElement("input", {
        class: this.wrapped ? this.getElementCssClass("input") : this.componentClass,
        ref: "input",
        ...this.getAttributes(),
        onBlur: this.blurHandler,
        onFocus: this.focusHandler,
        onChange: this.changeHandler,
        onInput: () => {
          // Empty, overrides the input handler from the checkbox group
        },
      });
    },
    wrapperSpaceHandler(e) {
      e.preventDefault();
      this.click();
    },
    setIndeterminate(indeterminate) {
      const input = this.getInput();

      input.indeterminate = indeterminate;
      // Emit update event to prop
      this.$emit("update:indeterminate", indeterminate);
    },
    setChecked(checked) {
      const input = this.getInput();

      //this.localValue = checked;
      input.checked = !checked;
      input.click();
      // Emit update event to prop
      this.$emit("update:checked", checked);
    },
    changeHandler() {
      const input = this.getInput();
      const isChecked = input.checked;
      let localValue;

      if (Array.isArray(this.modelValue)) {
        localValue = [...this.modelValue];
        const index = localValue.indexOf(this.value);

        if (isChecked && index < 0) {
          localValue.push(this.value);
        } else if (!isChecked && index >= 0) {
          localValue.splice(index, 1);
        }
      } else {
        localValue = isChecked ? this.value : this.uncheckedValue;
      }

      this.$emit("input", localValue);
      this.$emit("change", localValue);
      this.$emit("update:modelValue", localValue);
      this.$emit("update:indeterminate", false);
      this.$emit("update:checked", isChecked);
    },
    blurHandler(e) {
      this.$emit("blur", e);
    },
    focusHandler(e) {
      this.$emit("focus", e);
    },
    blur() {
      this.getInput().blur();
    },
    click() {
      this.getInput().click();
    },
    focus(options) {
      this.getInput().focus(options);
    },
  },
};

export default defineComponent(TCheckbox);
