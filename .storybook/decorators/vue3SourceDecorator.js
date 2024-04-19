import { addons, makeDecorator } from "@storybook/preview-api";
import { h, onMounted, watch } from "vue";
import { setBrandColor } from "vueless/service.ui";

export const vue3SourceDecorator = makeDecorator({
  name: "vue3SourceDecorator",
  wrapper: (storyFn, context) => {
    const story = storyFn(context);

    // this returns a new component that computes the source code when mounted
    // and emits an events that is handled by addons-docs
    // watch args and re-emit on change
    return {
      components: { story },
      setup() {
        onMounted(() => {
          setSourceCode();
        });

        watch(context.args, () => {
          setSourceCode();
        });

        setBrandColor();

        function setSourceCode() {
          try {
            const src = context.originalStoryFn(context.args).template;
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

            emitFormattedTemplate();
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Failed to render code", e);
          }
        }

        return () => h("div", { style: `padding: 2rem 1.5rem 3rem 1.5rem;` }, [h(story)]);
      },
    };
  },
});

function templateSourceCode(templateSource, args, argTypes) {
  const componentArgs = {};

  for (const [key, val] of Object.entries(argTypes)) {
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

  const slotTemplateCode =
    // eslint-disable-next-line vue/max-len
    '<template v-for="(slot, index) of slots" :key="index" v-slot:[slot]><template v-if="args[slot]">{{ args[slot] }}</template></template>';
  const templateDefaultRegEx = /<template #default>([\s\S]*?)<\/template>/g;

  return templateSource
    .replace(/>[\s]+</g, "><")
    .trim()
    .replace(slotTemplateCode, "")
    .replace(templateDefaultRegEx, "$1")
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
