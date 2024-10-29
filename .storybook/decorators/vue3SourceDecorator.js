import { addons, useArgs, makeDecorator } from "@storybook/preview-api";
import { h, onMounted, watch } from "vue";

export const vue3SourceDecorator = makeDecorator({
  name: "vue3SourceDecorator",
  wrapper: (storyFn, context) => {
    const story = storyFn(context);
    const [, updateArgs] = useArgs();

    // this returns a new component that computes the source code when mounted
    // and emits an events that is handled by addons-docs
    // watch args and re-emit on change
    return {
      components: { story },
      setup() {
        onMounted(async () => {
          await setSourceCode();
        });

        watch(context.args, async () => {
          // it allows changing args dynamically
          updateArgs({ ...context.args });
          await setSourceCode();
        });

        async function setSourceCode() {
          try {
            const src = context.originalStoryFn(context.args, context.argTypes).template;
            const code = templateSourceCode(src, context.args, context.argTypes);
            const channel = addons.getChannel();

            const emitFormattedTemplate = async () => {
              const prettier = await import("prettier2");
              const prettierHtml = await import("prettier2/parser-html");

              const formattedCode = prettier.format(code, {
                parser: "html",
                plugins: [prettierHtml],
                htmlWhitespaceSensitivity: "ignore",
              });

              // emits an event when the transformation is completed
              channel.emit("storybook/docs/snippet-rendered", {
                id: context.id,
                args: context.args,
                source: formattedCode,
              });
            };

            await emitFormattedTemplate();
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Failed to render code", e);
          }
        }

        return () => h("div", { class: "px-6 pt-8 pb-12" }, [h(story)]);
      },
    };
  },
});

function templateSourceCode(templateSource, args, argTypes) {
  const MODEL_VALUE_KEY = "modelValue";
  const componentArgs = {};

  for (const [key, val] of Object.entries(argTypes)) {
    if (key === MODEL_VALUE_KEY) continue;

    const value = args[key];

    if (
      typeof val !== "undefined" &&
      val.table &&
      val.table.category === "props" &&
      value !== val.defaultValue
    ) {
      componentArgs[key] = val;
    }
  }

  const slotTemplateCodeBefore =
    // eslint-disable-next-line vue/max-len
    `<template v-for="(slot, index) of slots" :key="index" v-slot:[slot]><template v-if="slot === 'default' && !args['defaultSlot']">`;

  const slotTemplateCodeAfter =
    // eslint-disable-next-line vue/max-len
    `</template><template v-else-if="slot === 'default' && args['defaultSlot']">{{ args['defaultSlot'] }}</template><template v-else-if="args[slot + 'Slot']">{{ args[slot + 'Slot'] }}</template></template>`;

  return templateSource
    .replace(/>[\s]+</g, "><")
    .trim()
    .replace(slotTemplateCodeBefore, "")
    .replace(slotTemplateCodeAfter, "")
    .replace(
      `v-model="args.${MODEL_VALUE_KEY}"`,
      args[MODEL_VALUE_KEY] ? `v-model="${args[MODEL_VALUE_KEY]}"` : "",
    )
    .replace(
      'v-bind="args"',
      Object.keys(componentArgs)
        .map((key) => " " + propToSource(kebabCase(key), args[key]))
        .join(""),
    );
}

function propToSource(key, val) {
  const type = typeof val;

  switch (type) {
    case "boolean":
      return val ? key : "";
    case "string":
      return `${key}="${val}"`;
    case "object":
      return `:${key}="${JSON.stringify(val)}"`;
    default:
      return `:${key}="${val}"`;
  }
}

function kebabCase(str) {
  return str
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");
}
