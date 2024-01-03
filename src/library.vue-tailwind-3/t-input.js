import { defineComponent, h } from "vue";
import TextInput from "./base/TextInput";

const TInput = {
  name: "TInput",
  mixins: [TextInput],
  props: {
    type: {
      type: String,
      default: "text",
    },
    max: {
      type: [String, Number],
      default: undefined,
    },
    min: {
      type: [String, Number],
      default: undefined,
    },
    classes: {
      type: [String, Array, Object],
      default: `block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out
        bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2
        focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed`,
    },
  },
  render() {
    const renderFun = this.render;

    return renderFun(h);
  },
  methods: {
    render(createElement) {
      return createElement("input", {
        class: this.componentClass,
        ref: "input",
        value: this.localValue,
        id: this.id,
        name: this.name,
        disabled: this.disabled,
        readonly: this.readonly,
        autocomplete: this.autocomplete,
        autofocus: this.autofocus,
        type: this.type,
        required: this.required,
        placeholder: this.placeholder,
        pattern: this.pattern,
        multiple: this.multiple,
        minlength: this.minlength,
        min: this.min,
        maxlength: this.maxlength,
        max: this.max,
        onBlur: this.blurHandler,
        onFocus: this.focusHandler,
        onKeyup: this.keyupHandler,
        onKeydown: this.keydownHandler,
        onInput: this.inputHandler,
      });
    },
    inputHandler(e) {
      const target = e.target;

      this.$emit("update:modelValue", target.value);
    },
  },
};

export default defineComponent(TInput);
